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

  // In-memory record keeping
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
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

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
    } catch {
      // Non-JSON response (e.g. Google error HTML)
    }

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
  const secret = getGoogleSheetsWebhookSecret();

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

        // Hợp nhất dữ liệu Google Sheets với inMemory (ưu tiên bản ghi từ Sheets)
        const sessionMap = new Map<string, any>();
        sheetSessions.forEach((s) => {
          if (s.sessionId) sessionMap.set(String(s.sessionId), s);
        });

        // Ghép các session trong memory nếu có
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

export function getGoogleSheetDirectViewUrl(): string | null {
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

export function getGoogleSheetConfig() {
  const finalSheetUrl = getGoogleSheetDirectViewUrl();
  const webhookUrl = getGoogleSheetWebhookUrl();
  const isConnected = !!(finalSheetUrl || webhookUrl);

  return {
    connected: isConnected,
    hasDirectUrl: !!finalSheetUrl,
    url: finalSheetUrl || null,
    webhookConfigured: !!webhookUrl,
  };
}

export { ALL_QUESTIONS };
