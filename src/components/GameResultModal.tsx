import React from 'react';
import { GameId } from '../types';
import { GAME_METADATA } from '../config/gameConfig';
import { Sparkles, Trophy, RotateCcw, Map, ArrowRight } from 'lucide-react';

interface GameResultModalProps {
  gameId: GameId;
  score: { correct: number; total: number; xp: number };
  onPlayAgain: () => void;
  onReturnHub: () => void;
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  gameId,
  score,
  onPlayAgain,
  onReturnHub,
}) => {
  const meta = GAME_METADATA[gameId];
  const percent = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const isPerfect = percent === 100;
  const isPassed = percent >= 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Icon / Trophy */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center text-4xl mx-auto shadow-xl">
            {isPerfect ? '👑' : isPassed ? '🏆' : '💪'}
          </div>
          {isPerfect && (
            <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider animate-bounce">
              HOÀN HẢO
            </span>
          )}
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {isPerfect ? 'Xuất sắc tuyệt đối!' : isPassed ? 'Thử thách hoàn thành!' : 'Cố gắng lên nhé!'}
          </h3>
          <p className="text-xs text-slate-400">
            {meta.title} – Lượt chơi 5 câu
          </p>
        </div>

        {/* Score metrics */}
        <div className="grid grid-cols-3 gap-2 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
          <div>
            <span className="block text-2xl font-black text-emerald-400">
              {score.correct}/{score.total}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Số câu đúng</span>
          </div>
          <div className="border-x border-slate-800">
            <span className="block text-2xl font-black text-amber-400">
              {percent}%
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Chính xác</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-cyan-400">
              +{score.xp}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">XP nhận được</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={onReturnHub}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Map className="w-4 h-4" />
            VỀ BẢN ĐỒ TIẾP TỤC HÀNH TRÌNH
          </button>

          <button
            onClick={onPlayAgain}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Chơi lại 5 câu mới
          </button>
        </div>
      </div>
    </div>
  );
};
