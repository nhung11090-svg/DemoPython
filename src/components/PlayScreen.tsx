import React, { useState, useEffect } from 'react';
import { Question, QuestionOption, GameId, AnswerLog } from '../types';
import { GAME_METADATA } from '../config/gameConfig';
import { CodeBlock } from './CodeBlock';
import { checkAnswerCorrectness, generateUUID } from '../lib/scoring';
import {
  Sparkles,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  ArrowLeft,
} from 'lucide-react';

interface PlayScreenProps {
  gameId: GameId;
  questions: Question[];
  initialQuestionIndex?: number;
  studentName: string;
  studentClass: string;
  sessionId: string;
  onAnswerQuestion?: (questionIndex: number, log: AnswerLog) => void;
  onFinishGame: (gameScore: { correct: number; total: number; xp: number; logs: AnswerLog[] }) => void;
  onExitGame: () => void;
  onUpdateStreak: (isCorrect: boolean) => void;
}

export const PlayScreen: React.FC<PlayScreenProps> = ({
  gameId,
  questions,
  initialQuestionIndex = 0,
  studentName,
  studentClass,
  sessionId,
  onAnswerQuestion,
  onFinishGame,
  onExitGame,
  onUpdateStreak,
}) => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.min(initialQuestionIndex, Math.max(0, questions.length - 1))
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [reorderedLines, setReorderedLines] = useState<QuestionOption[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [gameScore, setGameScore] = useState({ correct: 0, total: 0, xp: 0 });
  const [logs, setLogs] = useState<AnswerLog[]>([]);

  const currentQuestion = questions[currentIndex];
  const meta = GAME_METADATA[gameId];

  // Initialize question state on index or question changes
  useEffect(() => {
    if (!currentQuestion) return;
    setIsAnswerSubmitted(false);
    setIsSubmitting(false);
    setSelectedOptions([]);
    setStartTime(Date.now());

    if (currentQuestion.type === 'reorder') {
      setReorderedLines([...currentQuestion.options]);
    }
  }, [currentIndex, currentQuestion]);

  if (!currentQuestion) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-slate-400">Không tìm thấy câu hỏi.</p>
        <button
          onClick={onExitGame}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold"
        >
          Quay lại bản đồ
        </button>
      </div>
    );
  }

  // Handle single choice or multiple choice selection
  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted || isSubmitting) return;
    if (currentQuestion.type === 'single') {
      setSelectedOptions([optId]);
    } else if (currentQuestion.type === 'multiple') {
      if (selectedOptions.includes(optId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optId));
      } else {
        setSelectedOptions([...selectedOptions, optId]);
      }
    }
  };

  // Reorder controls (Move up / Move down)
  const handleMoveLine = (index: number, direction: 'up' | 'down') => {
    if (isAnswerSubmitted || isSubmitting) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= reorderedLines.length) return;

    const newArr = [...reorderedLines];
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    setReorderedLines(newArr);
  };

  // Check and submit answer with anti double-click protection
  const handleSubmitAnswer = () => {
    if (isAnswerSubmitted || isSubmitting) return;

    let userFinalAnswers: string[] = [];
    if (currentQuestion.type === 'reorder') {
      userFinalAnswers = reorderedLines.map((l) => l.id);
    } else {
      if (selectedOptions.length === 0) return;
      userFinalAnswers = selectedOptions;
    }

    setIsSubmitting(true);

    const timeSpent = Math.max(500, Date.now() - startTime);
    const correct = checkAnswerCorrectness(currentQuestion, userFinalAnswers);
    const xpEarned = correct ? 100 * currentQuestion.difficulty : 0;

    setIsCorrect(correct);
    setIsAnswerSubmitted(true);
    setIsSubmitting(false);

    onUpdateStreak(correct);

    const answerLog: AnswerLog = {
      eventId: generateUUID(),
      sessionId,
      studentName,
      studentClass,
      game: currentQuestion.game,
      questionId: currentQuestion.id,
      difficulty: currentQuestion.difficulty,
      concept: currentQuestion.concept,
      isCorrect: correct,
      selectedOptionIds: userFinalAnswers,
      correctAnswers: currentQuestion.correctAnswers,
      xpEarned,
      timeSpentMs: timeSpent,
      timestamp: Date.now(),
    };

    setLogs((prev) => [...prev, answerLog]);

    setGameScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
      xp: prev.xp + xpEarned,
    }));

    if (onAnswerQuestion) {
      onAnswerQuestion(currentIndex, answerLog);
    }
  };

  // Move to next question or complete game
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinishGame({
        correct: gameScore.correct,
        total: gameScore.total,
        xp: gameScore.xp,
        logs,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Navigation & Status Bar */}
      <div className="flex items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 px-4 py-3 rounded-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={onExitGame}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold">Quay lại bản đồ</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xl">{meta.icon}</span>
          <div>
            <h2 className="text-sm font-bold text-white">{meta.title}</h2>
            <div className="text-[11px] text-slate-400">
              Câu hỏi <strong className="text-emerald-400">{currentIndex + 1}</strong> / {questions.length}
            </div>
          </div>
        </div>

        {/* Difficulty Stars */}
        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold" title={`Độ khó: Mức ${currentQuestion.difficulty}/4`}>
          {Array.from({ length: currentQuestion.difficulty }).map((_, i) => (
            <span key={i}>★</span>
          ))}
          {Array.from({ length: 4 - currentQuestion.difficulty }).map((_, i) => (
            <span key={i} className="text-slate-700">★</span>
          ))}
        </div>
      </div>

      {/* Concept Badge & Question Prompt */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          {currentQuestion.conceptNameVi}
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
          {currentQuestion.question}
        </h3>
      </div>

      {/* Code Block (if present) */}
      {currentQuestion.code && (
        <CodeBlock code={currentQuestion.code} />
      )}

      {/* Interactive Options Area */}
      {currentQuestion.type === 'reorder' ? (
        /* REORDER GAME TYPE */
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
            <span>Sắp xếp các dòng lệnh theo thứ tự chạy đúng:</span>
            <span>Dùng nút ⬆️ ⬇️ để đổi vị trí</span>
          </div>

          <div className="space-y-2">
            {reorderedLines.map((line, idx) => (
              <div
                key={line.id}
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all font-mono text-sm shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-emerald-300 font-semibold whitespace-pre">
                    {line.text}
                  </span>
                </div>

                {!isAnswerSubmitted && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0 || isSubmitting}
                      onClick={() => handleMoveLine(idx, 'up')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 transition-all"
                      title="Di chuyển lên"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === reorderedLines.length - 1 || isSubmitting}
                      onClick={() => handleMoveLine(idx, 'down')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 transition-all"
                      title="Di chuyển xuống"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SINGLE / MULTIPLE CHOICE */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            const isCorrectOption = currentQuestion.correctAnswers.includes(option.id);

            let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-900/90 text-slate-200';
            if (isSelected) {
              borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-md shadow-emerald-500/10';
            }

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                borderClass = 'border-emerald-500 bg-emerald-950/80 text-emerald-200 ring-2 ring-emerald-500/40';
              } else if (isSelected && !isCorrectOption) {
                borderClass = 'border-rose-500 bg-rose-950/60 text-rose-200 ring-2 ring-rose-500/40';
              } else {
                borderClass = 'opacity-40 border-slate-800 bg-slate-950 text-slate-500';
              }
            }

            return (
              <button
                type="button"
                key={option.id}
                disabled={isAnswerSubmitted || isSubmitting}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-150 flex items-start gap-3.5 cursor-pointer ${borderClass}`}
              >
                <span
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {option.id}
                </span>
                <span className="font-mono text-sm leading-relaxed pt-0.5">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Action / Submit / Next Button */}
      <div className="pt-2">
        {!isAnswerSubmitted ? (
          <button
            type="button"
            onClick={handleSubmitAnswer}
            disabled={
              isSubmitting ||
              (currentQuestion.type !== 'reorder' && selectedOptions.length === 0)
            }
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 disabled:hover:from-emerald-500 disabled:hover:to-teal-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            {isSubmitting ? 'ĐANG KIỂM TRA...' : 'KIỂM TRA ĐÁP ÁN'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            autoFocus
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-[0.99] transition-all cursor-pointer animate-pulse"
          >
            <span>{currentIndex + 1 < questions.length ? 'CÂU TIẾP THEO' : 'HOÀN THÀNH VÁN CHƠI'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Comprehensive Feedback Card (When Submitted) */}
      {isAnswerSubmitted && (
        <div
          className={`rounded-2xl border p-5 sm:p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            isCorrect
              ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-200'
              : 'bg-rose-950/25 border-rose-500/40 text-slate-200'
          }`}
        >
          {/* Header result banner */}
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <XCircle className="w-6 h-6" />
              </div>
            )}
            <div>
              <h4 className={`text-base font-extrabold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCorrect ? '🎉 CHÍNH XÁC! XUẤT SẮC LẮM!' : '❌ CHƯA CHÍNH XÁC, ĐỪNG NẢN LÒNG!'}
              </h4>
              <p className="text-xs text-slate-300">
                {isCorrect
                  ? `Em được cộng +${100 * currentQuestion.difficulty} XP vào tổng điểm!`
                  : 'Hãy đọc kỹ phần phân tích bên dưới để hiểu rõ bản chất nhé!'}
              </p>
            </div>
          </div>

          {/* Detailed Step-by-Step Explanation */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs sm:text-sm leading-relaxed">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🐍</span>
              <span>Python thực thi như thế nào?</span>
            </div>
            <p className="text-slate-300 whitespace-pre-line">
              {currentQuestion.explanation}
            </p>

            {/* If wrong option picked, show specific misconception */}
            {!isCorrect && selectedOptions.length > 0 && currentQuestion.wrongExplanations?.[selectedOptions[0]] && (
              <div className="mt-2 pt-2 border-t border-slate-800 text-rose-300 text-xs">
                <strong>Vì sao lựa chọn của em chưa đúng:</strong> {currentQuestion.wrongExplanations[selectedOptions[0]]}
              </div>
            )}
          </div>

          {/* Takeaway / Memory Key */}
          {currentQuestion.takeaway && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">💡 Ghi nhớ cho học sinh lớp 8:</strong>{' '}
                <span>{currentQuestion.takeaway}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
