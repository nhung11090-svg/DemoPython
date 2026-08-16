import React from 'react';
import { StudentSession, GameId } from '../types';
import { GAME_METADATA } from '../config/gameConfig';
import { Play, Award, CheckCircle, Flame, Star, Sparkles, ChevronRight } from 'lucide-react';

interface GameHubProps {
  session: StudentSession;
  onSelectGame: (gameId: GameId) => void;
  onViewCertificate: () => void;
}

export const GameHub: React.FC<GameHubProps> = ({
  session,
  onSelectGame,
  onViewCertificate,
}) => {
  const games = Object.values(GAME_METADATA);
  const regularGames = games.filter((g) => g.id !== 'boss');
  const bossGame = games.find((g) => g.id === 'boss');

  // Check how many regular games have been played
  const playedGamesCount = regularGames.filter(
    (g) => session.scores[g.id]?.total > 0
  ).length;

  const isBossUnlocked = playedGamesCount >= 3; // Unlocked after playing at least 3 mini-games

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner / Student Greeting */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              BẢN ĐỒ THỬ THÁCH PYTHON
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Chào mừng, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{session.studentName}</span>!
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Em đang ở lớp <strong className="text-emerald-400">{session.studentClass}</strong>. Hãy vượt qua từng vùng đất bên dưới để rèn luyện tư duy và săn điểm XP nhé!
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl shrink-0">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="block text-xl font-black text-emerald-400">{session.totalCorrect}</span>
              <span className="text-[11px] text-slate-400 font-medium">Câu đúng</span>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <span className="block text-xl font-black text-amber-400">{session.accuracyPercent}%</span>
              <span className="text-[11px] text-slate-400 font-medium">Độ chính xác</span>
            </div>
            <div className="text-center px-3">
              <span className="block text-xl font-black text-cyan-400">{session.totalXp}</span>
              <span className="text-[11px] text-slate-400 font-medium">Tổng XP</span>
            </div>
          </div>
        </div>

        {/* Certificate / Summary Bar */}
        {session.totalQuestions >= 5 && (
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Danh hiệu hiện tại: <strong className="text-amber-300">{session.badge}</strong></span>
            </div>
            <button
              onClick={onViewCertificate}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              Xem Bảng Vàng & Giấy Chứng Nhận
            </button>
          </div>
        )}
      </div>

      {/* 5 Main Mini-Games Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <span>⚔️</span> 5 VÙNG ĐẤT THỬ THÁCH (Mỗi lượt 5 câu)
          </h2>
          <span className="text-xs text-slate-400">
            Đã khám phá: <strong className="text-emerald-400">{playedGamesCount}/5</strong> trò chơi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regularGames.map((game) => {
            const score = session.scores[game.id] || { correct: 0, total: 0, xp: 0 };
            const isPlayed = score.total > 0;
            const accuracy = isPlayed ? Math.round((score.correct / score.total) * 100) : 0;

            return (
              <div
                key={game.id}
                className="bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-0.5 group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {game.icon}
                    </div>
                    {isPlayed ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Đã chơi ({score.correct}/{score.total})
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                        Mới
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>

                  {/* Progress Indicator */}
                  {isPlayed && (
                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Độ chính xác</span>
                        <span className="font-bold text-emerald-400">{accuracy}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Play Button */}
                <button
                  onClick={() => onSelectGame(game.id)}
                  className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 hover:border-emerald-400 transition-all cursor-pointer shadow-sm group-hover:shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isPlayed ? 'Chơi lại lấy điểm cao' : 'Bắt đầu thử thách'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final Boss Card */}
      {bossGame && (
        <div className="relative rounded-3xl overflow-hidden border border-rose-500/40 bg-gradient-to-br from-slate-950 via-red-950/20 to-purple-950/40 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-lg shadow-red-500/20 animate-pulse">
                👾
              </div>
              <div className="space-y-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-extrabold border border-rose-500/40">
                  <Flame className="w-3 h-3 text-rose-400 fill-rose-400" />
                  TRẬN CHIẾN TRÙM CUỐI
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Quái Vật Bug Lập Trình
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
                  Boss có 5 lượng máu. Trả lời đúng mỗi câu hỏi tổng hợp để tung đòn sấm sét đánh bại quái vật!
                </p>
                <div className="text-xs text-amber-400 font-bold flex items-center justify-center md:justify-start gap-1 pt-1">
                  <span>Máu Quái Vật:</span>
                  <span>❤️❤️❤️❤️❤️</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
              <button
                onClick={() => onSelectGame('boss')}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-rose-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-white" />
                KHIÊU CHIẾN TRÙM CUỐI
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-slate-400">
                Thử thách kiến thức toàn diện 5 chủ đề
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
