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

  // Timing safe comparison to prevent timing attacks
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

    // Check expiration
    if (!payload.exp || now > payload.exp) {
      return null;
    }

    // Check role
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
  const cookieHeader = req.headers?.cookie || req.headers?.Cookie;
  if (!cookieHeader) return list;

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
  const cookies = req.cookies || parseCookies(req);
  const cookieToken = cookies?.teacher_session;

  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  const bearerToken =
    typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

  const token = bearerToken || cookieToken;
  if (!token) return null;

  return verifyTeacherToken(token);
}

/**
 * Tạo Cookie header string cho Vercel & Express
 */
export function createTeacherCookie(token: string, maxAgeSeconds: number = 8 * 3600): string {
  // Always include standard secure flags
  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  return `teacher_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${
    isProduction ? "; Secure" : ""
  }`;
}

export function createClearCookie(): string {
  return "teacher_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

// Ephemeral telemetry for student submissions & live stats
const globalStore = globalThis as any;
if (!globalStore.__inMemorySessions) {
  globalStore.__inMemorySessions = {};
}
if (!globalStore.__inMemoryLogs) {
  globalStore.__inMemoryLogs = [];
}

export const inMemorySessions: Record<string, any> = globalStore.__inMemorySessions;
export const inMemoryLogs: any[] = globalStore.__inMemoryLogs;

export function getGoogleSheetConfig() {
  const googleSheetDirectUrl = cleanEnv(
    process.env.GOOGLE_SHEET_URL ||
    process.env.GOOGLE_SHEETS_URL ||
    process.env.SPREADSHEET_URL
  );
  const spreadsheetId = cleanEnv(process.env.GOOGLE_SPREADSHEET_ID);
  const finalSheetUrl = googleSheetDirectUrl || (spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit` : "");
  const isConnected = !!(finalSheetUrl || process.env.GOOGLE_SHEET_MACRO_URL || process.env.APPS_SCRIPT_URL);

  return {
    connected: isConnected,
    url: finalSheetUrl || null,
  };
}

export { ALL_QUESTIONS };
