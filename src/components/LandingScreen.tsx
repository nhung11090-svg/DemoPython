import React, { useState } from 'react';
import { CLASS_OPTIONS, GAME_METADATA } from '../config/gameConfig';
import { Sparkles, Terminal, Play, CheckCircle2 } from 'lucide-react';

interface LandingScreenProps {
  onStartSession: (name: string, studentClass: string) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartSession,
}) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState(CLASS_OPTIONS[0]);
  const [customClass, setCustomClass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim();
    const finalClass = studentClass === 'Khác' ? customClass.trim() : studentClass;

    if (!finalName) {
      setError('Vui lòng nhập Họ và tên của em để ghi nhận điểm!');
      return;
    }
    if (studentClass === 'Khác' && !finalClass) {
      setError('Vui lòng nhập tên lớp của em!');
      return;
    }

    setError('');
    onStartSession(finalName, finalClass);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-center items-center px-4 py-8 max-w-5xl mx-auto">
      {/* Top Banner / Hero */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          DÀNH CHO HỌC SINH LỚP 8 – CHINH PHỤC TIN HỌC
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-tight">
          🐍 HÀNH TRÌNH PYTHON
        </h1>

        <p className="text-slate-300 font-medium text-sm sm:text-base max-w-xl mx-auto">
          Giải mã – Suy luận – Săn lỗi – Vượt qua 5 thế giới và đánh bại Quái vật Bug Lập Trình!
        </p>
      </div>

      {/* Main Grid: Form + Game Preview */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Login Form */}
        <div className="lg:col-span-5 w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Đăng nhập Chiến binh</h2>
              <p className="text-xs text-slate-400">Ghi danh để lưu điểm và nhận danh hiệu</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Họ và tên của em <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
                autoFocus
              />
            </div>

            {/* Class Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Lớp học <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {CLASS_OPTIONS.slice(0, 6).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => {
                      setStudentClass(c);
                      if (error) setError('');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      studentClass === c
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {CLASS_OPTIONS.slice(6).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => {
                      setStudentClass(c);
                      if (error) setError('');
                    }}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-bold border transition-all ${
                      studentClass === c
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {studentClass === 'Khác' && (
                <input
                  type="text"
                  value={customClass}
                  onChange={(e) => setCustomClass(e.target.value)}
                  placeholder="Nhập tên lớp của em..."
                  className="mt-2 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              )}
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              BẮT ĐẦU HÀNH TRÌNH
            </button>
          </form>
        </div>

        {/* Right: 5 Worlds Summary */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-emerald-400">🗺️</span> 5 THỬ THÁCH TRÊN HÀNH TRÌNH
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(GAME_METADATA).filter(g => g.id !== 'boss').map((g) => (
                <div
                  key={g.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 flex items-start gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="text-2xl p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                    {g.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1">
                      {g.title}
                    </h4>
                    <p className="text-[12px] text-slate-400 mt-0.5 line-clamp-2">
                      {g.description}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                      40 câu hỏi chuẩn hóa
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Boss Preview */}
            <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-r from-red-950/40 via-purple-950/40 to-slate-950 border border-red-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-bounce">👾</span>
                <div>
                  <h4 className="text-sm font-extrabold text-red-300">
                    Trận Đấu Trùm: Quái Vật Bug Lập Trình
                  </h4>
                  <p className="text-xs text-slate-400">
                    Vượt qua 5 trò chơi để mở khóa và đánh bại Trùm Cuối
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30">
                ❤️❤️❤️❤️❤️
              </span>
            </div>
          </div>

          {/* Educational Highlights */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-300 flex items-center justify-around gap-2 text-center">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Bám sát SGK Tin học 8</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Giải thích từng bước</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tặng cúp danh hiệu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
