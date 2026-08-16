import { createClearCookie } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  // Clear cookie header on response
  res.setHeader("Set-Cookie", createClearCookie());

  return res.status(200).json({
    success: true,
    message: "Đã đăng xuất thành công.",
  });
}
