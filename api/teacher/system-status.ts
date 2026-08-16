import { verifyTeacherSession, inMemorySessions, inMemoryLogs } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  const session = verifyTeacherSession(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Yêu cầu đăng nhập tài khoản Giáo viên để truy cập thông tin này.",
    });
  }

  const memory = process.memoryUsage();
  return res.status(200).json({
    success: true,
    serverTime: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    inMemorySessionsCount: Object.keys(inMemorySessions).length,
    inMemoryLogsCount: inMemoryLogs.length,
    googleSheetSyncConfigured: !!(process.env.GOOGLE_SHEET_MACRO_URL || process.env.APPS_SCRIPT_URL),
    memoryUsageMb: {
      heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
      heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
      rss: Math.round(memory.rss / 1024 / 1024),
    },
  });
}
