import { verifyTeacherSession, getGoogleSheetDirectViewUrl } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  // Teacher Authentication Required
  const teacher = verifyTeacherSession(req);
  if (!teacher) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Yêu cầu đăng nhập tài khoản Giáo viên để thực hiện thao tác này.",
    });
  }

  const url = getGoogleSheetDirectViewUrl();

  if (!url) {
    return res.status(200).json({
      success: true,
      configured: false,
      url: null,
      message: "Chưa cấu hình đường dẫn Google Sheet (biến GOOGLE_SHEET_URL).",
    });
  }

  // Strict domain and path validation
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "docs.google.com" || !parsed.pathname.includes("spreadsheets/d/")) {
      return res.status(200).json({
        success: true,
        configured: false,
        url: null,
        message: "GOOGLE_SHEET_URL không đúng định dạng Google Sheets (phải là https://docs.google.com/spreadsheets/d/.../edit).",
      });
    }
  } catch {
    return res.status(200).json({
      success: true,
      configured: false,
      url: null,
      message: "Đường dẫn GOOGLE_SHEET_URL không hợp lệ.",
    });
  }

  return res.status(200).json({
    success: true,
    configured: true,
    url: url,
  });
}
