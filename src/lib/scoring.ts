import type { Question, QuestionOption, StudentSession, GameId, AnswerLog } from '../types.js';
import { ALL_QUESTIONS } from '../data/index.js';
import { GAME_CONFIG, BADGES } from '../config/gameConfig.js';

// Secure UUID generator with fallback
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Select balanced question IDs for a game (Freeze per session)
export function selectAndFreezeQuestionIdsForGame(gameId: GameId, count: number = GAME_CONFIG.questionsPerGame): string[] {
  if (gameId === 'boss') {
    // Pick 1 question from each of the 5 mini-games
    const games: ('predict' | 'variable' | 'bug' | 'ifmaze' | 'builder')[] = [
      'predict',
      'variable',
      'bug',
      'ifmaze',
      'builder',
    ];
    const pickedIds: string[] = [];
    games.forEach((g) => {
      const candidates = ALL_QUESTIONS.filter((q) => q.game === g);
      const picked = shuffleArray(candidates)[0];
      if (picked) {
        pickedIds.push(picked.id);
      }
    });
    return pickedIds;
  }

  const pool = ALL_QUESTIONS.filter((q) => q.game === gameId);
  if (pool.length <= count) {
    return pool.map((q) => q.id);
  }

  // Balanced distribution: 2 easy (diff <= 2), 2 medium (diff === 3), 1 challenge (diff === 4)
  const diff12 = shuffleArray(pool.filter((q) => q.difficulty <= 2));
  const diff3 = shuffleArray(pool.filter((q) => q.difficulty === 3));
  const diff4 = shuffleArray(pool.filter((q) => q.difficulty === 4));

  const selectedIds: string[] = [];
  if (diff12[0]) selectedIds.push(diff12[0].id);
  if (diff12[1]) selectedIds.push(diff12[1].id);
  if (diff3[0]) selectedIds.push(diff3[0].id);
  if (diff3[1]) selectedIds.push(diff3[1].id);
  if (diff4[0]) selectedIds.push(diff4[0].id);

  // Fallback if not enough questions in specific difficulty buckets
  if (selectedIds.length < count) {
    const remaining = pool.filter((q) => !selectedIds.includes(q.id));
    const extra = shuffleArray(remaining).slice(0, count - selectedIds.length);
    selectedIds.push(...extra.map((q) => q.id));
  }

  return shuffleArray(selectedIds);
}

// Retrieve prepared questions from frozen question IDs
export function getQuestionsByIds(ids: string[]): Question[] {
  const result: Question[] = [];
  ids.forEach((id) => {
    const found = ALL_QUESTIONS.find((q) => q.id === id);
    if (found) {
      result.push(prepareQuestionForPlay(found));
    }
  });
  return result;
}

// Select questions for game, honoring session frozen IDs if present
export function selectGameQuestions(
  gameId: GameId,
  count: number = GAME_CONFIG.questionsPerGame,
  frozenIds?: string[]
): Question[] {
  if (frozenIds && frozenIds.length > 0) {
    const questions = getQuestionsByIds(frozenIds);
    if (questions.length === frozenIds.length) {
      return questions;
    }
  }

  // If no frozen IDs or missing questions, pick new balanced ones
  const newIds = selectAndFreezeQuestionIdsForGame(gameId, count);
  return getQuestionsByIds(newIds);
}

// Prepare question: safely scramble options or lines without breaking option ID mapping
export function prepareQuestionForPlay(q: Question): Question {
  if (q.type === 'reorder') {
    // Scramble code lines so they are not already in correct order
    let scrambled = shuffleArray(q.options);
    // Make sure it doesn't accidentally start already sorted
    const isAlreadySorted = scrambled.every((opt, idx) => opt.id === q.correctAnswers[idx]);
    if (isAlreadySorted && scrambled.length > 1) {
      scrambled = [scrambled[1], scrambled[0], ...scrambled.slice(2)];
    }
    return {
      ...q,
      options: scrambled,
    };
  }

  if (GAME_CONFIG.randomizeOptions) {
    // Keep option ID attached to its text, just shuffle the order of options
    const shuffled = shuffleArray(q.options);
    return {
      ...q,
      options: shuffled,
    };
  }

  return { ...q };
}

// Check answer correctness strictly using Option IDs
export function checkAnswerCorrectness(question: Question, userSelection: string[]): boolean {
  if (question.type === 'reorder') {
    const userSeq = userSelection; // e.g. ["b1", "b2", "b3"]
    if (question.validSequences && question.validSequences.length > 0) {
      return question.validSequences.some((seq) =>
        seq.length === userSeq.length && seq.every((val, idx) => val === userSeq[idx])
      );
    }
    return (
      question.correctAnswers.length === userSeq.length &&
      question.correctAnswers.every((val, idx) => val === userSeq[idx])
    );
  }

  if (question.type === 'multiple') {
    if (userSelection.length !== question.correctAnswers.length) return false;
    const userSet = new Set(userSelection);
    return question.correctAnswers.every((ans) => userSet.has(ans));
  }

  // Single choice
  return userSelection.length === 1 && userSelection[0] === question.correctAnswers[0];
}

// Calculate badge from accuracy percent
export function getBadge(accuracyPercent: number): { title: string; desc: string } {
  for (const b of BADGES) {
    if (accuracyPercent >= b.minPercent) {
      return { title: b.title, desc: b.desc };
    }
  }
  return { title: BADGES[BADGES.length - 1].title, desc: BADGES[BADGES.length - 1].desc };
}

// Create clean, fresh initial session with independent UUID and frozen question sets
export function createInitialSession(name: string, studentClass: string): StudentSession {
  const sessionId = generateUUID();
  const selectedQuestionIds: Record<GameId, string[]> = {
    predict: selectAndFreezeQuestionIdsForGame('predict', 5),
    variable: selectAndFreezeQuestionIdsForGame('variable', 5),
    bug: selectAndFreezeQuestionIdsForGame('bug', 5),
    ifmaze: selectAndFreezeQuestionIdsForGame('ifmaze', 5),
    builder: selectAndFreezeQuestionIdsForGame('builder', 5),
    boss: selectAndFreezeQuestionIdsForGame('boss', 5),
  };

  return {
    sessionId,
    studentName: name.trim(),
    studentClass: studentClass.trim(),
    startTime: Date.now(),
    currentGame: null,
    currentQuestionIndex: 0,
    scores: {
      predict: { correct: 0, total: 0, xp: 0 },
      variable: { correct: 0, total: 0, xp: 0 },
      bug: { correct: 0, total: 0, xp: 0 },
      ifmaze: { correct: 0, total: 0, xp: 0 },
      builder: { correct: 0, total: 0, xp: 0 },
      boss: { correct: 0, total: 0, xp: 0 },
    },
    totalCorrect: 0,
    totalQuestions: 0,
    accuracyPercent: 0,
    totalXp: 0,
    streak: 0,
    selectedQuestionIds,
    answers: [],
    completedGames: [],
    badge: '🌱 Chiến Binh Python Mới',
    completed: false,
    status: 'in_progress',
    lastUpdated: Date.now(),
  };
}
