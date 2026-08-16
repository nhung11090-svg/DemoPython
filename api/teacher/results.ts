import {
  verifyTeacherSession,
  fetchGoogleSheetData,
  getGoogleSheetConfig,
} from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  const session = verifyTeacherSession(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Yêu cầu đăng nhập tài khoản Giáo viên để truy cập thông tin này.",
    });
  }

  // Đọc dữ liệu từ Google Sheets (Source of Truth)
  const sheetData = await fetchGoogleSheetData();
  const sessionList = sheetData.sessions;
  const answerList = sheetData.answers;
  const googleSheet = getGoogleSheetConfig();

  console.log(
    `[TEACHER_RESULTS_LOADED] count=${sessionList.length} answersCount=${answerList.length} source=${sheetData.source}`
  );

  return res.status(200).json({
    success: true,
    source: sheetData.source,
    totalSessions: sessionList.length,
    totalLogs: answerList.length,
    sessions: sessionList,
    recentLogs: answerList.slice(-100),
    googleSheet,
    fetchedAt: sheetData.fetchedAt,
  });
}
