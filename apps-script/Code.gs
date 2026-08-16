/**
 * HÀNH TRÌNH PYTHON - GOOGLE APPS SCRIPT WEB APP (v3.0 Production)
 * Hệ thống thu thập, lưu trữ và đồng bộ dữ liệu thời gian thực giữa Học sinh và Giáo viên.
 * Hỗ trợ: LockService, Batch Writing, Deduplication (SessionID & EventID), Secret Auth, và Auto-setup.
 */

// =========================================================================
// 1. HÀM KHỞI TẠO BẢNG TÍNH THỦ CÔNG HOẶC TỰ ĐỘNG (setupSpreadsheet)
// =========================================================================
function setupSpreadsheet() {
  var ss = getTargetSpreadsheet();
  
  // 1. Tạo hoặc lấy Sheet SESSIONS
  var sessionSheet = ss.getSheetByName("SESSIONS");
  if (!sessionSheet) {
    sessionSheet = ss.insertSheet("SESSIONS");
  }
  var sessionHeaders = [
    "Timestamp", "SessionID", "StudentName", "Class", "StartTime", "EndTime", "DurationSeconds",
    "PredictScore", "VariableScore", "BugScore", "IfScore", "BuilderScore", "BossScore",
    "CorrectAnswers", "TotalQuestions", "AccuracyPercent", "TotalXP", "Badge", "Completed"
  ];
  sessionSheet.getRange(1, 1, 1, sessionHeaders.length).setValues([sessionHeaders]);
  sessionSheet.getRange(1, 1, 1, sessionHeaders.length)
    .setFontWeight("bold")
    .setBackground("#0f172a")
    .setFontColor("#38bdf8")
    .setHorizontalAlignment("center");
  sessionSheet.setFrozenRows(1);

  // 2. Tạo hoặc lấy Sheet ANSWERS
  var answersSheet = ss.getSheetByName("ANSWERS");
  if (!answersSheet) {
    answersSheet = ss.insertSheet("ANSWERS");
  }
  var answerHeaders = [
    "Timestamp", "EventID", "SessionID", "StudentName", "Class", "Game",
    "QuestionID", "Difficulty", "Concept", "SelectedAnswer", "CorrectAnswer",
    "IsCorrect", "TimeSpentSeconds"
  ];
  answersSheet.getRange(1, 1, 1, answerHeaders.length).setValues([answerHeaders]);
  answersSheet.getRange(1, 1, 1, answerHeaders.length)
    .setFontWeight("bold")
    .setBackground("#022c22")
    .setFontColor("#34d399")
    .setHorizontalAlignment("center");
  answersSheet.setFrozenRows(1);

  Logger.log("✅ Đã khởi tạo thành công 2 sheet SESSIONS và ANSWERS.");
  return "Đã khởi tạo thành công 2 sheet: SESSIONS và ANSWERS.";
}

// =========================================================================
// 2. XỬ LÝ POST REQUEST (/api/sync-game-data và Teacher Read)
// =========================================================================
function doPost(e) {
  var payload;
  try {
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter && e.parameter.payload) {
      payload = JSON.parse(e.parameter.payload);
    } else if (e && e.parameter) {
      payload = e.parameter;
    } else {
      payload = {};
    }
  } catch (err) {
    return jsonResponse({
      status: "error",
      success: false,
      persisted: false,
      message: "Invalid JSON payload: " + err.toString()
    });
  }

  // Kiểm tra Secret nếu có cấu hình trong Script Properties
  if (!validateSecret(payload)) {
    return jsonResponse({
      status: "error",
      success: false,
      persisted: false,
      message: "Unauthorized: Webhook Secret không khớp với Script Properties."
    });
  }

  var action = payload.action || "saveGame";

  // 2.1 Hỗ trợ đọc dữ liệu qua POST (dành cho Teacher Dashboard)
  if (action === "readData" || action === "getResults" || action === "getStats") {
    return handleReadData(payload);
  }

  // 2.2 Ghi dữ liệu kết quả học sinh
  var eventId = payload.eventId || "";
  var sessionId = payload.sessionId || (payload.session && payload.session.sessionId) || "";
  var session = payload.session;
  var answers = payload.answers || [];

  if (!sessionId) {
    return jsonResponse({
      status: "error",
      success: false,
      persisted: false,
      message: "Missing required parameter: sessionId is mandatory."
    });
  }

  var lock = LockService.getScriptLock();
  try {
    // Chờ tối đa 30 giây để lấy khóa ghi an toàn (chống xung đột đồng thời)
    lock.waitLock(30000);

    var ss = getTargetSpreadsheet(payload);

    // ----------------------------------------------------
    // TAB 1: SESSIONS (Dữ liệu tổng hợp từng học sinh)
    // ----------------------------------------------------
    var sessionSheet = ss.getSheetByName("SESSIONS");
    if (!sessionSheet) {
      setupSpreadsheet();
      sessionSheet = ss.getSheetByName("SESSIONS");
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
        session.studentClass || session.className || "",
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

      var lastRow = sessionSheet.getLastRow();
      var existingRowIndex = -1;

      if (lastRow > 1) {
        var sessionIds = sessionSheet.getRange(2, 2, lastRow - 1, 1).getValues();
        for (var i = 0; i < sessionIds.length; i++) {
          if (String(sessionIds[i][0]).trim() === String(sessionId).trim()) {
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
    var savedAnswersCount = 0;
    if (answers && answers.length > 0) {
      var answersSheet = ss.getSheetByName("ANSWERS");
      if (!answersSheet) {
        setupSpreadsheet();
        answersSheet = ss.getSheetByName("ANSWERS");
      }

      var ansLastRow = answersSheet.getLastRow();
      var recordedEventIds = {};
      if (ansLastRow > 1) {
        var checkRows = Math.min(500, ansLastRow - 1);
        var startCheck = ansLastRow - checkRows + 1;
        var existingEventIds = answersSheet.getRange(startCheck, 2, checkRows, 1).getValues();
        for (var k = 0; k < existingEventIds.length; k++) {
          if (existingEventIds[k][0]) {
            recordedEventIds[String(existingEventIds[k][0]).trim()] = true;
          }
        }
      }

      var rowsToInsert = [];
      for (var j = 0; j < answers.length; j++) {
        var a = answers[j];
        var itemEventId = a.eventId || (eventId ? eventId + "_" + j : sessionId + "_" + a.questionId + "_" + (a.timestamp || j));

        if (recordedEventIds[String(itemEventId).trim()]) {
          continue; // Đã lưu trước đó, bỏ qua deduplication
        }

        var ansTime = Utilities.formatDate(new Date(a.timestamp || Date.now()), "GMT+7", "dd/MM/yyyy HH:mm:ss");
        rowsToInsert.push([
          ansTime,
          itemEventId,
          a.sessionId || sessionId,
          a.studentName || (session ? session.studentName : ""),
          a.studentClass || a.className || (session ? (session.studentClass || session.className) : ""),
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

      if (rowsToInsert.length > 0) {
        var targetStartRow = answersSheet.getLastRow() + 1;
        answersSheet.getRange(targetStartRow, 1, rowsToInsert.length, rowsToInsert[0].length).setValues(rowsToInsert);
        savedAnswersCount = rowsToInsert.length;
      }
    }

    return jsonResponse({
      status: "success",
      success: true,
      persisted: true,
      sessionId: sessionId,
      eventId: eventId,
      answersSaved: savedAnswersCount
    });

  } catch (error) {
    return jsonResponse({
      status: "error",
      success: false,
      persisted: false,
      message: "Lỗi ghi Google Sheets: " + error.toString()
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (e) {}
  }
}

// =========================================================================
// 3. XỬ LÝ GET REQUEST (/api/teacher/results và Đọc dữ liệu)
// =========================================================================
function doGet(e) {
  var param = (e && e.parameter) ? e.parameter : {};
  if (param.action === "setup") {
    var setupMsg = setupSpreadsheet();
    return jsonResponse({ status: "success", success: true, message: setupMsg });
  }
  return handleReadData(param);
}

// =========================================================================
// 4. HÀM ĐỌC DỮ LIỆU TỪ SESSIONS VÀ ANSWERS CHO TEACHER DASHBOARD
// =========================================================================
function handleReadData(payload) {
  try {
    var ss = getTargetSpreadsheet(payload);
    var sessionSheet = ss.getSheetByName("SESSIONS");
    var answersSheet = ss.getSheetByName("ANSWERS");

    var sessions = [];
    var answers = [];

    // 1. Đọc SESSIONS
    if (sessionSheet && sessionSheet.getLastRow() > 1) {
      var sRows = sessionSheet.getRange(2, 1, sessionSheet.getLastRow() - 1, sessionSheet.getLastColumn()).getValues();
      for (var i = 0; i < sRows.length; i++) {
        var r = sRows[i];
        if (!r[1]) continue;

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

    // 2. Đọc ANSWERS
    if (answersSheet && answersSheet.getLastRow() > 1) {
      var aRows = answersSheet.getRange(2, 1, answersSheet.getLastRow() - 1, answersSheet.getLastColumn()).getValues();
      for (var j = 0; j < aRows.length; j++) {
        var ar = aRows[j];
        if (!ar[2]) continue;

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

    return jsonResponse({
      status: "success",
      success: true,
      totalSessions: sessions.length,
      totalAnswers: answers.length,
      sessions: sessions,
      answers: answers,
      fetchedAt: new Date().toISOString()
    });

  } catch (err) {
    return jsonResponse({
      status: "error",
      success: false,
      message: "Lỗi đọc dữ liệu Google Sheets: " + err.toString()
    });
  }
}

// =========================================================================
// 5. HELPER FUNCTIONS
// =========================================================================
function getTargetSpreadsheet(payload) {
  // 1. Container-bound spreadsheet (nếu Script tạo từ Tiện ích mở rộng > Apps Script)
  try {
    var activeSs = SpreadsheetApp.getActiveSpreadsheet();
    if (activeSs) return activeSs;
  } catch (e) {}

  // 2. Script Property SPREADSHEET_ID hoặc GOOGLE_SPREADSHEET_ID
  var scriptProps = PropertiesService.getScriptProperties();
  var sheetId = scriptProps.getProperty("SPREADSHEET_ID") || 
                 scriptProps.getProperty("GOOGLE_SPREADSHEET_ID") || 
                 scriptProps.getProperty("SHEET_ID");
  
  if (!sheetId && payload && payload.spreadsheetId) {
    sheetId = payload.spreadsheetId;
  }

  if (sheetId) {
    try {
      return SpreadsheetApp.openById(String(sheetId).trim());
    } catch (e) {
      throw new Error("Không thể mở Spreadsheet theo SPREADSHEET_ID='" + sheetId + "': " + e.toString());
    }
  }

  throw new Error("Không tìm thấy Google Spreadsheet! Hãy tạo Apps Script từ menu 'Tiện ích mở rộng' > 'Apps Script' trong Google Sheet, hoặc vào Apps Script Project Settings thêm Script Property 'SPREADSHEET_ID'.");
}

function validateSecret(payload) {
  var expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET") ||
                 PropertiesService.getScriptProperties().getProperty("SECRET") ||
                 PropertiesService.getScriptProperties().getProperty("GOOGLE_SHEETS_WEBHOOK_SECRET");
  
  if (!expected || String(expected).trim() === "") {
    return true; // Không cấu hình secret -> cho phép
  }

  var provided = payload ? (payload.secret || payload.webhookSecret || payload.key) : "";
  return String(provided || "").trim() === String(expected).trim();
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
