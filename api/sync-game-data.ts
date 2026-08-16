import { writeToGoogleSheet } from "./_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { action, eventId, sessionId, studentName, className, game, answers, score, total, xp, session } = body;

    const finalSessionId = (sessionId || (session && session.sessionId) || "").trim();
    const finalStudentName = (studentName || (session && session.studentName) || "").trim();
    const finalClassName = (className || (session && (session.studentClass || session.className)) || "").trim();
    const finalGame = (game || (session && session.currentGame) || "").trim();

    if (!finalSessionId) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: sessionId is mandatory.",
      });
    }

    // Safe telemetry log
    console.log(
      `[SYNC_GAME_RECEIVED] sessionId=${finalSessionId} student=${finalStudentName || "Anonymous"} class=${finalClassName || "None"} game=${finalGame || "batch"}`
    );

    // Sanitize session object
    const sanitizedSession = session
      ? {
          sessionId: finalSessionId,
          studentName: finalStudentName,
          studentClass: finalClassName,
          startTime: session.startTime || Date.now(),
          endTime: session.endTime || undefined,
          durationSeconds: session.durationSeconds || 0,
          currentGame: finalGame || session.currentGame,
          scores: session.scores || {},
          totalCorrect: typeof session.totalCorrect === "number" ? session.totalCorrect : (score || 0),
          totalQuestions: typeof session.totalQuestions === "number" ? session.totalQuestions : (total || 0),
          accuracyPercent: typeof session.accuracyPercent === "number" ? session.accuracyPercent : (total ? Math.round(((score || 0) / total) * 100) : 0),
          totalXp: typeof session.totalXp === "number" ? session.totalXp : (xp || 0),
          badge: session.badge || "",
          completed: !!session.completed,
          lastUpdated: Date.now(),
        }
      : {
          sessionId: finalSessionId,
          studentName: finalStudentName,
          studentClass: finalClassName,
          startTime: Date.now(),
          currentGame: finalGame,
          totalCorrect: score || 0,
          totalQuestions: total || 0,
          totalXp: xp || 0,
          accuracyPercent: total ? Math.round(((score || 0) / total) * 100) : 0,
          completed: false,
          lastUpdated: Date.now(),
        };

    // Sanitize answers list
    const sanitizedAnswers = Array.isArray(answers)
      ? answers.map((ans: any, idx: number) => ({
          eventId: ans.eventId || `${eventId || finalSessionId}_${ans.questionId || idx}_${ans.timestamp || idx}`,
          sessionId: finalSessionId,
          studentName: finalStudentName,
          studentClass: finalClassName,
          game: ans.game || finalGame,
          questionId: String(ans.questionId || ""),
          difficulty: Number(ans.difficulty) || 1,
          concept: String(ans.concept || ""),
          selectedOptionIds: Array.isArray(ans.selectedOptionIds) ? ans.selectedOptionIds : [String(ans.selectedOptionIds || "")],
          correctAnswers: Array.isArray(ans.correctAnswers) ? ans.correctAnswers : [String(ans.correctAnswers || "")],
          isCorrect: Boolean(ans.isCorrect),
          timeSpentMs: Number(ans.timeSpentMs) || 0,
          timestamp: ans.timestamp || Date.now(),
        }))
      : [];

    // Ghi tới Google Sheets thông qua Apps Script Web App
    const writeResult = await writeToGoogleSheet({
      action: action || "saveGame",
      eventId: eventId || "",
      sessionId: finalSessionId,
      session: sanitizedSession,
      answers: sanitizedAnswers,
    });

    if (!writeResult.persisted || !writeResult.success) {
      return res.status(502).json({
        success: false,
        persisted: false,
        sessionId: finalSessionId,
        eventId: eventId || "",
        error: writeResult.error || "Ghi dữ liệu vào Google Sheets thất bại.",
      });
    }

    return res.status(200).json({
      success: true,
      persisted: true,
      sessionId: finalSessionId,
      eventId: eventId || "",
      persistedTo: "google_sheets",
    });
  } catch (error: any) {
    console.log(`[SYNC_GAME_ERROR] message=${error?.message || "unknown"}`);
    return res.status(500).json({
      success: false,
      persisted: false,
      error: error?.message || "Internal server error during game sync",
    });
  }
}
