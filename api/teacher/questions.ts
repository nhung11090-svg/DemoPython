import { verifyTeacherSession, ALL_QUESTIONS } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  const session = verifyTeacherSession(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Yêu cầu đăng nhập tài khoản Giáo viên để truy cập thông tin này.",
    });
  }

  return res.status(200).json({
    success: true,
    total: ALL_QUESTIONS.length,
    questions: ALL_QUESTIONS,
  });
}
