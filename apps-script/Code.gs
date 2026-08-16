/**
 * HÀNH TRÌNH PYTHON - GOOGLE APPS SCRIPT
 * Tối ưu hóa cho lớp học 30-50 học sinh chơi đồng thời.
 * Hỗ trợ LockService, Batch Writing, Deduplication theo EventID và SessionID.
 */

function doPost(e) {
  // 1. Parse & Validate request trước khi lấy Lock
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

  // 2. Sử dụng LockService để xử lý tranh chấp ghi từ 30-50 máy cùng lúc
  var lock = LockService.getScriptLock();
  try {
    // Chờ tối đa 15 giây để lấy khóa ghi
    lock.waitLock(15000);

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ----------------------------------------------------
    // TAB 1: SESSIONS (TongHop_HocSinh) - 1 Dòng duy nhất cho mỗi SessionID
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
        session.scores?.predict ? session.scores.predict.correct + "/" + session.scores.predict.total : "0/0",
        session.scores?.variable ? session.scores.variable.correct + "/" + session.scores.variable.total : "0/0",
        session.scores?.bug ? session.scores.bug.correct + "/" + session.scores.bug.total : "0/0",
        session.scores?.ifmaze ? session.scores.ifmaze.correct + "/" + session.scores.ifmaze.total : "0/0",
        session.scores?.builder ? session.scores.builder.correct + "/" + session.scores.builder.total : "0/0",
        session.scores?.boss ? session.scores.boss.correct + "/" + session.scores.boss.total : "0/0",
        session.totalCorrect || 0,
        session.totalQuestions || 0,
        (session.accuracyPercent || 0) + "%",
        session.totalXp || 0,
        session.badge || "",
        session.completed ? "HOÀN THÀNH" : "ĐANG CHƠI"
      ];

      // Kiểm tra xem SessionID đã tồn tại chưa để UPDATE (Chống ghi trùng dòng)
      var lastRow = sessionSheet.getLastRow();
      var existingRowIndex = -1;

      if (lastRow > 1) {
        var sessionIds = sessionSheet.getRange(2, 2, lastRow - 1, 1).getValues();
        for (var i = 0; i < sessionIds.length; i++) {
          if (sessionIds[i][0] === sessionId) {
            existingRowIndex = i + 2;
            break;
          }
        }
      }

      if (existingRowIndex > 0) {
        // Cập nhật dòng hiện có
        sessionSheet.getRange(existingRowIndex, 1, 1, sessionRow.length).setValues([sessionRow]);
      } else {
        // Thêm dòng mới
        sessionSheet.appendRow(sessionRow);
      }
    }

    // ----------------------------------------------------
    // TAB 2: ANSWERS (NhatKy_ChiTiet) - Ghi theo Batch + Chống trùng theo EventID
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
        var checkRows = Math.min(200, ansLastRow - 1);
        var startCheck = ansLastRow - checkRows + 1;
        var existingEventIds = answersSheet.getRange(startCheck, 2, checkRows, 1).getValues();
        for (var k = 0; k < existingEventIds.length; k++) {
          if (existingEventIds[k][0]) {
            recordedEventIds[existingEventIds[k][0]] = true;
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

      // Ghi hàng loạt (Batch write) thay vì lặp appendRow()
      if (rowsToInsert.length > 0) {
        var targetStartRow = answersSheet.getLastRow() + 1;
        answersSheet.getRange(targetStartRow, 1, rowsToInsert.length, rowsToInsert[0].length).setValues(rowsToInsert);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      sessionId: sessionId,
      eventId: eventId,
      answersSaved: answers ? answers.length : 0
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Lỗi xử lý bảng tính: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    // Luôn giải phóng khóa nhanh nhất có thể
    lock.releaseLock();
  }
}
