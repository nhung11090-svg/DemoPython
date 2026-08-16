import React from 'react';
import { StudentSession } from '../types';
import { GAME_METADATA } from '../config/gameConfig';
import { Award, Trophy, Sparkles, CheckCircle2, ArrowLeft, Printer, RefreshCw } from 'lucide-react';

interface CertificateScreenProps {
  session: StudentSession;
  onReturnHub: () => void;
  onRestartAll: () => void;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({
  session,
  onReturnHub,
  onRestartAll,
}) => {
  const games = Object.values(GAME_METADATA);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header controls */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onReturnHub}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold">Quay lại bản đồ</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            In giấy khen
          </button>
        </div>
      </div>

      {/* Main Certificate Board */}
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-amber-500/40 p-6 sm:p-10 text-center shadow-2xl overflow-hidden print:border-slate-300 print:text-black">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Certificate Header */}
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            GIẤY CHỨNG NHẬN HOÀN THÀNH
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            HÀNH TRÌNH CHINH PHỤC PYTHON
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Chứng nhận em đã hoàn thành xuất sắc các thử thách tư duy thuật toán và lập trình Python dành cho học sinh Lớp 8.
          </p>
        </div>

        {/* Student Name Card */}
        <div className="my-6 py-4 px-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 max-w-lg mx-auto relative z-10">
          <span className="text-xs text-slate-400 font-medium">Học sinh vinh danh:</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {session.studentName}
          </h2>
          <p className="text-xs text-emerald-400 font-bold mt-0.5">
            Chiến binh Lớp: {session.studentClass}
          </p>
        </div>

        {/* Badge Achieved */}
        <div className="my-6 inline-flex flex-col items-center gap-2 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
          <div className="text-4xl">🏆</div>
          <div>
            <span className="text-xs text-slate-400">Danh hiệu đạt được:</span>
            <div className="text-xl font-black text-amber-300">{session.badge}</div>
          </div>
        </div>

        {/* Detailed Breakdown of 5 Games + Boss */}
        <div className="mt-8 text-left space-y-3 relative z-10">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider text-center">
            📊 KẾT QUẢ TỪNG THỬ THÁCH
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {games.map((g) => {
              const sc = session.scores[g.id] || { correct: 0, total: 0, xp: 0 };
              const acc = sc.total > 0 ? Math.round((sc.correct / sc.total) * 100) : 0;

              return (
                <div
                  key={g.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{g.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{g.title}</h4>
                      <span className="text-[11px] text-slate-400">
                        {sc.correct}/{sc.total} câu đúng
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono">
                    {acc}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Overall Stats */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div>
            <span className="block text-2xl font-black text-emerald-400">{session.totalCorrect}</span>
            <span className="text-xs text-slate-400">Tổng câu đúng</span>
          </div>
          <div className="border-x border-slate-800">
            <span className="block text-2xl font-black text-amber-400">{session.accuracyPercent}%</span>
            <span className="text-xs text-slate-400">Độ chính xác</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-cyan-400">{session.totalXp}</span>
            <span className="text-xs text-slate-400">Tổng XP</span>
          </div>
        </div>
      </div>

      {/* Bottom return controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 no-print">
        <button
          onClick={onReturnHub}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Tiếp tục chơi các thử thách khác
        </button>

        <button
          onClick={onRestartAll}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Làm mới phiên học tập
        </button>
      </div>
    </div>
  );
};
