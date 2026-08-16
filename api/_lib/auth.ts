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
  "pyquest_teacher_secret_key_2026"
);

// Global / module level in-memory session stores
export interface TeacherSessionRecord {
  token: string;
  username: string;
  role: "teacher" | "admin";
  createdAt: number;
  expiresAt: number;
}

// Global active sessions & telemetry store
const globalStore = globalThis as any;
if (!globalStore.__activeTeacherSessions) {
  globalStore.__activeTeacherSessions = new Map<string, TeacherSessionRecord>();
}
if (!globalStore.__inMemorySessions) {
  globalStore.__inMemorySessions = {};
}
if (!globalStore.__inMemoryLogs) {
  globalStore.__inMemoryLogs = [];
}

export const activeTeacherSessions: Map<string, TeacherSessionRecord> = globalStore.__activeTeacherSessions;
export const inMemorySessions: Record<string, any> = globalStore.__inMemorySessions;
export const inMemoryLogs: any[] = globalStore.__inMemoryLogs;

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
export function verifyTeacherSession(req: any): TeacherSessionRecord | null {
  const cookies = req.cookies || parseCookies(req);
  const cookieToken = cookies?.teacher_session;
  
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  const bearerToken = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;

  const token = bearerToken || cookieToken;
  if (!token) return null;

  const session = activeTeacherSessions.get(token);
  if (!session) return null;

  // Check expiration (24h validity)
  if (Date.now() > session.expiresAt) {
    activeTeacherSessions.delete(token);
    return null;
  }

  return session;
}

export function createTeacherSession(username: string): TeacherSessionRecord {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const teacherUser: TeacherSessionRecord = {
    token,
    username: username || "giaovien",
    role: "teacher",
    createdAt: Date.now(),
    expiresAt,
  };
  activeTeacherSessions.set(token, teacherUser);
  return teacherUser;
}

export function destroyTeacherSession(token: string): void {
  if (token) {
    activeTeacherSessions.delete(token);
  }
}

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
