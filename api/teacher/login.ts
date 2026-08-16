import { TEACHER_USERNAME, TEACHER_PASSWORD, createTeacherSession } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  // Set CORS and JSON content type
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { username, password } = body;

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

    const session = createTeacherSession(username?.trim() || "giaovien");

    // Set Set-Cookie header for standard serverless response
    const cookieString = `teacher_session=${session.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;
    res.setHeader("Set-Cookie", cookieString);

    return res.status(200).json({
      success: true,
      token: session.token,
      user: {
        username: session.username,
        role: session.role,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || "Lỗi máy chủ trong quá trình đăng nhập",
    });
  }
}
