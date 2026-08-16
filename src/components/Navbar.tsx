import React, { useState } from 'react';
import { StudentSession, SyncStatus } from '../types';
import { Sparkles, Flame, RotateCcw, AlertTriangle, Cloud, CloudOff } from 'lucide-react';

interface NavbarProps {
  session: StudentSession | null;
  streak: number;
  syncStatus: SyncStatus;
  pendingSyncCount?: number;
  onExitSession: () => void;
  onReturnHub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  session,
  streak,
  syncStatus,
  pendingSyncCount = 0,
  onExitSession,
  onReturnHub,
}) => {
  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false);

  const handleConfirmSwitch = () => {
    setShowSwitchConfirm(false);
    onExitSession();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 shadow-lg px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Title */}
          <button
            onClick={onReturnHub}
            className="flex items-center gap-3 text-left group transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              🐍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base md:text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  HÀNH TRÌNH PYTHON
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  LỚP 8
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Giải mã – Suy luận – Săn lỗi – Chinh phục Python
              </p>
            </div>
          </button>

          {/* User Info & Stats (Strictly for Student) */}
          {session ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Sync Status Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-slate-800 bg-slate-900/90">
                {syncStatus === 'synced' && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Đã lưu điểm</span>
                  </span>
                )}
                {syncStatus === 'syncing' && (
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Cloud className="w-3.5 h-3.5 animate-bounce" />
                    <span>Đang đồng bộ...</span>
                  </span>
                )}
                {(syncStatus === 'pending' || syncStatus === 'offline') && (
                  <span className="flex items-center gap-1 text-amber-400" title="Dữ liệu đã lưu trên máy, sẽ tự động gửi khi có mạng">
                    <CloudOff className="w-3.5 h-3.5" />
                    <span>Lưu máy {pendingSyncCount > 0 ? `(${pendingSyncCount})` : ''}</span>
                  </span>
                )}
              </div>

              {/* Student Info */}
              <div className="hidden md:flex flex-col items-end pl-1 border-l border-slate-800">
                <span className="text-sm font-semibold text-slate-200">
                  {session.studentName}
                </span>
                <span className="text-xs text-slate-400">
                  Lớp: <span className="text-emerald-400 font-bold">{session.studentClass}</span>
                </span>
              </div>

              {/* Streak Counter */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
                  streak > 1
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/20 animate-pulse'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
                title="Chuỗi trả lời đúng liên tiếp"
              >
                <Flame className={`w-4 h-4 ${streak > 1 ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
                <span className="text-xs font-bold">{streak}</span>
              </div>

              {/* XP Counter */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-extrabold tracking-wide">{session.totalXp} XP</span>
              </div>

              {/* Switch User Button */}
              <button
                onClick={() => setShowSwitchConfirm(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 text-xs font-semibold transition-all cursor-pointer"
                title="Đổi người chơi cho máy tính này"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đổi người chơi</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 hidden sm:inline-block">
                ✨ Tin học 8 – Python
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Switch Student Confirmation Dialog */}
      {showSwitchConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white">
                Đổi người chơi trên thiết bị này?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kết quả bài làm của <strong>{session?.studentName}</strong> đã được lưu an toàn. Học sinh tiếp theo có thể nhập tên và lớp để bắt đầu bài làm mới.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSwitchConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmSwitch}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                Xác nhận đổi người
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
