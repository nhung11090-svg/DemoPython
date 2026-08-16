import React, { useState, useEffect } from 'react';
import { Question, GameId } from '../../types';
import { CodeBlock } from '../CodeBlock';
import { teacherFetch } from '../../lib/teacherApi';
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

export const TeacherQuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await teacherFetch('/api/teacher/questions');
      if (!res.ok) {
        throw new Error('Chưa đăng nhập hoặc phiên làm việc đã hết hạn');
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.questions)) {
        setQuestions(data.questions);
      }
    } catch (err: any) {
      setError(err?.message || 'Không thể tải ngân hàng câu hỏi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const gameCounts: Record<string, number> = {
    predict: questions.filter((q) => q.game === 'predict').length,
    variable: questions.filter((q) => q.game === 'variable').length,
    bug: questions.filter((q) => q.game === 'bug').length,
    ifmaze: questions.filter((q) => q.game === 'ifmaze').length,
    builder: questions.filter((q) => q.game === 'builder').length,
  };

  const filteredQuestions = questions.filter((q) => {
    const matchGame = selectedGame === 'all' || q.game === selectedGame;
    const matchDiff = selectedDifficulty === 'all' || q.difficulty.toString() === selectedDifficulty;
    const matchSearch =
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.conceptNameVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.code.toLowerCase().includes(searchTerm.toLowerCase());

    return matchGame && matchDiff && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            NGÂN HÀNG 200 CÂU HỎI PYTHON CHUẨN HÓA
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Duyệt toàn bộ 200 câu hỏi chia đều cho 5 trò chơi (40 câu/trò chơi), bám sát chương trình SGK Tin học 8
          </p>
        </div>

        <button
          onClick={fetchQuestions}
          disabled={loading}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Tải lại</span>
        </button>
      </div>

      {/* 5 Games Quick Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => setSelectedGame('all')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            selectedGame === 'all'
              ? 'bg-emerald-500/10 border-emerald-500/50 text-white'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider">Tất cả</div>
          <div className="text-xl font-black text-emerald-400 mt-1">{questions.length}/200</div>
        </button>

        {[
          { id: 'predict', title: '1. Đoán kết quả', count: gameCounts.predict || 40, icon: '🔮' },
          { id: 'variable', title: '2. Theo dấu biến', count: gameCounts.variable || 40, icon: '📦' },
          { id: 'bug', title: '3. Thợ săn lỗi', count: gameCounts.bug || 40, icon: '🔍' },
          { id: 'ifmaze', title: '4. Điều kiện', count: gameCounts.ifmaze || 40, icon: '⚡' },
          { id: 'builder', title: '5. Xây dựng', count: gameCounts.builder || 40, icon: '🧩' },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGame(g.id)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedGame === g.id
                ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[11px] font-bold flex items-center gap-1">
              <span>{g.icon}</span>
              <span className="truncate">{g.title}</span>
            </div>
            <div className="text-xl font-black text-cyan-400 mt-1">{g.count}/40 câu</div>
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo ID, từ khóa câu hỏi, khái niệm hoặc code..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
          >
            <option value="all">Tất cả 5 trò chơi</option>
            <option value="predict">1. Đoán kết quả (Output)</option>
            <option value="variable">2. Theo dấu biến (Trace)</option>
            <option value="bug">3. Thợ săn lỗi (Debug)</option>
            <option value="ifmaze">4. Cánh cửa điều kiện (If-Else)</option>
            <option value="builder">5. Xây dựng chương trình (Logic)</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
          >
            <option value="all">Tất cả độ khó (1 - 4 sao)</option>
            <option value="1">⭐ 1 Sao: Nhận biết</option>
            <option value="2">⭐⭐ 2 Sao: Thông hiểu</option>
            <option value="3">⭐⭐⭐ 3 Sao: Vận dụng</option>
            <option value="4">⭐⭐⭐⭐ 4 Sao: Vận dụng cao</option>
          </select>
        </div>
      </div>

      {/* Questions Grid & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Questions List */}
        <div className="lg:col-span-5 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
          <div className="text-xs text-slate-400 font-bold px-1">
            Hiển thị {filteredQuestions.length} / {questions.length} câu hỏi
          </div>

          {filteredQuestions.map((q) => {
            const isSelected = selectedQuestion?.id === q.id;
            return (
              <div
                key={q.id}
                onClick={() => setSelectedQuestion(q)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-[11px] text-cyan-400">
                    {q.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold text-[10px]">
                      {'⭐'.repeat(q.difficulty)}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400 font-medium">
                      {q.game}
                    </span>
                  </div>
                </div>

                <div className="font-bold text-white line-clamp-2">
                  {q.question}
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-medium truncate max-w-[200px]">
                    {q.conceptNameVi}
                  </span>
                  <span className="text-slate-500">
                    {q.options?.length || 0} lựa chọn
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Full Question Detail Inspector */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-20">
          {selectedQuestion ? (
            <>
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-emerald-400 text-sm">
                      {selectedQuestion.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold">
                      {selectedQuestion.conceptNameVi}
                    </span>
                  </div>
                  <div className="text-amber-400 text-xs font-bold mt-1">
                    Độ khó: {'⭐'.repeat(selectedQuestion.difficulty)} (Cấp {selectedQuestion.difficulty})
                  </div>
                </div>

                <div className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-semibold">
                  Loại: {selectedQuestion.type === 'multiple' ? 'Nhiều đáp án đúng' : 'Một đáp án'}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm font-extrabold text-white leading-relaxed">
                {selectedQuestion.question}
              </div>

              {/* Code Snippet if present */}
              {selectedQuestion.code && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Đoạn mã Python:
                  </div>
                  <CodeBlock code={selectedQuestion.code} />
                </div>
              )}

              {/* Options & Correct Answer Marked */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Các lựa chọn trả lời:
                </div>
                <div className="space-y-2">
                  {selectedQuestion.options.map((opt) => {
                    const isCorrect = selectedQuestion.correctAnswers.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs font-medium ${
                          isCorrect
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] ${
                            isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </div>

                        {isCorrect && (
                          <span className="flex items-center gap-1 font-bold text-emerald-400 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> ĐÁP ÁN ĐÚNG
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pedagogical Explanation & Key Takeaway */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-cyan-300">
                    <Lightbulb className="w-3.5 h-3.5" />
                    GIẢI THÍCH SƯ PHẠM CHI TIẾT:
                  </div>
                  <p className="leading-relaxed text-slate-300">
                    {selectedQuestion.explanation}
                  </p>
                </div>

                {selectedQuestion.takeaway && (
                  <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 space-y-1">
                    <div className="font-bold flex items-center gap-1 text-purple-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      GHI NHỚ TRỌNG TÂM CHO HỌC SINH:
                    </div>
                    <p className="leading-relaxed text-slate-300">
                      {selectedQuestion.takeaway}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="py-24 text-center space-y-2 text-slate-500">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-600" />
              <div className="text-sm font-bold text-slate-400">
                Chọn một câu hỏi ở danh sách bên trái
              </div>
              <p className="text-xs">
                Xem toàn văn đoạn mã, đáp án đúng, phân tích sư phạm và lưu ý trọng tâm
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
