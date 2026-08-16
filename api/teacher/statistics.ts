import {
  verifyTeacherSession,
  fetchGoogleSheetData,
  ALL_QUESTIONS,
} from "../_lib/auth.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  const session = verifyTeacherSession(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Yêu cầu đăng nhập tài khoản Giáo viên để truy cập thông tin này.",
    });
  }

  // Đọc từ Google Sheets (Source of Truth)
  const sheetData = await fetchGoogleSheetData();
  const sessionList = sheetData.sessions;
  const answerList = sheetData.answers;

  const totalPlays = sessionList.length;
  const completedStudents = sessionList.filter(
    (s: any) => s.completed === true || s.completed === "HOÀN THÀNH" || s.status === "completed"
  ).length;

  const totalXpDistributed = sessionList.reduce(
    (sum: number, s: any) => sum + (Number(s.totalXp) || 0),
    0
  );

  const avgAccuracy = totalPlays > 0
    ? Math.round(
        sessionList.reduce((sum: number, s: any) => sum + (Number(s.accuracyPercent) || 0), 0) /
          totalPlays
      )
    : 0;

  // Group by Class
  const classMap: Record<
    string,
    { totalStudents: number; completedCount: number; sumAccuracy: number; sumXp: number }
  > = {};

  sessionList.forEach((s: any) => {
    const cls = s.studentClass || s.className || "Chưa phân lớp";
    if (!classMap[cls]) {
      classMap[cls] = { totalStudents: 0, completedCount: 0, sumAccuracy: 0, sumXp: 0 };
    }
    classMap[cls].totalStudents += 1;
    if (s.completed === true || s.completed === "HOÀN THÀNH" || s.status === "completed") {
      classMap[cls].completedCount += 1;
    }
    classMap[cls].sumAccuracy += Number(s.accuracyPercent) || 0;
    classMap[cls].sumXp += Number(s.totalXp) || 0;
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

  // Tính thống kê câu trả lời từ answerList (nếu có) hoặc từ session.scores
  if (answerList && answerList.length > 0) {
    answerList.forEach((log: any) => {
      const g = (log.game || "").toLowerCase();
      if (g && gameMap[g]) {
        gameMap[g].attempts += 1;
        if (log.isCorrect === true || log.isCorrect === "ĐÚNG") {
          gameMap[g].correct += 1;
        }
      }
    });
  } else {
    // Fallback tính từ session.scores
    sessionList.forEach((s: any) => {
      if (s.scores) {
        Object.entries(s.scores).forEach(([gKey, scoreObj]: [string, any]) => {
          const g = gKey.toLowerCase();
          if (gameMap[g] && scoreObj) {
            const correct = Number(scoreObj.correct) || 0;
            const total = Number(scoreObj.total) || 0;
            gameMap[g].attempts += total;
            gameMap[g].correct += correct;
          }
        });
      }
    });
  }

  const gameStats = Object.entries(gameMap).map(([gameId, data]) => ({
    gameId: gameId as any,
    gameTitle: data.title,
    totalAttempts: data.attempts,
    correctAttempts: data.correct,
    accuracyPercent: data.attempts > 0 ? Math.round((data.correct / data.attempts) * 100) : 0,
  }));

  // Misconception Analysis
  const conceptErrors: Record<
    string,
    { conceptNameVi: string; totalErrors: number; sampleQId: string }
  > = {};

  answerList.forEach((log: any) => {
    const isWrong = log.isCorrect === false || log.isCorrect === "SAI";
    if (isWrong && log.concept) {
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

  console.log(
    `[TEACHER_STATISTICS_LOADED] totalPlays=${totalPlays} totalStudents=${classStats.reduce((sum, c) => sum + c.totalStudents, 0)} source=${sheetData.source}`
  );

  return res.status(200).json({
    success: true,
    source: sheetData.source,
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
    fetchedAt: sheetData.fetchedAt,
  });
}
