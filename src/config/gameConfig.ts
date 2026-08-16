import type { GameId, GameInfo, Badge } from '../types.js';

export const CLASS_OPTIONS = [
  '8A1',
  '8A2',
  '8A3',
  '8A4',
  '8A5',
  '8A6',
  '8A7',
  '8A8',
  '8A9',
  '8A10',
  'Khác',
];

export const GAME_METADATA: Record<GameId, GameInfo> = {
  predict: {
    id: 'predict',
    title: 'Đoán kết quả (Tiên Tri Mã)',
    subtitle: 'Python sẽ in ra gì?',
    icon: '🔮',
    description: 'Đọc mã nguồn, suy luận thứ tự thực thi và dự đoán chính xác kết quả in ra màn hình.',
    highlights: ['Lệnh print()', 'Phép toán số học', 'Nối & Lặp chuỗi', 'Ép kiểu int/float/str'],
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: 'cyan',
  },
  variable: {
    id: 'variable',
    title: 'Theo dấu biến (Truy Tìm Biến Số)',
    subtitle: 'Theo dấu biến số qua từng dòng',
    icon: '🕵️',
    description: 'Theo dõi giá trị biến thay đổi qua từng dòng lệnh, hiểu bản chất phép gán và hoán đổi biến.',
    highlights: ['Phép gán =', 'Cộng dồn +=, -=', 'Tráo biến', 'Chỉ số danh sách'],
    gradient: 'from-amber-400 to-orange-500',
    accentColor: 'amber',
  },
  bug: {
    id: 'bug',
    title: 'Thợ săn lỗi (Bắt Bug Code)',
    subtitle: 'Vạch trần Bug trong mã nguồn',
    icon: '🐛',
    description: 'Tìm kiếm lỗi cú pháp SyntaxError, kiểu dữ liệu TypeError, thụt lề IndentationError và lỗi logic.',
    highlights: ['SyntaxError', 'TypeError', 'NameError', 'IndentationError'],
    gradient: 'from-emerald-400 to-teal-600',
    accentColor: 'emerald',
  },
  ifmaze: {
    id: 'ifmaze',
    title: 'Cánh cửa điều kiện (Mê Cung Rẽ Nhánh)',
    subtitle: 'Python sẽ đi vào cánh cửa nào?',
    icon: '🏰',
    description: 'Đánh giá điều kiện đúng/sai (Boolean) và dự đoán nhánh rẽ if / elif / else chương trình chọn.',
    highlights: ['Toán tử so sánh', 'Logic AND / OR / NOT', 'Cấu trúc elif', 'If lồng nhau'],
    gradient: 'from-purple-500 to-indigo-600',
    accentColor: 'purple',
  },
  builder: {
    id: 'builder',
    title: 'Xây dựng chương trình (Ghép Mã Lệnh)',
    subtitle: 'Sắp xếp dòng lệnh theo luồng thuật toán',
    icon: '🧩',
    description: 'Sắp xếp các dòng mã xáo trộn thành chương trình hoàn chỉnh theo đúng luồng Input -> Process -> Output.',
    highlights: ['Luồng thuật toán', 'Nhập xuất dữ liệu', 'Vòng lặp for / while', 'Cấu trúc khối lệnh'],
    gradient: 'from-pink-500 to-rose-600',
    accentColor: 'rose',
  },
  boss: {
    id: 'boss',
    title: 'Đấu Trường Trùm Cuối (Quái Vật Bug)',
    subtitle: 'Thử thách tổng hợp 5 kỹ năng',
    icon: '👾',
    description: 'Hạ gục Quái vật Bug Lập Trình bằng cách trả lời đúng các câu hỏi tổng hợp!',
    highlights: ['5 Ải liên hoàn', 'Điểm thưởng x2', 'Mở khóa huy hiệu Vua Phá Bug', 'Độ khó đỉnh cao'],
    gradient: 'from-rose-500 via-red-500 to-amber-500',
    accentColor: 'rose',
  },
};

export const GAMES = Object.values(GAME_METADATA);

export const BADGES: Badge[] = [
  {
    id: 'master',
    title: '🏆 Đại Sư Python Lớp 8',
    desc: 'Đạt độ chính xác từ 90% trở lên. Đỉnh cao tư duy thuật toán!',
    icon: '🏆',
    minPercent: 90,
  },
  {
    id: 'knight',
    title: '⚡ Hiệp Sĩ Thuật Toán',
    desc: 'Đạt độ chính xác từ 75% trở lên. Nắm rất chắc kiến thức cốt lõi!',
    icon: '⚡',
    minPercent: 75,
  },
  {
    id: 'scout',
    title: '🔥 Thợ Săn Code Tài Ba',
    desc: 'Đạt độ chính xác từ 60% trở lên. Vượt qua phần lớn các thử thách!',
    icon: '🔥',
    minPercent: 60,
  },
  {
    id: 'starter',
    title: '🌱 Chiến Binh Python Mới',
    desc: 'Bắt đầu bước chân vào thế giới lập trình kỳ thú.',
    icon: '🌱',
    minPercent: 0,
  },
];

export const GAME_CONFIG = {
  questionsPerGame: 5,
  randomizeOptions: true,
};
