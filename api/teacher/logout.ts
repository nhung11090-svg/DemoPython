import { parseCookies, destroyTeacherSession } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  const cookies = req.cookies || parseCookies(req);
  const cookieToken = cookies?.teacher_session;
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  const bearerToken = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;

  const token = bearerToken || cookieToken;
  if (token) {
    destroyTeacherSession(token);
  }

  res.setHeader("Set-Cookie", "teacher_session=; Path=/; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
  return res.status(200).json({
    success: true,
    message: "Đã đăng xuất thành công.",
  });
}
