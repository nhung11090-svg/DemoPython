import crypto from "crypto";
import { ALL_QUESTIONS } from "../../src/data/index.js";

// Helper to sanitize environment variables (strip quotes, whitespace)
export function cleanEnv(val: string | undefined, defaultVal: string = ""): string {
  if (!val) return defaultVal;
  const cleaned = val.trim().replace(/^["']|["']$/g, "").trim();
  return cleaned || defaultVal;
}

export const TEACHER_USERNAME = cleanEnv(process.env.TEACHER_USERNAME, "giaovien");
export const TEACHER_PASSWORD = cleanEnv(process.env.TEACHER_PASSWORD, "giaovien2026");
export const TEACHER_SESSION_SECRET = cleanEnv(
  process.env.TEACHER_SESSION_SECRET || process.env.TEACHER_AUTH_SECRET,
  "pyquest_teacher_secret_key_2026_stateless_secure_token"
);

export function getGoogleSheetWebhookUrl(): string {
  return cleanEnv(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.GOOGLE_SHEET_MACRO_URL ||
    process.env.APPS_SCRIPT_URL ||
    process.env.GOOGLE_SHEETS_URL ||
    process.env.GOOGLE_SHEET_URL
  );
}

export function getGoogleSheetsWebhookSecret(): string {
  return cleanEnv(
    process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ||
    process.env.SHEETS_SECRET
  );
}

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

/**
 * Tạo Stateless Signed JWT Token bằng HMAC-SHA256
 */
export function createTeacherToken(username: string, durationSeconds: number = 8 * 3600): string {
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

/**
 * Xác thực Stateless Signed Token
 */
export function verifyTeacherToken(token: string): TeacherUserPayload | null {
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

// Helper to parse cookies from headers
export function parseCookies(req: any): Record<string, string> {
  const list: Record<string, string> = {};
  if (!req) return list;

  if (req.cookies && typeof req.cookies === "object" && Object.keys(req.cookies).length > 0) {
    return req.cookies;
  }

  const rawCookie = req.headers?.cookie || req.headers?.Cookie;
  if (!rawCookie) return list;

  const cookieHeader = Array.isArray(rawCookie) ? rawCookie.join("; ") : String(rawCookie);

  cookieHeader.split(";").forEach((cookie: string) => {
    let [name, ...rest] = cookie.split("=");
    name = name?.trim();
    if (!name) return;
    const value = rest.join("=").trim();
    list[name] = decodeURIComponent(value);
  });

  return list;
}

// Helper: Extract and verify teacher session token (Cookie or Bearer Header)
export function verifyTeacherSession(req: any): TeacherUserPayload | null {
  const cookies = parseCookies(req);
  const cookieToken = cookies?.teacher_session;

  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  const bearerToken =
    typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

  console.log(
    `[TEACHER_COOKIE_RECEIVED] cookiePresent=${!!cookieToken}, bearerPresent=${!!bearerToken}`
  );

  const token = bearerToken || cookieToken;
  if (!token) {
    console.log(`[TEACHER_TOKEN_VERIFIED] status=no_token_provided`);
    return null;
  }

  const payload = verifyTeacherToken(token);
  if (payload) {
    console.log(
      `[TEACHER_TOKEN_VERIFIED] status=valid, username=${payload.username}, role=${payload.role}`
    );
  } else {
    console.log(`[TEACHER_TOKEN_VERIFIED] status=invalid_or_expired`);
  }

  return payload;
}

/**
 * Tạo Cookie header string cho Vercel & Express
 */
export function createTeacherCookie(token: string, maxAgeSeconds: number = 8 * 3600, req?: any): string {
  const isHttps =
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL === "1" ||
    req?.headers?.["x-forwarded-proto"] === "https" ||
    req?.secure === true;

  const secureFlag = isHttps ? "; Secure" : "";
  const cookieString = `teacher_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secureFlag}`;

  console.log(
    `[TEACHER_COOKIE_CREATED] path=/, sameSite=Lax, maxAge=${maxAgeSeconds}, secure=${isHttps}`
  );
  return cookieString;
}

export function createClearCookie(): string {
  return "teacher_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

// In-Memory fallback store
const globalStore = globalThis as any;
if (!globalStore.__inMemorySessions) {
  globalStore.__inMemorySessions = {};
}
if (!globalStore.__inMemoryLogs) {
  globalStore.__inMemoryLogs = [];
}

export const inMemorySessions: Record<string, any> = globalStore.__inMemorySessions;
export const inMemoryLogs: any[] = globalStore.__inMemoryLogs;

/**
 * Ghi dữ liệu học sinh vào Google Sheets qua Apps Script Web App
 */
export async function writeToGoogleSheet(payload: {
  action?: string;
  eventId?: string;
  sessionId: string;
  session?: any;
  answers?: any[];
  secret?: string;
}): Promise<{ success: boolean; persisted: boolean; error?: string }> {
  const webhookUrl = getGoogleSheetWebhookUrl();
  const secret = getGoogleSheetsWebhookSecret();

  // In-memory fallback
  if (payload.session && payload.sessionId) {
    inMemorySessions[payload.sessionId] = payload.session;
  }
  if (Array.isArray(payload.answers) && payload.answers.length > 0) {
    payload.answers.forEach((ans: any) => {
      inMemoryLogs.push({ ...ans, receivedAt: Date.now() });
    });
  }

  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    console.log(`[SHEETS_WRITE_FAILED] reason=no_webhook_url_configured`);
    return {
      success: true,
      persisted: false,
      error: "GOOGLE_SHEETS_WEBHOOK_URL chưa được cấu hình. Dữ liệu tạm thời được lưu trong bộ nhớ serverless.",
    };
  }

  const safeUrlDomain = webhookUrl.split("/")[2] || "google.com";
  console.log(`[SHEETS_WRITE_START] target=${safeUrlDomain}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const bodyToSend = {
      action: payload.action || "saveGame",
      eventId: payload.eventId || "",
      sessionId: payload.sessionId,
      session: payload.session,
      answers: payload.answers || [],
      secret: secret || undefined,
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyToSend),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = `HTTP_${response.status}`;
      console.log(`[SHEETS_WRITE_FAILED] error=${errText}`);
      return { success: true, persisted: false, error: errText };
    }

    const resJson = await response.json().catch(() => ({ status: "unknown" }));
    const isSuccess = resJson.status === "success" || resJson.success === true;

    if (isSuccess) {
      console.log(
        `[SHEETS_WRITE_SUCCESS] sessionId=${payload.sessionId} game=${payload.session?.currentGame || "game"} rows=${payload.answers?.length || 0}`
      );
      return { success: true, persisted: true };
    } else {
      console.log(`[SHEETS_WRITE_FAILED] error=${resJson.message || "sheet_error"}`);
      return { success: true, persisted: false, error: resJson.message };
    }
  } catch (err: any) {
    console.log(`[SHEETS_WRITE_FAILED] error=${err?.message || "network_timeout"}`);
    return { success: true, persisted: false, error: err?.message };
  }
}

/**
 * Đọc dữ liệu học sinh từ Google Sheets cho Teacher Dashboard
 */
export async function fetchGoogleSheetData(): Promise<{
  sessions: any[];
  answers: any[];
  source: "sheets" | "memory";
  totalSessions: number;
  totalAnswers: number;
  fetchedAt: string;
}> {
  const webhookUrl = getGoogleSheetWebhookUrl();

  // If no sheets URL configured, return inMemory
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

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    // Thử đọc qua GET ?action=readData
    const readUrl = webhookUrl.includes("?")
      ? `${webhookUrl}&action=readData&_t=${Date.now()}`
      : `${webhookUrl}?action=readData&_t=${Date.now()}`;

    let response = await fetch(readUrl, {
      method: "GET",
      signal: controller.signal,
    }).catch(() => null);

    // Nếu GET không hỗ trợ hoặc trả về lỗi, thử POST { action: "readData" }
    if (!response || !response.ok) {
      const postController = new AbortController();
      const pTimeout = setTimeout(() => postController.abort(), 10000);
      response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "readData" }),
        signal: postController.signal,
      }).catch(() => null);
      clearTimeout(pTimeout);
    }

    clearTimeout(timeoutId);

    if (response && response.ok) {
      const data = await response.json();
      if (data && (data.status === "success" || Array.isArray(data.sessions))) {
        const sheetSessions: any[] = Array.isArray(data.sessions) ? data.sessions : [];
        const sheetAnswers: any[] = Array.isArray(data.answers) ? data.answers : [];

        // Hợp nhất dữ liệu Google Sheets với inMemory (ưu tiên bản ghi mới nhất)
        const sessionMap = new Map<string, any>();
        sheetSessions.forEach((s) => {
          if (s.sessionId) sessionMap.set(String(s.sessionId), s);
        });

        // Ghép các session trong memory nếu có (chưa kịp sync hoặc trong cùng phiên)
        Object.values(inMemorySessions).forEach((s: any) => {
          if (s.sessionId && !sessionMap.has(String(s.sessionId))) {
            sessionMap.set(String(s.sessionId), s);
          }
        });

        const mergedSessions = Array.from(sessionMap.values());
        const mergedAnswers = [...sheetAnswers];

        return {
          sessions: mergedSessions,
          answers: mergedAnswers,
          source: "sheets",
          totalSessions: mergedSessions.length,
          totalAnswers: mergedAnswers.length,
          fetchedAt: data.fetchedAt || new Date().toISOString(),
        };
      }
    }
  } catch (err: any) {
    console.log(`[SHEETS_READ_FALLBACK] reason=${err?.message || "error"}`);
  }

  // Fallback memory
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

export function getGoogleSheetConfig() {
  const googleSheetDirectUrl = cleanEnv(
    process.env.GOOGLE_SHEET_URL ||
    process.env.GOOGLE_SHEETS_URL ||
    process.env.SPREADSHEET_URL
  );
  const spreadsheetId = cleanEnv(process.env.GOOGLE_SPREADSHEET_ID);
  const webhookUrl = getGoogleSheetWebhookUrl();
  const finalSheetUrl = googleSheetDirectUrl || (spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit` : "");
  const isConnected = !!(finalSheetUrl || webhookUrl);

  return {
    connected: isConnected,
    url: finalSheetUrl || webhookUrl || null,
  };
}

export { ALL_QUESTIONS };
