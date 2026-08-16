import { TEACHER_USERNAME, TEACHER_PASSWORD } from "./_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  return res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
    authConfigured: {
      usernameConfigured: !!process.env.TEACHER_USERNAME,
      passwordConfigured: !!process.env.TEACHER_PASSWORD,
    },
  });
}
