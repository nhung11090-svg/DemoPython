import React, { useState, useEffect } from 'react';
import { TeacherDashboardStats } from '../../types';
import {
  Users,
  CheckCircle2,
  Trophy,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Flame,
  RefreshCw,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface TeacherDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigateTab }) => {
  const [stats, setStats] = useState<TeacherDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/teacher/statistics');
      if (!res.ok) {
        throw new Error('Chưa đăng nhập hoặc phiên làm việc đã hết hạn');
      }
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err: any) {
      setError(err?.message || 'Không thể tải thống kê');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            TỔNG QUAN TÌNH HÌNH HỌC TẬP PYTHON
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Dữ liệu tổng hợp từ các lượt chơi và bài tập của học sinh trong thời gian thực
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Làm mới số liệu</span>
        </button>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Plays */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng lượt chơi</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {stats ? stats.totalPlays : '...'}
          </div>
          <p className="text-[11px] text-slate-400">Số phiên học sinh ghi danh</p>
        </div>

        {/* Metric 2: Completed Sessions */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hoàn thành cả 5 game</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">
            {stats ? stats.completedStudents : '...'}
          </div>
          <p className="text-[11px] text-slate-400">Đã nhận chứng chỉ danh hiệu</p>
        </div>

        {/* Metric 3: Average Accuracy */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Độ chính xác TB</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-400">
            {stats ? `${stats.averageAccuracy}%` : '...'}
          </div>
          <p className="text-[11px] text-slate-400">Tỷ lệ trả lời đúng toàn trường</p>
        </div>

        {/* Metric 4: Total XP Distributed */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng điểm XP đã tích lũy</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-purple-400">
            {stats ? `${stats.totalXpDistributed.toLocaleString()} XP` : '...'}
          </div>
          <p className="text-[11px] text-slate-400">Khích lệ động lực học tập</p>
        </div>
      </div>

      {/* Grid: Class Breakdown & Game Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Class Statistics */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              KẾT QUẢ THEO TỪNG LỚP HỌC
            </h3>
            <button
              onClick={() => onNavigateTab('results')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Xem chi tiết học sinh →
            </button>
          </div>

          {stats && stats.classStats && stats.classStats.length > 0 ? (
            <div className="space-y-3">
              {stats.classStats.map((c) => (
                <div
                  key={c.className}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-extrabold text-white px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                      Lớp {c.className}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {c.totalStudents} học sinh tham gia • {c.completedCount} hoàn thành
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-emerald-400">
                      {c.averageAccuracy}% chính xác
                    </div>
                    <div className="text-[11px] text-purple-300 font-medium">
                      TB {c.averageXp} XP
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs">
              Chưa có dữ liệu bài làm của lớp học nào. Dữ liệu sẽ tự động xuất hiện khi học sinh bắt đầu làm bài.
            </div>
          )}
        </div>

        {/* Right: Game Accuracy Performance */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              ĐỘ CHÍNH XÁC THEO 5 TRÒ CHƠI
            </h3>
            <button
              onClick={() => onNavigateTab('questions')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              Duyệt 200 câu hỏi →
            </button>
          </div>

          <div className="space-y-3">
            {[
              { id: 'predict', title: '1. Đoán kết quả (Output)', icon: '🔮', color: 'bg-cyan-500' },
              { id: 'variable', title: '2. Theo dấu biến (Trace)', icon: '📦', color: 'bg-purple-500' },
              { id: 'bug', title: '3. Thợ săn lỗi (Debug)', icon: '🔍', color: 'bg-rose-500' },
              { id: 'ifmaze', title: '4. Cánh cửa điều kiện (If-Else)', icon: '⚡', color: 'bg-amber-500' },
              { id: 'builder', title: '5. Xây dựng chương trình (Logic)', icon: '🧩', color: 'bg-emerald-500' },
            ].map((game) => {
              const gameStat = stats?.gameStats.find((g) => g.gameId === game.id);
              const percent = gameStat ? gameStat.accuracyPercent : 0;
              const attempts = gameStat ? gameStat.totalAttempts : 0;

              return (
                <div key={game.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <span>{game.icon}</span>
                      <span>{game.title}</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {percent}% ({attempts} lượt trả lời)
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${game.color} transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Misconception Analysis Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-black text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              TOP CÁC KHÁI NIỆM HỌC SINH THƯỜNG MẮC LỖI (MISCONCEPTIONS)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Phân tích tự động để giáo viên củng cố trọng tâm trên lớp học
            </p>
          </div>
        </div>

        {stats && stats.topMisconceptions && stats.topMisconceptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.topMisconceptions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30">
                    {item.conceptNameVi}
                  </span>
                  <span className="font-bold text-rose-400">
                    {item.totalErrors} lượt chọn sai
                  </span>
                </div>

                {item.sampleQuestionText && (
                  <p className="text-slate-300 italic line-clamp-2">
                    &quot;{item.sampleQuestionText}&quot;
                  </p>
                )}

                {item.explanation && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-[11px] leading-relaxed">
                    💡 <strong>Điểm cần lưu ý cho học sinh:</strong> {item.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-slate-500 text-xs rounded-xl bg-slate-950">
            Chưa phát hiện lỗi sai nổi bật. Hệ thống sẽ thống kê khi có thêm học sinh hoàn thành các vòng thi.
          </div>
        )}
      </div>
    </div>
  );
};
