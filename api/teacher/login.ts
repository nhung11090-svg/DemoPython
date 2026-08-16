import {
  TEACHER_USERNAME,
  TEACHER_PASSWORD,
  createTeacherToken,
  createTeacherCookie,
} from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
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

    // Check Password (supports configured TEACHER_PASSWORD or default fallback "giaovien2026")
    const isPasswordMatch =
      inputPassword === configuredPassword ||
      inputPassword === "giaovien2026";

    if (!isUsernameMatch) {
      console.log(`[TEACHER_LOGIN_FAILED] Invalid username: ${inputUsername}`);
      return res.status(401).json({
        success: false,
        error: "Tên tài khoản giáo viên không chính xác. Vui lòng kiểm tra lại!",
      });
    }

    if (!isPasswordMatch) {
      console.log(`[TEACHER_LOGIN_FAILED] Invalid password for user: ${inputUsername}`);
      return res.status(401).json({
        success: false,
        error: "Mật khẩu giáo viên không chính xác. Vui lòng kiểm tra lại!",
      });
    }

    // Generate Stateless Signed Token (8 hours valid)
    const token = createTeacherToken(inputUsername || "giaovien", 8 * 3600);

    // Attach Set-Cookie (Path=/, HttpOnly, SameSite=Lax)
    const cookieHeader = createTeacherCookie(token, 8 * 3600, req);
    res.setHeader("Set-Cookie", cookieHeader);

    // Safe logging without credentials
    console.log(`[TEACHER_LOGIN_SUCCESS] username=${inputUsername || "giaovien"}, role=teacher`);

    return res.status(200).json({
      success: true,
      token,
      username: inputUsername || "giaovien",
      role: "teacher",
      user: {
        username: inputUsername || "giaovien",
        role: "teacher",
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || "Lỗi máy chủ trong quá trình đăng nhập",
    });
  }
}
