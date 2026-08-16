/**
 * HÀNH TRÌNH PYTHON - GOOGLE APPS SCRIPT WEB APP
 * Hệ thống thu thập, lưu trữ và đồng bộ dữ liệu thời gian thực giữa Học sinh và Giáo viên.
 * Hỗ trợ LockService, Batch Writing, Deduplication (SessionID & EventID), và Đọc dữ liệu (doGet/doPost).
 */

function doPost(e) {
  var payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Invalid JSON format: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }

  var action = payload.action || "saveGame";

  // 1. Hỗ trợ đọc dữ liệu qua POST (dành cho Teacher Dashboard)
  if (action === "readData" || action === "getResults" || action === "getStats") {
    return handleReadData();
  }

  // 2. Ghi dữ liệu học sinh
  var eventId = payload.eventId || "";
  var sessionId = payload.sessionId || (payload.session && payload.session.sessionId) || "";
  var session = payload.session;
  var answers = payload.answers || [];

  if (!sessionId) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Missing sessionId"
    })).setMimeType(ContentService.MimeType.JSON);
  }

  var lock = LockService.getScriptLock();
  try {
    // Chờ tối đa 20 giây để lấy khóa ghi (xử lý tranh chấp 30-50 máy học sinh)
    lock.waitLock(20000);

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ----------------------------------------------------
    // TAB 1: SESSIONS (Dữ liệu tổng hợp từng học sinh)
    // ----------------------------------------------------
    var sessionSheet = ss.getSheetByName("SESSIONS");
    if (!sessionSheet) {
      sessionSheet = ss.insertSheet("SESSIONS");
      var sessionHeaders = [
        "Timestamp", "SessionID", "StudentName", "Class", "StartTime", "EndTime", "DurationSeconds",
        "PredictScore", "VariableScore", "BugScore", "IfScore", "BuilderScore", "BossScore",
        "CorrectAnswers", "TotalQuestions", "AccuracyPercent", "TotalXP", "Badge", "Completed"
      ];
      sessionSheet.appendRow(sessionHeaders);
      sessionSheet.getRange("A1:S1").setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
    }

    if (session) {
      var sDate = new Date(session.startTime || Date.now());
      var eDate = session.endTime ? new Date(session.endTime) : new Date();
      var durationSec = session.durationSeconds || Math.round((eDate.getTime() - sDate.getTime()) / 1000);
      var timeFormatted = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");

      var sessionRow = [
        timeFormatted,
        session.sessionId || sessionId,
        session.studentName || "",
        session.studentClass || "",
        Utilities.formatDate(sDate, "GMT+7", "dd/MM/yyyy HH:mm:ss"),
        session.endTime ? Utilities.formatDate(eDate, "GMT+7", "dd/MM/yyyy HH:mm:ss") : "",
        durationSec,
        session.scores && session.scores.predict ? session.scores.predict.correct + "/" + session.scores.predict.total : "0/0",
        session.scores && session.scores.variable ? session.scores.variable.correct + "/" + session.scores.variable.total : "0/0",
        session.scores && session.scores.bug ? session.scores.bug.correct + "/" + session.scores.bug.total : "0/0",
        session.scores && session.scores.ifmaze ? session.scores.ifmaze.correct + "/" + session.scores.ifmaze.total : "0/0",
        session.scores && session.scores.builder ? session.scores.builder.correct + "/" + session.scores.builder.total : "0/0",
        session.scores && session.scores.boss ? session.scores.boss.correct + "/" + session.scores.boss.total : "0/0",
        session.totalCorrect || 0,
        session.totalQuestions || 0,
        (session.accuracyPercent || 0) + "%",
        session.totalXp || 0,
        session.badge || "",
        session.completed ? "HOÀN THÀNH" : "ĐANG CHƠI"
      ];

      // Kiểm tra xem SessionID đã tồn tại chưa để UPDATE (Chống ghi đè tạo dòng rác)
      var lastRow = sessionSheet.getLastRow();
      var existingRowIndex = -1;

      if (lastRow > 1) {
        var sessionIds = sessionSheet.getRange(2, 2, lastRow - 1, 1).getValues();
        for (var i = 0; i < sessionIds.length; i++) {
          if (String(sessionIds[i][0]) === String(sessionId)) {
            existingRowIndex = i + 2;
            break;
          }
        }
      }

      if (existingRowIndex > 0) {
        sessionSheet.getRange(existingRowIndex, 1, 1, sessionRow.length).setValues([sessionRow]);
      } else {
        sessionSheet.appendRow(sessionRow);
      }
    }

    // ----------------------------------------------------
    // TAB 2: ANSWERS (Chi tiết từng câu hỏi làm bài)
    // ----------------------------------------------------
    if (answers && answers.length > 0) {
      var answersSheet = ss.getSheetByName("ANSWERS");
      if (!answersSheet) {
        answersSheet = ss.insertSheet("ANSWERS");
        var answerHeaders = [
          "Timestamp", "EventID", "SessionID", "StudentName", "Class", "Game",
          "QuestionID", "Difficulty", "Concept", "SelectedAnswer", "CorrectAnswer",
          "IsCorrect", "TimeSpentSeconds"
        ];
        answersSheet.appendRow(answerHeaders);
        answersSheet.getRange("A1:M1").setFontWeight("bold").setBackground("#022c22").setFontColor("#34d399");
      }

      // Đọc các EventID gần đây để tránh ghi trùng (khi client retry)
      var ansLastRow = answersSheet.getLastRow();
      var recordedEventIds = {};
      if (ansLastRow > 1) {
        var checkRows = Math.min(300, ansLastRow - 1);
        var startCheck = ansLastRow - checkRows + 1;
        var existingEventIds = answersSheet.getRange(startCheck, 2, checkRows, 1).getValues();
        for (var k = 0; k < existingEventIds.length; k++) {
          if (existingEventIds[k][0]) {
            recordedEventIds[String(existingEventIds[k][0])] = true;
          }
        }
      }

      var rowsToInsert = [];
      for (var j = 0; j < answers.length; j++) {
        var a = answers[j];
        var itemEventId = a.eventId || (eventId ? eventId + "_" + j : sessionId + "_" + a.questionId + "_" + (a.timestamp || j));

        if (recordedEventIds[itemEventId]) {
          continue; // Đã lưu trước đó, bỏ qua
        }

        var ansTime = Utilities.formatDate(new Date(a.timestamp || Date.now()), "GMT+7", "dd/MM/yyyy HH:mm:ss");
        rowsToInsert.push([
          ansTime,
          itemEventId,
          a.sessionId || sessionId,
          a.studentName || (session ? session.studentName : ""),
          a.studentClass || (session ? session.studentClass : ""),
          a.game || "",
          a.questionId || "",
          a.difficulty || 1,
          a.concept || "",
          Array.isArray(a.selectedOptionIds) ? a.selectedOptionIds.join(", ") : (a.selectedOptionIds || ""),
          Array.isArray(a.correctAnswers) ? a.correctAnswers.join(", ") : (a.correctAnswers || ""),
          a.isCorrect ? "ĐÚNG" : "SAI",
          Math.round((a.timeSpentMs || 0) / 1000)
        ]);
      }

      // Ghi Batch hàng loạt
      if (rowsToInsert.length > 0) {
        var targetStartRow = answersSheet.getLastRow() + 1;
        answersSheet.getRange(targetStartRow, 1, rowsToInsert.length, rowsToInsert[0].length).setValues(rowsToInsert);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      persisted: true,
      sessionId: sessionId,
      eventId: eventId,
      answersSaved: answers ? answers.length : 0
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      persisted: false,
      message: "Lỗi xử lý bảng tính: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Hỗ trợ GET request: Đọc dữ liệu từ SESSIONS & ANSWERS
 */
function doGet(e) {
  return handleReadData();
}

/**
 * Hàm đọc toàn bộ dữ liệu từ Sheet chuyển thành JSON chuẩn cho Teacher APIs
 */
function handleReadData() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sessionSheet = ss.getSheetByName("SESSIONS");
    var answersSheet = ss.getSheetByName("ANSWERS");

    var sessions = [];
    var answers = [];

    // 1. Đọc danh sách SESSIONS
    if (sessionSheet && sessionSheet.getLastRow() > 1) {
      var sRows = sessionSheet.getRange(2, 1, sessionSheet.getLastRow() - 1, sessionSheet.getLastColumn()).getValues();
      for (var i = 0; i < sRows.length; i++) {
        var r = sRows[i];
        if (!r[1]) continue; // Thiếu sessionId thì bỏ qua

        // Parse scores
        function parseScorePair(str) {
          if (!str) return { correct: 0, total: 0 };
          var parts = String(str).split("/");
          return {
            correct: parseInt(parts[0], 10) || 0,
            total: parseInt(parts[1], 10) || 0
          };
        }

        var acc = String(r[15] || "0").replace("%", "");

        sessions.push({
          timestamp: r[0],
          sessionId: String(r[1]),
          studentName: String(r[2] || ""),
          studentClass: String(r[3] || ""),
          startTime: r[4],
          endTime: r[5],
          durationSeconds: parseInt(r[6], 10) || 0,
          scores: {
            predict: parseScorePair(r[7]),
            variable: parseScorePair(r[8]),
            bug: parseScorePair(r[9]),
            ifmaze: parseScorePair(r[10]),
            builder: parseScorePair(r[11]),
            boss: parseScorePair(r[12])
          },
          totalCorrect: parseInt(r[13], 10) || 0,
          totalQuestions: parseInt(r[14], 10) || 0,
          accuracyPercent: parseInt(acc, 10) || 0,
          totalXp: parseInt(r[16], 10) || 0,
          badge: String(r[17] || ""),
          completed: String(r[18]) === "HOÀN THÀNH"
        });
      }
    }

    // 2. Đọc danh sách ANSWERS
    if (answersSheet && answersSheet.getLastRow() > 1) {
      var aRows = answersSheet.getRange(2, 1, answersSheet.getLastRow() - 1, answersSheet.getLastColumn()).getValues();
      for (var j = 0; j < aRows.length; j++) {
        var ar = aRows[j];
        if (!ar[2]) continue; // Thiếu sessionId

        answers.push({
          timestamp: ar[0],
          eventId: String(ar[1] || ""),
          sessionId: String(ar[2] || ""),
          studentName: String(ar[3] || ""),
          studentClass: String(ar[4] || ""),
          game: String(ar[5] || ""),
          questionId: String(ar[6] || ""),
          difficulty: parseInt(ar[7], 10) || 1,
          concept: String(ar[8] || ""),
          selectedOptionIds: String(ar[9] || "").split(", "),
          correctAnswers: String(ar[10] || "").split(", "),
          isCorrect: String(ar[11]) === "ĐÚNG",
          timeSpentMs: (parseInt(ar[12], 10) || 0) * 1000
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      totalSessions: sessions.length,
      totalAnswers: answers.length,
      sessions: sessions,
      answers: answers,
      fetchedAt: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Lỗi đọc dữ liệu Google Sheets: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
