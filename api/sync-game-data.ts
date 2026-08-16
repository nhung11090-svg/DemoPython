import { inMemorySessions, inMemoryLogs, cleanEnv } from "./_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { action, eventId, sessionId, session, answers } = body;

    if (session && session.sessionId) {
      inMemorySessions[session.sessionId] = session;
    }

    if (Array.isArray(answers) && answers.length > 0) {
      answers.forEach((ans: any) => {
        inMemoryLogs.push({ ...ans, receivedAt: Date.now() });
      });
    }

    // Forward to Google Apps Script Web App URL if configured
    const macroUrl = cleanEnv(process.env.GOOGLE_SHEET_MACRO_URL || process.env.APPS_SCRIPT_URL);
    let forwardStatus = "not_configured";

    if (macroUrl && macroUrl.startsWith("http")) {
      try {
        const fetchRes = await fetch(macroUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: action || "saveGame",
            eventId: eventId || "",
            sessionId: sessionId || (session && session.sessionId) || "",
            session,
            answers,
          }),
        });
        forwardStatus = fetchRes.ok ? "forwarded" : "forward_failed";
      } catch (err: any) {
        forwardStatus = `forward_error: ${err?.message || "unknown"}`;
      }
    }

    return res.status(200).json({
      success: true,
      forwardStatus,
      sessionId: sessionId || (session && session.sessionId),
      eventId,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || "Internal server error",
    });
  }
}
