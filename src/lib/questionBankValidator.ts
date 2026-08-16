import { ALL_QUESTIONS } from '../data';
import { Question } from '../types';

export interface ValidationReport {
  totalQuestions: number;
  byGame: Record<string, number>;
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateQuestionBank(questions: Question[] = ALL_QUESTIONS): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const idSet = new Set<string>();
  const byGame: Record<string, number> = {
    predict: 0,
    variable: 0,
    bug: 0,
    ifmaze: 0,
    builder: 0,
  };

  questions.forEach((q, index) => {
    // 1. Check ID uniqueness
    if (!q.id) {
      errors.push(`Câu hỏi số ${index + 1} không có ID.`);
    } else if (idSet.has(q.id)) {
      errors.push(`Trùng lặp ID câu hỏi: ${q.id}`);
    } else {
      idSet.add(q.id);
    }

    // 2. Count by game
    if (byGame[q.game] !== undefined) {
      byGame[q.game]++;
    } else {
      errors.push(`Game không hợp lệ trong câu hỏi ${q.id}: ${q.game}`);
    }

    // 3. Check correctAnswers
    if (!q.correctAnswers || q.correctAnswers.length === 0) {
      errors.push(`Câu hỏi ${q.id} không có đáp án đúng (correctAnswers rỗng).`);
    }

    // 4. Check options existence
    if (q.type !== 'reorder') {
      const optionIds = new Set(q.options.map((o) => o.id));
      q.correctAnswers.forEach((ans) => {
        if (!optionIds.has(ans)) {
          errors.push(`Đáp án đúng ${ans} của câu ${q.id} không nằm trong danh sách options!`);
        }
      });
      if (q.type === 'single' && q.correctAnswers.length > 1) {
        errors.push(`Câu hỏi ${q.id} kiểu single nhưng có nhiều hơn 1 đáp án đúng.`);
      }
    } else {
      // Reorder check
      if (q.options.length < 2) {
        errors.push(`Câu hỏi builder ${q.id} có ít hơn 2 dòng mã để sắp xếp.`);
      }
    }

    // 5. Check explanation & takeaway
    if (!q.explanation || q.explanation.trim() === '') {
      errors.push(`Câu hỏi ${q.id} thiếu phần giải thích (explanation).`);
    }
    if (!q.takeaway || q.takeaway.trim() === '') {
      warnings.push(`Câu hỏi ${q.id} thiếu phần ghi nhớ (takeaway).`);
    }
  });

  // Check counts
  const games = ['predict', 'variable', 'bug', 'ifmaze', 'builder'];
  games.forEach((g) => {
    if (byGame[g] !== 40) {
      errors.push(`Game ${g} hiện có ${byGame[g]}/40 câu.`);
    }
  });

  return {
    totalQuestions: questions.length,
    byGame,
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
