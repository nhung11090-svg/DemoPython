export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    status: "ok",
    message: "Python Quest API is running on Vercel Serverless Functions",
  });
}
