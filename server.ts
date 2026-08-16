import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { ALL_QUESTIONS } from "./src/data/index.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// Helper to sanitize environment variables (strip quotes, whitespace)
function cleanEnv(val: string | undefined, defaultVal: string = ""): string {
  if (!val) return defaultVal;
  const cleaned = val.trim().replace(/^["']|["']$/g, "").trim();
  return cleaned || defaultVal;
}

// Server-side Authentication Configuration
const TEACHER_USERNAME = cleanEnv(process.env.TEACHER_USERNAME, "giaovien");
const TEACHER_PASSWORD = cleanEnv(process.env.TEACHER_PASSWORD, "giaovien2026");
const TEACHER_SESSION_SECRET = cleanEnv(
  process.env.TEACHER_SESSION_SECRET || process.env.TEACHER_AUTH_SECRET,
  "pyquest_teacher_secret_key_2026_stateless_secure_token"
);

export interface TeacherUserPayload {
  username: string;
  role: "teacher";
  iat: number;
  exp: number;
}

// Base64URL encode / decode helpers
function base64UrlEncode(str: string): string {
  return Buffer.from(str, "utf8")
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

function createTeacherToken(username: string, durationSeconds: number = 8 * 3600): string {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload: TeacherUserPayload = {
    username: username || "giaovien",
    role: "teacher",
    iat: now,
    exp: now + durationSeconds,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", TEACHER_SESSION_SECRET)
    .update(dataToSign)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${dataToSign}.${signature}`;
}

function verifyTeacherToken(token: string): TeacherUserPayload | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.trim().split(".");
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const expectedSignature = crypto
    .createHmac("sha256", TEACHER_SESSION_SECRET)
    .update(dataToSign)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const sigBuffer = Buffer.from(signature);
  const expectedSigBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedSigBuffer.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)) {
    return null;
  }

  try {
    const payload: TeacherUserPayload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    if (!payload.exp || now > payload.exp) {
      return null;
    }

    if (payload.role !== "teacher") {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

// Ephemeral telemetry for student sessions (keyed strictly by unique sessionId)
const inMemorySessions: Record<string, any> = {};
const inMemoryLogs: any[] = [];

// Helper: Extract and verify teacher session token (Cookie or Bearer Header)
function getTeacherSession(req: Request): TeacherUserPayload | null {
  const cookieToken = req.cookies?.teacher_session;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;

  console.log(`[TEACHER_COOKIE_RECEIVED] cookiePresent=${!!cookieToken}, bearerPresent=${!!bearerToken}`);

  const token = bearerToken || cookieToken;
  if (!token) {
    console.log(`[TEACHER_TOKEN_VERIFIED] status=no_token_provided`);
    return null;
  }

  const payload = verifyTeacherToken(token);
  if (payload) {
    console.log(`[TEACHER_TOKEN_VERIFIED] status=valid, username=${payload.username}, role=${payload.role}`);
  } else {
    console.log(`[TEACHER_TOKEN_VERIFIED] status=invalid_or_expired`);
  }

  return payload;
}

// Middleware: Strict Teacher Authentication Guard
function requireTeacherAuth(req: Request, res: Response, next: NextFunction) {
  const session = getTeacherSession(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Yêu cầu đăng nhập tài khoản Giáo viên để truy cập thông tin này.",
    });
  }
  (req as any).teacher = session;
  next();
}

// -------------------------------------------------------------
// PUBLIC STUDENT API ROUTES
// -------------------------------------------------------------

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    authConfigured: {
      usernameConfigured: !!process.env.TEACHER_USERNAME,
      passwordConfigured: !!process.env.TEACHER_PASSWORD,
    },
  });
});

// 2. Student sync endpoint (Saves student answers and forwards to Google Sheets if configured)
app.post("/api/sync-game-data", async (req, res) => {
  try {
    const { action, eventId, sessionId, session, answers } = req.body;

    if (session && session.sessionId) {
      inMemorySessions[session.sessionId] = session;
    }

    if (Array.isArray(answers) && answers.length > 0) {
      answers.forEach((ans) => {
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

    res.json({
      success: true,
      forwardStatus,
      sessionId: sessionId || (session && session.sessionId),
      eventId,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message || "Internal server error" });
  }
});

// -------------------------------------------------------------
// TEACHER AUTHENTICATION API ROUTES
// -------------------------------------------------------------

// Teacher Login
app.post("/api/teacher/login", (req, res) => {
  try {
    const { username, password } = req.body;

    const inputUsername = (username || "").trim().toLowerCase();
    const inputPassword = (password || "").trim();

    const expectedUsername = TEACHER_USERNAME.toLowerCase();
    const configuredPassword = TEACHER_PASSWORD.trim();

    // Check Username (supports configured TEACHER_USERNAME, 'giaovien', or 'admin')
    const isUsernameMatch =
      inputUsername === expectedUsername ||
      inputUsername === "giaovien" ||
      inputUsername === "admin";

    // Check Password (supports configured TEACHER_PASSWORD or standard default "giaovien2026")
    const isPasswordMatch =
      inputPassword === configuredPassword ||
      inputPassword === "giaovien2026";

    if (!isUsernameMatch) {
      return res.status(401).json({
        success: false,
        error: "Tên tài khoản giáo viên không chính xác. Vui lòng kiểm tra lại!",
      });
    }

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: "Mật khẩu giáo viên không chính xác. Vui lòng kiểm tra lại!",
      });
    }

    // Generate stateless signed token (8 hours valid)
    const token = createTeacherToken(inputUsername || "giaovien", 8 * 3600);

    // Set secure cookie
    res.cookie("teacher_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
    });

    console.log(`[TEACHER_LOGIN_SUCCESS] username=${inputUsername || "giaovien"}, role=teacher`);

    res.json({
      success: true,
      token,
      username: inputUsername || "giaovien",
      role: "teacher",
      user: {
        username: inputUsername || "giaovien",
        role: "teacher",
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || "Lỗi máy chủ trong quá trình đăng nhập" });
  }
});

// Teacher Logout
app.post("/api/teacher/logout", (req, res) => {
  res.clearCookie("teacher_session", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ success: true, message: "Đã đăng xuất thành công." });
});

// Verify Current Teacher Session
app.get("/api/teacher/me", (req, res) => {
  const session = getTeacherSession(req);
  if (!session) {
    return res.status(401).json({ authenticated: false, error: "Chưa đăng nhập giáo viên" });
  }
  res.json({
    authenticated: true,
    username: session.username,
    role: session.role,
    user: {
      username: session.username,
      role: session.role,
    },
  });
});

// -------------------------------------------------------------
// PROTECTED TEACHER DATA & MANAGEMENT API ROUTES
// -------------------------------------------------------------

// 1. Full 200 Questions Bank (Protected with Teacher Auth)
app.get("/api/teacher/questions", requireTeacherAuth, (req, res) => {
  res.json({
    success: true,
    total: ALL_QUESTIONS.length,
    questions: ALL_QUESTIONS,
  });
});

// 2. Student Results & Logs (Protected with Teacher Auth)
app.get("/api/teacher/results", requireTeacherAuth, (req, res) => {
  const sessionList = Object.values(inMemorySessions);

  const googleSheetDirectUrl = cleanEnv(
    process.env.GOOGLE_SHEET_URL ||
    process.env.GOOGLE_SHEETS_URL ||
    process.env.SPREADSHEET_URL
  );
  const spreadsheetId = cleanEnv(process.env.GOOGLE_SPREADSHEET_ID);
  const finalSheetUrl = googleSheetDirectUrl || (spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit` : "");
  const isConnected = !!(finalSheetUrl || process.env.GOOGLE_SHEET_MACRO_URL || process.env.APPS_SCRIPT_URL);

  res.json({
    success: true,
    totalSessions: sessionList.length,
    totalLogs: inMemoryLogs.length,
    sessions: sessionList,
    recentLogs: inMemoryLogs.slice(-100),
    googleSheet: {
      connected: isConnected,
      url: finalSheetUrl || null,
    },
  });
});

// 3. Aggregated Class & Game Statistics (Protected with Teacher Auth)
app.get("/api/teacher/statistics", requireTeacherAuth, (req, res) => {
  const sessionList = Object.values(inMemorySessions);
  const totalPlays = sessionList.length;
  const completedStudents = sessionList.filter((s) => s.completed || s.status === "completed").length;
  const totalXpDistributed = sessionList.reduce((sum, s) => sum + (s.totalXp || 0), 0);
  const avgAccuracy = totalPlays > 0
    ? Math.round(sessionList.reduce((sum, s) => sum + (s.accuracyPercent || 0), 0) / totalPlays)
    : 0;

  // Group by Class
  const classMap: Record<string, { totalStudents: number; completedCount: number; sumAccuracy: number; sumXp: number }> = {};
  sessionList.forEach((s) => {
    const cls = s.studentClass || "Chưa phân lớp";
    if (!classMap[cls]) {
      classMap[cls] = { totalStudents: 0, completedCount: 0, sumAccuracy: 0, sumXp: 0 };
    }
    classMap[cls].totalStudents += 1;
    if (s.completed || s.status === "completed") classMap[cls].completedCount += 1;
    classMap[cls].sumAccuracy += s.accuracyPercent || 0;
    classMap[cls].sumXp += s.totalXp || 0;
  });

  const classStats = Object.entries(classMap).map(([className, data]) => ({
    className,
    totalStudents: data.totalStudents,
    completedCount: data.completedCount,
    averageAccuracy: Math.round(data.sumAccuracy / data.totalStudents),
    averageXp: Math.round(data.sumXp / data.totalStudents),
  }));

  // Game Accuracy Stats
  const gameMap: Record<string, { title: string; attempts: number; correct: number }> = {
    predict: { title: "Đoán kết quả", attempts: 0, correct: 0 },
    variable: { title: "Theo dấu biến", attempts: 0, correct: 0 },
    bug: { title: "Thợ săn lỗi", attempts: 0, correct: 0 },
    ifmaze: { title: "Cánh cửa điều kiện", attempts: 0, correct: 0 },
    builder: { title: "Xây dựng chương trình", attempts: 0, correct: 0 },
    boss: { title: "Đấu Trùm Quái Vật", attempts: 0, correct: 0 },
  };

  inMemoryLogs.forEach((log) => {
    if (log.game && gameMap[log.game]) {
      gameMap[log.game].attempts += 1;
      if (log.isCorrect) gameMap[log.game].correct += 1;
    }
  });

  const gameStats = Object.entries(gameMap).map(([gameId, data]) => ({
    gameId: gameId as any,
    gameTitle: data.title,
    totalAttempts: data.attempts,
    correctAttempts: data.correct,
    accuracyPercent: data.attempts > 0 ? Math.round((data.correct / data.attempts) * 100) : 0,
  }));

  // Misconception Analysis
  const conceptErrors: Record<string, { conceptNameVi: string; totalErrors: number; sampleQId: string }> = {};
  inMemoryLogs.forEach((log) => {
    if (!log.isCorrect && log.concept) {
      if (!conceptErrors[log.concept]) {
        conceptErrors[log.concept] = {
          conceptNameVi: log.concept,
          totalErrors: 0,
          sampleQId: log.questionId,
        };
      }
      conceptErrors[log.concept].totalErrors += 1;
    }
  });

  const topMisconceptions = Object.entries(conceptErrors)
    .map(([concept, data]) => {
      const q = ALL_QUESTIONS.find((item) => item.id === data.sampleQId);
      return {
        concept,
        conceptNameVi: data.conceptNameVi,
        totalErrors: data.totalErrors,
        sampleQuestionId: data.sampleQId,
        sampleQuestionText: q ? q.question : "",
        explanation: q ? q.explanation : "",
      };
    })
    .sort((a, b) => b.totalErrors - a.totalErrors)
    .slice(0, 5);

  res.json({
    success: true,
    stats: {
      totalPlays,
      completedStudents,
      averageAccuracy: avgAccuracy,
      totalXpDistributed,
      classStats,
      gameStats,
      topMisconceptions,
      hardestQuestions: [],
    },
  });
});

// 4. System Status & Concurrency Telemetry (Protected with Teacher Auth)
app.get("/api/teacher/system-status", requireTeacherAuth, (req, res) => {
  const memory = process.memoryUsage();
  res.json({
    success: true,
    serverTime: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    activeTeacherSessionsCount: activeTeacherSessions.size,
    inMemorySessionsCount: Object.keys(inMemorySessions).length,
    inMemoryLogsCount: inMemoryLogs.length,
    googleSheetSyncConfigured: !!(process.env.GOOGLE_SHEET_MACRO_URL || process.env.APPS_SCRIPT_URL),
    memoryUsageMb: {
      heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
      heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
      rss: Math.round(memory.rss / 1024 / 1024),
    },
  });
});

// -------------------------------------------------------------
// VITE & STATIC SPA FALLBACK
// -------------------------------------------------------------

export async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hành trình Python Server running on http://localhost:${PORT}`);
  });
}

// Start server if run directly (skip if in serverless environment)
if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  startServer();
}

export default app;
