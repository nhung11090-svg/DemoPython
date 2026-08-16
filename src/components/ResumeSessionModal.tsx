import React, { useState } from 'react';
import { StudentSession } from '../types';
import { GAME_METADATA } from '../config/gameConfig';
import { Play, RotateCcw, Sparkles, Flame, Award, AlertTriangle, X } from 'lucide-react';

interface ResumeSessionModalProps {
  session: StudentSession;
  onResume: () => void;
  onStartNew: () => void;
}

export const ResumeSessionModal: React.FC<ResumeSessionModalProps> = ({
  session,
  onResume,
  onStartNew,
}) => {
  const [showConfirmNew, setShowConfirmNew] = useState(false);

  // Calculate completed games count
  const scoreList = Object.values(session.scores || {}) as { correct: number; total: number; xp: number }[];
  const completedGamesCount = scoreList.filter((s) => s && s.total > 0).length;
  const currentGameMeta = session.currentGame ? GAME_METADATA[session.currentGame] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Mascot / Icon */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-3xl bg-slate-950 border border-emerald-500/30 flex items-center justify-center text-4xl mx-auto shadow-xl">
            🐍
          </div>
          <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider animate-pulse">
            ĐÃ LƯU TIẾN ĐỘ
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Em đang có một hành trình chưa hoàn thành
          </h2>
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-sm">
            <span className="font-bold text-emerald-400">{session.studentName}</span>
            <span className="text-slate-500 mx-2">•</span>
            <span className="font-semibold text-slate-300">Lớp {session.studentClass}</span>
          </div>
        </div>

        {/* Progress summary card */}
        <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-4 text-left space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2.5">
            <span>Tiến độ tổng quan:</span>
            <span className="font-bold text-emerald-400">
              Đã tham gia {completedGamesCount}/5 thử thách
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <span className="block text-lg font-black text-emerald-400">
                {session.totalCorrect}/{session.totalQuestions}
              </span>
              <span className="text-[10px] text-slate-400">Câu đúng</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <span className="block text-lg font-black text-amber-400">
                {session.accuracyPercent}%
              </span>
              <span className="text-[10px] text-slate-400">Chính xác</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <span className="block text-lg font-black text-cyan-400">
                {session.totalXp}
              </span>
              <span className="text-[10px] text-slate-400">Tổng XP</span>
            </div>
          </div>

          {currentGameMeta && (
            <div className="text-xs text-slate-300 pt-1 flex items-center gap-2">
              <span>{currentGameMeta.icon}</span>
              <span>Đang ở: <strong>{currentGameMeta.title}</strong> (Câu {session.currentQuestionIndex + 1}/5)</span>
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={onResume}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            TIẾP TỤC HÀNH TRÌNH
          </button>

          <button
            type="button"
            onClick={() => setShowConfirmNew(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Bắt đầu lượt mới
          </button>
        </div>

        {/* Confirmation modal for starting new session */}
        {showConfirmNew && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center space-y-4 animate-in fade-in duration-150 z-20">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                Em muốn bắt đầu một hành trình mới?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Tiến độ hiện tại trên thiết bị này sẽ được làm mới. Kết quả đã gửi cho giáo viên vẫn được lưu an toàn.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full max-w-xs pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmNew(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-all cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={onStartNew}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
              >
                Bắt đầu lượt mới
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
