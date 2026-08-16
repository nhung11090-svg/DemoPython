import { verifyTeacherSession, inMemorySessions, inMemoryLogs, ALL_QUESTIONS } from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  const session = verifyTeacherSession(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Yêu cầu đăng nhập tài khoản Giáo viên để truy cập thông tin này.",
    });
  }

  const sessionList = Object.values(inMemorySessions);
  const totalPlays = sessionList.length;
  const completedStudents = sessionList.filter((s: any) => s.completed || s.status === "completed").length;
  const totalXpDistributed = sessionList.reduce((sum: number, s: any) => sum + (s.totalXp || 0), 0);
  const avgAccuracy = totalPlays > 0
    ? Math.round(sessionList.reduce((sum: number, s: any) => sum + (s.accuracyPercent || 0), 0) / totalPlays)
    : 0;

  // Group by Class
  const classMap: Record<string, { totalStudents: number; completedCount: number; sumAccuracy: number; sumXp: number }> = {};
  sessionList.forEach((s: any) => {
    const cls = s.studentClass || "Chưa phân lớp";
    if (!classMap[cls]) {
      classMap[cls] = { totalStudents: 0, completedCount: 0, sumAccuracy: 0, sumXp: 0 };
    }
    classMap[cls].totalStudents += 1;
    if (s.completed || s.status === "completed") classMap[cls].completedCount += 1;
    classMap[cls].sumAccuracy += s.accuracyPercent || 0;
    classMap[cls].sumXp += s.totalXp || 0;
  });

  const classStats = Object.entries(classMap).map(([className, data]) => ({
    className,
    totalStudents: data.totalStudents,
    completedCount: data.completedCount,
    averageAccuracy: Math.round(data.sumAccuracy / data.totalStudents),
    averageXp: Math.round(data.sumXp / data.totalStudents),
  }));

  // Game Accuracy Stats
  const gameMap: Record<string, { title: string; attempts: number; correct: number }> = {
    predict: { title: "Đoán kết quả", attempts: 0, correct: 0 },
    variable: { title: "Theo dấu biến", attempts: 0, correct: 0 },
    bug: { title: "Thợ săn lỗi", attempts: 0, correct: 0 },
    ifmaze: { title: "Cánh cửa điều kiện", attempts: 0, correct: 0 },
    builder: { title: "Xây dựng chương trình", attempts: 0, correct: 0 },
    boss: { title: "Đấu Trùm Quái Vật", attempts: 0, correct: 0 },
  };

  inMemoryLogs.forEach((log: any) => {
    if (log.game && gameMap[log.game]) {
      gameMap[log.game].attempts += 1;
      if (log.isCorrect) gameMap[log.game].correct += 1;
    }
  });

  const gameStats = Object.entries(gameMap).map(([gameId, data]) => ({
    gameId: gameId as any,
    gameTitle: data.title,
    totalAttempts: data.attempts,
    correctAttempts: data.correct,
    accuracyPercent: data.attempts > 0 ? Math.round((data.correct / data.attempts) * 100) : 0,
  }));

  // Misconception Analysis
  const conceptErrors: Record<string, { conceptNameVi: string; totalErrors: number; sampleQId: string }> = {};
  inMemoryLogs.forEach((log: any) => {
    if (!log.isCorrect && log.concept) {
      if (!conceptErrors[log.concept]) {
        conceptErrors[log.concept] = {
          conceptNameVi: log.concept,
          totalErrors: 0,
          sampleQId: log.questionId,
        };
      }
      conceptErrors[log.concept].totalErrors += 1;
    }
  });

  const topMisconceptions = Object.entries(conceptErrors)
    .map(([concept, data]) => {
      const q = ALL_QUESTIONS.find((item: any) => item.id === data.sampleQId);
      return {
        concept,
        conceptNameVi: data.conceptNameVi,
        totalErrors: data.totalErrors,
        sampleQuestionId: data.sampleQId,
        sampleQuestionText: q ? q.question : "",
        explanation: q ? q.explanation : "",
      };
    })
    .sort((a, b) => b.totalErrors - a.totalErrors)
    .slice(0, 5);

  return res.status(200).json({
    success: true,
    stats: {
      totalPlays,
      completedStudents,
      averageAccuracy: avgAccuracy,
      totalXpDistributed,
      classStats,
      gameStats,
      topMisconceptions,
      hardestQuestions: [],
    },
  });
}
