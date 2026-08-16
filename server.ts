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

function getGoogleSheetWebhookUrl(): string {
  return cleanEnv(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.GOOGLE_SHEET_MACRO_URL ||
    process.env.APPS_SCRIPT_URL
  );
}

function getGoogleSheetDirectViewUrl(): string | null {
  const directUrl = cleanEnv(
    process.env.GOOGLE_SHEET_URL ||
    process.env.GOOGLE_SHEETS_URL ||
    process.env.SPREADSHEET_URL
  );
  if (directUrl && directUrl.includes("docs.google.com") && directUrl.includes("spreadsheets/d/")) {
    return directUrl;
  }
  const spreadsheetId = cleanEnv(process.env.GOOGLE_SPREADSHEET_ID);
  if (spreadsheetId) {
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  }
  return null;
}

function getGoogleSheetsWebhookSecret(): string {
  return cleanEnv(
    process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ||
    process.env.SHEETS_SECRET
  );
}

async function writeToGoogleSheet(payload: {
  action?: string;
  eventId?: string;
  sessionId: string;
  session?: any;
  answers?: any[];
  secret?: string;
}): Promise<{ success: boolean; persisted: boolean; error?: string }> {
  const webhookUrl = getGoogleSheetWebhookUrl();
  const secret = getGoogleSheetsWebhookSecret();

  if (payload.session && payload.sessionId) {
    inMemorySessions[payload.sessionId] = payload.session;
  }
  if (Array.isArray(payload.answers) && payload.answers.length > 0) {
    payload.answers.forEach((ans: any) => {
      inMemoryLogs.push({ ...ans, receivedAt: Date.now() });
    });
  }

  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    const noUrlMsg = "Chưa cấu hình biến môi trường GOOGLE_SHEETS_WEBHOOK_URL trên Vercel.";
    console.log(`[SHEETS_WRITE_FAILED] reason=no_webhook_url_configured`);
    return {
      success: false,
      persisted: false,
      error: noUrlMsg,
    };
  }

  const safeUrlDomain = webhookUrl.split("/")[2] || "script.google.com";
  console.log(
    `[SHEETS_REQUEST_START] target=${safeUrlDomain} method=POST sessionId=${payload.sessionId} answers=${payload.answers?.length || 0}`
  );

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const bodyToSend = {
      action: payload.action || "saveGame",
      eventId: payload.eventId || "",
      sessionId: payload.sessionId,
      session: payload.session,
      answers: payload.answers || [],
      secret: secret || undefined,
      webhookSecret: secret || undefined,
      key: secret || undefined,
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyToSend),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log(`[SHEETS_RESPONSE_STATUS] status=${response.status}`);

    const rawText = await response.text();
    console.log(`[SHEETS_RESPONSE_BODY] ${rawText.slice(0, 300)}`);

    let resJson: any = null;
    try {
      resJson = JSON.parse(rawText);
    } catch {}

    const isSuccess = response.ok && resJson && (resJson.status === "success" || resJson.success === true);

    if (isSuccess) {
      console.log(
        `[SHEETS_WRITE_SUCCESS] sessionId=${payload.sessionId} rows=${payload.answers?.length || 0}`
      );
      return { success: true, persisted: true };
    } else {
      const detailedError =
        (resJson && (resJson.message || resJson.error)) ||
        (rawText && rawText.trim().length > 0 ? rawText.slice(0, 300) : `HTTP_${response.status}`);
      console.log(`[SHEETS_WRITE_FAILED] error=${detailedError}`);
      return {
        success: false,
        persisted: false,
        error: detailedError,
      };
    }
  } catch (err: any) {
    const caughtMsg = err?.message || "network_timeout";
    console.log(`[SHEETS_WRITE_FAILED] error=${caughtMsg}`);
    return {
      success: false,
      persisted: false,
      error: caughtMsg,
    };
  }
}

async function fetchGoogleSheetData(): Promise<{
  sessions: any[];
  answers: any[];
  source: "sheets" | "memory";
  totalSessions: number;
  totalAnswers: number;
  fetchedAt: string;
}> {
  const webhookUrl = getGoogleSheetWebhookUrl();
  const secret = getGoogleSheetsWebhookSecret();

  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    const memSessions = Object.values(inMemorySessions);
    return {
      sessions: memSessions,
      answers: inMemoryLogs,
      source: "memory",
      totalSessions: memSessions.length,
      totalAnswers: inMemoryLogs.length,
      fetchedAt: new Date().toISOString(),
    };
  }

  const safeUrlDomain = webhookUrl.split("/")[2] || "script.google.com";

  try {
    const postController = new AbortController();
    const pTimeout = setTimeout(() => postController.abort(), 12000);

    console.log(`[SHEETS_REQUEST_START] target=${safeUrlDomain} method=POST action=readData`);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "readData",
        secret: secret || undefined,
        webhookSecret: secret || undefined,
      }),
      signal: postController.signal,
    }).catch(() => null);

    clearTimeout(pTimeout);

    if (response) {
      console.log(`[SHEETS_RESPONSE_STATUS] status=${response.status}`);
      const rawText = await response.text();
      console.log(`[SHEETS_RESPONSE_BODY] ${rawText.slice(0, 300)}`);

      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {}

      if (response.ok && data && (data.status === "success" || data.success === true || Array.isArray(data.sessions))) {
        const sheetSessions: any[] = Array.isArray(data.sessions) ? data.sessions : [];
        const sheetAnswers: any[] = Array.isArray(data.answers) ? data.answers : [];

        const sessionMap = new Map<string, any>();
        sheetSessions.forEach((s) => {
          if (s.sessionId) sessionMap.set(String(s.sessionId), s);
        });

        Object.values(inMemorySessions).forEach((s: any) => {
          if (s.sessionId && !sessionMap.has(String(s.sessionId))) {
            sessionMap.set(String(s.sessionId), s);
          }
        });

        const mergedSessions = Array.from(sessionMap.values());
        const mergedAnswers = [...sheetAnswers];

        console.log(
          `[SHEETS_FETCH_SUCCESS] totalSessions=${mergedSessions.length} totalAnswers=${mergedAnswers.length}`
        );

        return {
          sessions: mergedSessions,
          answers: mergedAnswers,
          source: "sheets",
          totalSessions: mergedSessions.length,
          totalAnswers: mergedAnswers.length,
          fetchedAt: data.fetchedAt || new Date().toISOString(),
        };
      } else {
        const errMsg = (data && (data.message || data.error)) || rawText.slice(0, 200) || `HTTP_${response.status}`;
        console.log(`[SHEETS_FETCH_FAILED] error=${errMsg}`);
      }
    }
  } catch (err: any) {
    console.log(`[SHEETS_READ_FALLBACK] reason=${err?.message || "error"}`);
  }

  const memSessions = Object.values(inMemorySessions);
  return {
    sessions: memSessions,
    answers: inMemoryLogs,
    source: "memory",
    totalSessions: memSessions.length,
    totalAnswers: inMemoryLogs.length,
    fetchedAt: new Date().toISOString(),
  };
}

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

// 2. Student sync endpoint (Saves student answers and persists to Google Sheets)
app.post("/api/sync-game-data", async (req, res) => {
  try {
    const { action, eventId, sessionId, studentName, className, game, answers, score, total, xp, session } = req.body;

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

    console.log(
      `[SYNC_GAME_RECEIVED] sessionId=${finalSessionId} student=${finalStudentName || "Anonymous"} class=${finalClassName || "None"} game=${finalGame || "batch"}`
    );

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
      error: error?.message || "Internal server error",
    });
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
app.get("/api/teacher/results", requireTeacherAuth, async (req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  const sheetData = await fetchGoogleSheetData();
  const sessionList = sheetData.sessions;
  const answerList = sheetData.answers;

  const finalSheetUrl = getGoogleSheetDirectViewUrl();
  const webhookUrl = getGoogleSheetWebhookUrl();
  const isConnected = !!(finalSheetUrl || webhookUrl);

  console.log(
    `[TEACHER_RESULTS_LOADED] count=${sessionList.length} answersCount=${answerList.length} source=${sheetData.source}`
  );

  res.json({
    success: true,
    source: sheetData.source,
    totalSessions: sessionList.length,
    totalLogs: answerList.length,
    sessions: sessionList,
    recentLogs: answerList.slice(-100),
    googleSheet: {
      connected: isConnected,
      hasDirectUrl: !!finalSheetUrl,
      url: finalSheetUrl || null,
      webhookConfigured: !!webhookUrl,
    },
    fetchedAt: sheetData.fetchedAt,
  });
});

// 2.1 Direct Google Sheet View URL (Protected with Teacher Auth)
app.get("/api/teacher/google-sheet-url", requireTeacherAuth, (req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  const url = getGoogleSheetDirectViewUrl();

  if (!url) {
    return res.json({
      success: true,
      configured: false,
      url: null,
      message: "Chưa cấu hình đường dẫn Google Sheet (biến GOOGLE_SHEET_URL).",
    });
  }

  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "docs.google.com" || !parsed.pathname.includes("spreadsheets/d/")) {
      return res.json({
        success: true,
        configured: false,
        url: null,
        message: "GOOGLE_SHEET_URL không đúng định dạng Google Sheets (phải là https://docs.google.com/spreadsheets/d/.../edit).",
      });
    }
  } catch {
    return res.json({
      success: true,
      configured: false,
      url: null,
      message: "Đường dẫn GOOGLE_SHEET_URL không hợp lệ.",
    });
  }

  return res.json({
    success: true,
    configured: true,
    url: url,
  });
});

// 3. Aggregated Class & Game Statistics (Protected with Teacher Auth)
app.get("/api/teacher/statistics", requireTeacherAuth, async (req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  const sheetData = await fetchGoogleSheetData();
  const sessionList = sheetData.sessions;
  const answerList = sheetData.answers;

  const totalPlays = sessionList.length;
  const completedStudents = sessionList.filter(
    (s: any) => s.completed === true || s.completed === "HOÀN THÀNH" || s.status === "completed"
  ).length;
  const totalXpDistributed = sessionList.reduce(
    (sum, s: any) => sum + (Number(s.totalXp) || 0),
    0
  );
  const avgAccuracy = totalPlays > 0
    ? Math.round(
        sessionList.reduce((sum, s: any) => sum + (Number(s.accuracyPercent) || 0), 0) / totalPlays
      )
    : 0;

  // Group by Class
  const classMap: Record<string, { totalStudents: number; completedCount: number; sumAccuracy: number; sumXp: number }> = {};
  sessionList.forEach((s: any) => {
    const cls = s.studentClass || s.className || "Chưa phân lớp";
    if (!classMap[cls]) {
      classMap[cls] = { totalStudents: 0, completedCount: 0, sumAccuracy: 0, sumXp: 0 };
    }
    classMap[cls].totalStudents += 1;
    if (s.completed === true || s.completed === "HOÀN THÀNH" || s.status === "completed") {
      classMap[cls].completedCount += 1;
    }
    classMap[cls].sumAccuracy += Number(s.accuracyPercent) || 0;
    classMap[cls].sumXp += Number(s.totalXp) || 0;
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

  if (answerList && answerList.length > 0) {
    answerList.forEach((log: any) => {
      const g = (log.game || "").toLowerCase();
      if (g && gameMap[g]) {
        gameMap[g].attempts += 1;
        if (log.isCorrect === true || log.isCorrect === "ĐÚNG") {
          gameMap[g].correct += 1;
        }
      }
    });
  } else {
    sessionList.forEach((s: any) => {
      if (s.scores) {
        Object.entries(s.scores).forEach(([gKey, scoreObj]: [string, any]) => {
          const g = gKey.toLowerCase();
          if (gameMap[g] && scoreObj) {
            const correct = Number(scoreObj.correct) || 0;
            const total = Number(scoreObj.total) || 0;
            gameMap[g].attempts += total;
            gameMap[g].correct += correct;
          }
        });
      }
    });
  }

  const gameStats = Object.entries(gameMap).map(([gameId, data]) => ({
    gameId: gameId as any,
    gameTitle: data.title,
    totalAttempts: data.attempts,
    correctAttempts: data.correct,
    accuracyPercent: data.attempts > 0 ? Math.round((data.correct / data.attempts) * 100) : 0,
  }));

  // Misconception Analysis
  const conceptErrors: Record<string, { conceptNameVi: string; totalErrors: number; sampleQId: string }> = {};
  answerList.forEach((log: any) => {
    const isWrong = log.isCorrect === false || log.isCorrect === "SAI";
    if (isWrong && log.concept) {
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

  console.log(
    `[TEACHER_STATISTICS_LOADED] totalPlays=${totalPlays} totalStudents=${classStats.reduce((sum, c) => sum + c.totalStudents, 0)} source=${sheetData.source}`
  );

  res.json({
    success: true,
    source: sheetData.source,
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
    fetchedAt: sheetData.fetchedAt,
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
