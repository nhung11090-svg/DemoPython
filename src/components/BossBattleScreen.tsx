import React, { useState, useEffect } from 'react';
import { Question, AnswerLog } from '../types';
import { CodeBlock } from './CodeBlock';
import { checkAnswerCorrectness, generateUUID } from '../lib/scoring';
import {
  Flame,
  Zap,
  Heart,
  Skull,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface BossBattleScreenProps {
  questions: Question[];
  initialQuestionIndex?: number;
  studentName: string;
  studentClass: string;
  sessionId: string;
  onAnswerQuestion?: (questionIndex: number, log: AnswerLog) => void;
  onFinishBoss: (score: { correct: number; total: number; xp: number; logs: AnswerLog[] }) => void;
  onExitGame: () => void;
  onUpdateStreak: (isCorrect: boolean) => void;
}

export const BossBattleScreen: React.FC<BossBattleScreenProps> = ({
  questions,
  initialQuestionIndex = 0,
  studentName,
  studentClass,
  sessionId,
  onAnswerQuestion,
  onFinishBoss,
  onExitGame,
  onUpdateStreak,
}) => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.min(initialQuestionIndex, Math.max(0, questions.length - 1))
  );
  const [bossHp, setBossHp] = useState(5);
  const [playerHp, setPlayerHp] = useState(5);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isBossDamaged, setIsBossDamaged] = useState(false);
  const [isPlayerDamaged, setIsPlayerDamaged] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [gameScore, setGameScore] = useState({ correct: 0, total: 0, xp: 0 });
  const [logs, setLogs] = useState<AnswerLog[]>([]);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!currentQuestion) return;
    setIsAnswerSubmitted(false);
    setIsSubmitting(false);
    setSelectedOptions([]);
    setIsBossDamaged(false);
    setIsPlayerDamaged(false);
    setStartTime(Date.now());
  }, [currentIndex, currentQuestion]);

  if (!currentQuestion) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-slate-400">Không tìm thấy câu hỏi Trận đấu Trùm.</p>
        <button
          onClick={onExitGame}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold"
        >
          Quay lại bản đồ
        </button>
      </div>
    );
  }

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted || isSubmitting) return;
    setSelectedOptions([optId]);
  };

  const handleAttack = () => {
    if (isAnswerSubmitted || isSubmitting || selectedOptions.length === 0) return;

    setIsSubmitting(true);
    const timeSpent = Math.max(500, Date.now() - startTime);
    const correct = checkAnswerCorrectness(currentQuestion, selectedOptions);
    const xpEarned = correct ? 150 : 0;

    setIsCorrect(correct);
    setIsAnswerSubmitted(true);
    setIsSubmitting(false);
    onUpdateStreak(correct);

    if (correct) {
      setIsBossDamaged(true);
      setBossHp((prev) => Math.max(0, prev - 1));
    } else {
      setIsPlayerDamaged(true);
      setPlayerHp((prev) => Math.max(0, prev - 1));
    }

    setGameScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
      xp: prev.xp + xpEarned,
    }));

    const answerLog: AnswerLog = {
      eventId: generateUUID(),
      sessionId,
      studentName,
      studentClass,
      game: 'boss',
      questionId: currentQuestion.id,
      difficulty: currentQuestion.difficulty,
      concept: currentQuestion.concept,
      isCorrect: correct,
      selectedOptionIds: selectedOptions,
      correctAnswers: currentQuestion.correctAnswers,
      xpEarned,
      timeSpentMs: timeSpent,
      timestamp: Date.now(),
    };

    setLogs((prev) => [...prev, answerLog]);

    if (onAnswerQuestion) {
      onAnswerQuestion(currentIndex, answerLog);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length && bossHp > 0) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinishBoss({
        correct: gameScore.correct,
        total: gameScore.total,
        xp: gameScore.xp,
        logs,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-red-500/30 px-4 py-3 rounded-2xl">
        <button
          type="button"
          onClick={onExitGame}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Rút lui về Bản đồ</span>
        </button>

        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-400 fill-red-400 animate-pulse" />
          <h2 className="text-sm font-black text-red-300">ĐẤU TRÙM: QUÁI VẬT BUG</h2>
        </div>

        <div className="text-xs font-bold text-amber-400">
          Hiệp {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Battle Arena Stage */}
      <div className="relative rounded-3xl bg-gradient-to-b from-red-950/40 via-slate-950 to-slate-950 border border-red-500/40 p-6 overflow-hidden shadow-2xl">
        {/* Boss and Player HP Displays */}
        <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-800">
          {/* Player Side */}
          <div className="flex flex-col items-start space-y-1">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>🧙‍♂️</span> {studentName || 'Dũng sĩ Python'}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 ${i < playerHp ? 'text-emerald-400 fill-emerald-400' : 'text-slate-800'}`}
                />
              ))}
            </div>
          </div>

          {/* Boss Side */}
          <div className="flex flex-col items-end space-y-1">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
              Quái Vật Bug <span>👾</span>
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 ${i < bossHp ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-slate-800'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Visual Arena Clash */}
        <div className="py-6 flex items-center justify-around">
          <div className={`text-5xl sm:text-6xl transition-transform duration-300 ${isPlayerDamaged ? 'animate-bounce opacity-60' : ''}`}>
            🧙‍♂️
          </div>

          <div className="text-center">
            {isAnswerSubmitted ? (
              isCorrect ? (
                <div className="text-emerald-400 text-sm font-black animate-ping flex items-center gap-1">
                  <Zap className="w-5 h-5 fill-current" /> SẤM SÉT TRÚNG ĐÍCH! -1 HP
                </div>
              ) : (
                <div className="text-rose-400 text-sm font-black animate-bounce flex items-center gap-1">
                  <Skull className="w-5 h-5" /> BUG PHẢN ĐÒN!
                </div>
              )
            ) : (
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                ĐANG GIAO TRANH...
              </span>
            )}
          </div>

          <div className={`text-6xl sm:text-7xl transition-transform duration-300 ${isBossDamaged ? 'animate-ping opacity-60' : 'animate-pulse'}`}>
            👾
          </div>
        </div>

        {/* Boss Question Area */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="text-center space-y-1">
            <span className="inline-block px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
              Thử thách: {currentQuestion.conceptNameVi}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {currentQuestion.question}
            </h3>
          </div>

          {currentQuestion.code && (
            <CodeBlock code={currentQuestion.code} />
          )}

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOptions.includes(opt.id);
              const isCorrectOpt = currentQuestion.correctAnswers.includes(opt.id);

              let btnClass = 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200';
              if (isSelected) {
                btnClass = 'bg-rose-950/40 border-rose-500 text-rose-300';
              }
              if (isAnswerSubmitted) {
                if (isCorrectOpt) {
                  btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                } else if (isSelected && !isCorrectOpt) {
                  btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnClass = 'opacity-30 border-slate-900 bg-slate-950 text-slate-600';
                }
              }

              return (
                <button
                  type="button"
                  key={opt.id}
                  disabled={isAnswerSubmitted || isSubmitting}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer font-mono text-xs sm:text-sm ${btnClass}`}
                >
                  <span className="w-6 h-6 rounded-md bg-slate-950 border border-slate-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {opt.id}
                  </span>
                  <span className="pt-0.5">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Attack / Next Button */}
          <div className="pt-2">
            {!isAnswerSubmitted ? (
              <button
                type="button"
                disabled={selectedOptions.length === 0 || isSubmitting}
                onClick={handleAttack}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 hover:from-red-400 hover:to-amber-400 disabled:opacity-40 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 active:scale-[0.99] transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                {isSubmitting ? 'ĐANG TUNG CHIÊU...' : 'TUNG ĐÒN TẤN CÔNG QUÁI VẬT (+150 XP)'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                autoFocus
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all cursor-pointer animate-pulse"
              >
                <span>{currentIndex + 1 < questions.length ? 'HIỆP TIẾP THEO' : 'KẾT THÚC TRẬN ĐẤU'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Feedback Explanation */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-cyan-300">🐍 Phân tích chiêu thức Python:</div>
              <p className="text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
              {currentQuestion.takeaway && (
                <div className="text-amber-300 pt-1 border-t border-slate-800">
                  💡 <strong>Ghi nhớ:</strong> {currentQuestion.takeaway}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
