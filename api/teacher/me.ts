import { verifyTeacherSession } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "GET") {
    return res.status(405).json({ authenticated: false, error: "Method Not Allowed" });
  }

  const session = verifyTeacherSession(req);
  if (!session) {
    return res.status(401).json({
      authenticated: false,
      error: "Chưa đăng nhập giáo viên hoặc phiên đăng nhập đã hết hạn",
    });
  }

  return res.status(200).json({
    authenticated: true,
    username: session.username,
    role: session.role,
    user: {
      username: session.username,
      role: session.role,
    },
  });
}
