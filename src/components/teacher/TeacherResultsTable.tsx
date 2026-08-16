import React, { useState, useEffect } from 'react';
import { StudentSession } from '../../types';
import { teacherFetch } from '../../lib/teacherApi';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Trophy,
  ExternalLink,
  Table,
} from 'lucide-react';
import { CLASS_OPTIONS } from '../../config/gameConfig';

export const TeacherResultsTable: React.FC = () => {
  const [sessions, setSessions] = useState<StudentSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [openingSheet, setOpeningSheet] = useState(false);
  const [error, setError] = useState('');
  const [sheetFeedback, setSheetFeedback] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<StudentSession | null>(null);
  const [googleSheetInfo, setGoogleSheetInfo] = useState<{
    connected: boolean;
    hasDirectUrl: boolean;
    url: string | null;
  }>({
    connected: false,
    hasDirectUrl: false,
    url: null,
  });

  const fetchResults = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await teacherFetch('/api/teacher/results');
      if (!res.ok) {
        throw new Error('Chưa đăng nhập hoặc phiên làm việc đã hết hạn');
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.sessions)) {
        // Sort by lastUpdated descending
        const sorted = [...data.sessions].sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
        setSessions(sorted);
      }
      if (data.googleSheet) {
        setGoogleSheetInfo({
          connected: !!data.googleSheet.connected,
          hasDirectUrl: !!(data.googleSheet.hasDirectUrl || data.googleSheet.url),
          url: data.googleSheet.url || null,
        });
      }
    } catch (err: any) {
      setError(err?.message || 'Không thể tải danh sách kết quả');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const filteredSessions = sessions.filter((s) => {
    const matchName = s.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = selectedClass === 'all' || s.studentClass === selectedClass;
    return matchName && matchClass;
  });

  const handleOpenGoogleSheet = async () => {
    setOpeningSheet(true);
    setSheetFeedback(null);

    try {
      const res = await teacherFetch('/api/teacher/google-sheet-url');
      if (!res.ok) {
        throw new Error('Không thể xác thực quyền truy cập giáo viên.');
      }
      const data = await res.json();

      if (!data.configured || !data.url) {
        setSheetFeedback(data.message || 'Chưa cấu hình đường dẫn Google Sheet');
        return;
      }

      const targetUrl = String(data.url).trim();

      // Strict URL verification: domain docs.google.com and path contains spreadsheets/d/
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(targetUrl);
      } catch {
        setSheetFeedback('URL Google Sheet không hợp lệ.');
        return;
      }

      if (parsedUrl.hostname !== 'docs.google.com' || !parsedUrl.pathname.includes('spreadsheets/d/')) {
        setSheetFeedback('URL không đúng định dạng Google Spreadsheet (cần có docs.google.com/spreadsheets/d/...).');
        return;
      }

      // Open strictly in a new tab without altering current location or history
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err: any) {
      setSheetFeedback(err?.message || 'Lỗi khi lấy đường dẫn Google Sheet.');
    } finally {
      setOpeningSheet(false);
    }
  };

  const exportCSV = () => {
    if (filteredSessions.length === 0) return;
    const headers = ['Mã Session', 'Họ và tên', 'Lớp', 'Đúng/Tổng', 'Độ chính xác (%)', 'Tổng XP', 'Danh hiệu', 'Trạng thái', 'Thời gian'];
    const rows = filteredSessions.map((s) => [
      s.sessionId,
      `"${s.studentName.replace(/"/g, '""')}"`,
      `"${s.studentClass}"`,
      `${s.totalCorrect || 0}/${s.totalQuestions || 0}`,
      `${s.accuracyPercent || 0}%`,
      s.totalXp || 0,
      `"${s.badge || 'Tập sự'}"`,
      s.completed ? 'Hoàn thành' : 'Đang làm',
      new Date(s.lastUpdated || s.startTime).toLocaleString('vi-VN'),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bang_Diem_Python_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              DANH SÁCH BÀI LÀM CỦA HỌC SINH
            </h2>

            {/* Google Sheets Connection Status Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                googleSheetInfo.connected
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  googleSheetInfo.connected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                }`}
              />
              <span>
                {googleSheetInfo.connected
                  ? '🟢 Google Sheets: Đã kết nối'
                  : '🔴 Google Sheets: Chưa kết nối'}
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Xem điểm số, tiến độ, thời gian và chi tiết câu trả lời của từng học sinh
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchResults}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>

          <button
            onClick={exportCSV}
            disabled={filteredSessions.length === 0}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất file Excel/CSV</span>
          </button>

          {/* MỞ GOOGLE SHEET BUTTON */}
          {googleSheetInfo.hasDirectUrl || googleSheetInfo.url ? (
            <button
              onClick={handleOpenGoogleSheet}
              disabled={openingSheet}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-60 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-teal-600/20 cursor-pointer active:scale-[0.99]"
              title="Mở file Google Sheet thật trong tab mới"
            >
              {openingSheet ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Table className="w-3.5 h-3.5" />
              )}
              <span>📊 MỞ GOOGLE SHEET</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </button>
          ) : (
            <button
              disabled
              title="Chưa cấu hình đường dẫn Google Sheet (biến môi trường GOOGLE_SHEET_URL)"
              className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-500 text-xs font-bold flex items-center gap-1.5 cursor-not-allowed opacity-60"
            >
              <Table className="w-3.5 h-3.5" />
              <span>📊 MỞ GOOGLE SHEET</span>
              <span className="text-[10px] text-amber-400/80 font-normal italic">
                (Chưa cấu hình đường dẫn Google Sheet)
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Optional Feedback Alert if error occurred while opening */}
      {sheetFeedback && (
        <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold">⚠️ Thông báo Google Sheet:</span>
            <span>{sheetFeedback}</span>
          </div>
          <button
            onClick={() => setSheetFeedback(null)}
            className="text-amber-400 hover:text-amber-200 font-bold px-2 py-0.5 text-xs rounded hover:bg-amber-900/50"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên học sinh..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="sm:col-span-4 relative">
          <Filter className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
          >
            <option value="all">Tất cả các lớp ({sessions.length} học sinh)</option>
            {CLASS_OPTIONS.filter((c) => c !== 'Khác').map((c) => (
              <option key={c} value={c}>
                Lớp {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3.5">Học sinh</th>
                <th className="px-3 py-3.5">Lớp</th>
                <th className="px-3 py-3.5">Tiến độ 5 game</th>
                <th className="px-3 py-3.5 text-center">Kết quả</th>
                <th className="px-3 py-3.5 text-center">XP</th>
                <th className="px-3 py-3.5">Danh hiệu</th>
                <th className="px-3 py-3.5">Thời gian cập nhật</th>
                <th className="px-4 py-3.5 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading && sessions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-400 text-xs">
                    Đang tải danh sách kết quả học sinh...
                  </td>
                </tr>
              ) : filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-500 text-xs">
                    {searchTerm || selectedClass !== 'all'
                      ? 'Không tìm thấy học sinh nào phù hợp bộ lọc.'
                      : 'Chưa có dữ liệu bài làm của học sinh nào. Khi học sinh làm bài trên laptop, kết quả sẽ tự động lưu về đây.'}
                  </td>
                </tr>
              ) : (
                filteredSessions.map((session) => (
                  <tr
                    key={session.sessionId}
                    className="hover:bg-slate-800/40 transition-colors font-medium"
                  >
                    <td className="px-4 py-3 text-white font-bold">
                      {session.studentName}
                    </td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-[11px]">
                        {session.studentClass}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        {['predict', 'variable', 'bug', 'ifmaze', 'builder'].map((gid) => {
                          const done = session.completedGames?.includes(gid as any);
                          return (
                            <span
                              key={gid}
                              className={`w-2.5 h-2.5 rounded-full ${
                                done ? 'bg-emerald-400' : 'bg-slate-800'
                              }`}
                              title={`Game: ${gid}`}
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="font-mono font-bold text-emerald-400 text-xs">
                        {session.totalCorrect || 0}/{session.totalQuestions || 0}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        ({session.accuracyPercent || 0}%)
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="text-purple-300 font-extrabold flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        {session.totalXp || 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-amber-300 font-semibold text-[11px]">
                      {session.badge || 'Tập sự'}
                    </td>
                    <td className="px-3 py-3 text-slate-400 text-[11px]">
                      {new Date(session.lastUpdated || session.startTime).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 text-[11px] font-bold inline-flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Answers Inspection Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white">
                  Chi tiết bài làm: {selectedSession.studentName}
                </h3>
                <p className="text-xs text-slate-400">
                  Lớp: <span className="text-emerald-400 font-bold">{selectedSession.studentClass}</span> • Độ chính xác:{' '}
                  <span className="text-amber-400 font-bold">{selectedSession.accuracyPercent}%</span> • XP:{' '}
                  <span className="text-purple-400 font-bold">{selectedSession.totalXp} XP</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedSession(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Answers List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {selectedSession.answers && selectedSession.answers.length > 0 ? (
                selectedSession.answers.map((ans, idx) => (
                  <div
                    key={ans.eventId || idx}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      ans.isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                        : 'bg-rose-950/20 border-rose-500/30 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[11px] text-slate-400">
                        Câu {idx + 1} ({ans.game} • {ans.questionId})
                      </span>
                      {ans.isCorrect ? (
                        <span className="flex items-center gap-1 font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng (+{ans.xpEarned} XP)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-bold text-rose-400">
                          <XCircle className="w-3.5 h-3.5" /> Sai (+{ans.xpEarned} XP)
                        </span>
                      )}
                    </div>

                    <div className="text-slate-300">
                      <strong>Khái niệm:</strong> {ans.concept}
                    </div>

                    <div className="text-slate-400 text-[11px]">
                      Lựa chọn của học sinh:{' '}
                      <span className="font-mono text-white">
                        {ans.selectedOptionIds?.join(', ') || 'Không'}
                      </span>{' '}
                      • Đáp án chuẩn:{' '}
                      <span className="font-mono text-emerald-300">
                        {ans.correctAnswers?.join(', ')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Chưa có chi tiết từng câu hỏi trong phiên này.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedSession(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
