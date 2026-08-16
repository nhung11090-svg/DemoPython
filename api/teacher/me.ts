import { verifyTeacherSession } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  const session = verifyTeacherSession(req);
  if (!session) {
    return res.status(401).json({
      authenticated: false,
      error: "Chưa đăng nhập giáo viên",
    });
  }

  return res.status(200).json({
    authenticated: true,
    user: {
      username: session.username,
      role: session.role,
    },
  });
}
