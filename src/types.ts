export type GameId = 'predict' | 'variable' | 'bug' | 'ifmaze' | 'builder' | 'boss';

export type QuestionType = 'single' | 'multiple' | 'reorder';

export type SyncStatus = 'synced' | 'syncing' | 'pending' | 'offline';

export interface QuestionOption {
  id: string;
  text: string;
}

// Alias for backwards compatibility
export type Option = QuestionOption;

export interface Question {
  id: string;
  game: 'predict' | 'variable' | 'bug' | 'ifmaze' | 'builder';
  difficulty: 1 | 2 | 3 | 4; // 1: Nhận biết, 2: Thông hiểu, 3: Vận dụng, 4: Vận dụng cao
  concept: string;
  conceptNameVi: string;
  type: QuestionType;
  code: string;
  question: string;
  options: QuestionOption[];
  correctAnswers: string[];
  validSequences?: string[][];
  explanation: string;
  wrongExplanations?: Record<string, string>;
  stepByStep?: string[];
  takeaway: string;
  misconception?: string;
  bugType?: 'Syntax Error' | 'Type Error' | 'Logic Error' | 'Name Error' | 'ZeroDivision Error' | 'Indentation Error' | 'Index Error';
}

export interface GameScore {
  correct: number;
  total: number;
  xp: number;
}

export interface AnswerLog {
  eventId: string;
  sessionId: string;
  studentName: string;
  studentClass: string;
  game: string;
  questionId: string;
  difficulty: number;
  concept: string;
  isCorrect: boolean;
  selectedOptionIds: string[];
  correctAnswers: string[];
  xpEarned: number;
  timeSpentMs: number;
  timestamp: number;
}

export interface StudentSession {
  sessionId: string;
  studentName: string;
  studentClass: string;
  startTime: number;
  endTime?: number;
  durationSeconds?: number;
  currentGame: GameId | null;
  currentQuestionIndex: number;
  scores: Record<GameId, GameScore>;
  totalCorrect: number;
  totalQuestions: number;
  accuracyPercent: number;
  totalXp: number;
  streak: number;
  selectedQuestionIds: Record<GameId, string[]>;
  answers: AnswerLog[];
  completedGames: GameId[];
  badge: string;
  completed: boolean;
  status: 'in_progress' | 'completed';
  lastUpdated: number;
}

export interface SyncEvent {
  eventId: string;
  action: 'saveGame' | 'finalizeSession';
  sessionId: string;
  session: StudentSession;
  answers?: AnswerLog[];
  timestamp: number;
  retryCount: number;
}

export interface Badge {
  id: string;
  title: string;
  desc: string;
  icon: string;
  minPercent: number;
}

export interface GameInfo {
  id: GameId;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  highlights: string[];
  gradient: string;
  accentColor: string;
}

export type UserRole = 'student' | 'teacher' | 'admin';

export interface TeacherUser {
  username: string;
  role: 'teacher' | 'admin';
  name?: string;
}

export interface ClassStatistic {
  className: string;
  totalStudents: number;
  completedCount: number;
  averageAccuracy: number;
  averageXp: number;
}

export interface GameAccuracyStatistic {
  gameId: GameId;
  gameTitle: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracyPercent: number;
}

export interface MisconceptionStatistic {
  concept: string;
  conceptNameVi: string;
  totalErrors: number;
  sampleQuestionId: string;
  sampleQuestionText: string;
  explanation: string;
}

export interface TeacherDashboardStats {
  totalPlays: number;
  completedStudents: number;
  averageAccuracy: number;
  totalXpDistributed: number;
  classStats: ClassStatistic[];
  gameStats: GameAccuracyStatistic[];
  topMisconceptions: MisconceptionStatistic[];
  hardestQuestions: {
    questionId: string;
    questionText: string;
    gameTitle: string;
    errorRatePercent: number;
    totalAttempts: number;
  }[];
}

