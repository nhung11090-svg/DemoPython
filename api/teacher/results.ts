import { verifyTeacherSession, inMemorySessions, inMemoryLogs, getGoogleSheetConfig } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  const session = verifyTeacherSession(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Yêu cầu đăng nhập tài khoản Giáo viên để truy cập thông tin này.",
    });
  }

  const sessionList = Object.values(inMemorySessions);
  const googleSheet = getGoogleSheetConfig();

  return res.status(200).json({
    success: true,
    totalSessions: sessionList.length,
    totalLogs: inMemoryLogs.length,
    sessions: sessionList,
    recentLogs: inMemoryLogs.slice(-100),
    googleSheet,
  });
}
