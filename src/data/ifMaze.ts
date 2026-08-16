import { Question } from '../types';

export const IF_MAZE_QUESTIONS: Question[] = [
  {
    id: 'if_001',
    game: 'ifmaze',
    difficulty: 1,
    concept: 'if_simple',
    conceptNameVi: 'Cấu trúc if-else cơ bản',
    type: 'single',
    code: `diem = 8

if diem >= 7:
    print("DO")
else:
    print("HOC LAI")`,
    question: 'Python sẽ đi vào cánh cửa nào và in ra kết quả gì?',
    options: [
      { id: 'A', text: '🚪 Cửa DO' },
      { id: 'B', text: '🚪 Cửa HOC LAI' },
      { id: 'C', text: 'In cả hai chữ' },
      { id: 'D', text: 'Không in gì cả' }
    ],
    correctAnswers: ['A'],
    explanation: 'diem = 8. Điều kiện 8 >= 7 là True (Đúng), vì vậy Python bước vào nhánh if và in ra "DO".',
    wrongExplanations: {
      B: 'Nhánh else chỉ chạy khi điều kiện if bị Sai (False).',
      C: 'Cấu trúc if-else chỉ chọn duy nhất 1 trong 2 nhánh để thực hiện.',
      D: 'Một trong hai nhánh chắc chắn sẽ được thực thi.'
    },
    takeaway: 'Khi điều kiện if là True, Python thực hiện nhánh if và bỏ qua hoàn toàn nhánh else.'
  },
  {
    id: 'if_002',
    game: 'ifmaze',
    difficulty: 1,
    concept: 'if_false_branch',
    conceptNameVi: 'Nhánh else khi điều kiện sai',
    type: 'single',
    code: `tuoi = 12

if tuoi >= 15:
    print("Vao xem phim")
else:
    print("Chua du tuoi")`,
    question: 'Cánh cửa nào sẽ được mở ra?',
    options: [
      { id: 'A', text: '🚪 Cửa Chua du tuoi' },
      { id: 'B', text: '🚪 Cửa Vao xem phim' },
      { id: 'C', text: 'Lỗi chương trình' },
      { id: 'D', text: 'Mở cả 2 cửa' }
    ],
    correctAnswers: ['A'],
    explanation: 'tuoi = 12. Điều kiện 12 >= 15 là False (Sai), do đó Python bỏ qua nhánh if và chuyển sang thực hiện nhánh else.',
    wrongExplanations: {
      B: 'Nhánh if bị bỏ qua vì 12 không lớn hơn hoặc bằng 15.',
      C: 'Đoạn mã hoàn toàn đúng cú pháp.',
      D: 'Chỉ có đúng một cánh cửa được chọn.'
    },
    takeaway: 'Khi điều kiện if là False, Python tự động rẽ sang thực hiện nhánh else.'
  },
  {
    id: 'if_003',
    game: 'ifmaze',
    difficulty: 2,
    concept: 'equality_check',
    conceptNameVi: 'Kiểm tra so sánh bằng ==',
    type: 'single',
    code: `mat_khau = "123456"

if mat_khau == "123456":
    print("Mo khoa")
else:
    print("Sai mat khau")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa Mo khoa' },
      { id: 'B', text: '🚪 Cửa Sai mat khau' },
      { id: 'C', text: '123456' },
      { id: 'D', text: 'Lỗi so sánh' }
    ],
    correctAnswers: ['A'],
    explanation: 'Chuỗi "123456" hoàn toàn khớp với "123456", phép so sánh == cho kết quả True, mở ra cửa "Mo khoa".',
    wrongExplanations: {
      B: 'Mật khẩu nhập hoàn toàn trùng khớp.',
      C: 'Lệnh in chỉ in nội dung bên trong print(), không in mật khẩu.',
      D: 'Toán tử == dùng so sánh chuỗi rất an toàn trong Python.'
    },
    takeaway: 'Dấu == kiểm tra tính chính xác của dữ liệu văn bản hoặc số.'
  },
  {
    id: 'if_004',
    game: 'ifmaze',
    difficulty: 2,
    concept: 'elif_branch_choice',
    conceptNameVi: 'Chọn nhánh trong cấu trúc if-elif-else',
    type: 'single',
    code: `diem = 7.5

if diem >= 8.0:
    print("GIOI")
elif diem >= 6.5:
    print("KHA")
else:
    print("TRUNG BINH")`,
    question: 'Python sẽ chọn cánh cửa danh hiệu nào?',
    options: [
      { id: 'A', text: '🚪 Cửa KHA' },
      { id: 'B', text: '🚪 Cửa GIOI' },
      { id: 'C', text: '🚪 Cửa TRUNG BINH' },
      { id: 'D', text: 'In ca KHA va GIOI' }
    ],
    correctAnswers: ['A'],
    explanation: '7.5 >= 8.0 là False (bỏ qua if). Tiếp tục xét elif: 7.5 >= 6.5 là True -> Python in "KHA" rồi kết thúc.',
    wrongExplanations: {
      B: '7.5 chưa đủ 8.0 nên nhánh GIOI bị bỏ qua.',
      C: 'Vì nhánh elif đã thỏa mãn nên nhánh else không được chạy.',
      D: 'Python chỉ chạy nhánh đúng đầu tiên rồi thoát cấu trúc điều kiện.'
    },
    takeaway: 'elif giúp kiểm tra các phương án phụ theo thứ tự từ trên xuống dưới.'
  },
  {
    id: 'if_005',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'logical_and_both_true',
    conceptNameVi: 'Kết hợp điều kiện với toán tử and',
    type: 'single',
    code: `diem_toan = 9
diem_tin = 8

if diem_toan >= 8 and diem_tin >= 8:
    print("HOC SINH GIOI")
else:
    print("CHUA DAT")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa HOC SINH GIOI' },
      { id: 'B', text: '🚪 Cửa CHUA DAT' },
      { id: 'C', text: 'True' },
      { id: 'D', text: 'Lỗi cú pháp' }
    ],
    correctAnswers: ['A'],
    explanation: 'diem_toan >= 8 (9 >= 8: True) và diem_tin >= 8 (8 >= 8: True). True and True = True -> In "HOC SINH GIOI".',
    wrongExplanations: {
      B: 'Cả hai môn đều đạt từ 8 điểm trở lên nên thỏa mãn điều kiện and.',
      C: 'Lệnh print in chuỗi văn bản chứ không in giá trị True.',
      D: 'Cú pháp dùng and hoàn toàn đúng.'
    },
    takeaway: 'Toán tử and đòi hỏi TẤT CẢ các điều kiện thành phần đều phải ĐÚNG.'
  },
  {
    id: 'if_006',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'logical_and_one_false',
    conceptNameVi: 'Toán tử and khi có 1 điều kiện sai',
    type: 'single',
    code: `co_ve = True
du_tuoi = False

if co_ve and du_tuoi:
    print("DUOC VAO CONG")
else:
    print("BI CHAN LAI")`,
    question: 'Python sẽ chọn cánh cửa nào?',
    options: [
      { id: 'A', text: '🚪 Cửa BI CHAN LAI' },
      { id: 'B', text: '🚪 Cửa DUOC VAO CONG' },
      { id: 'C', text: 'False' },
      { id: 'D', text: 'Khong in gi' }
    ],
    correctAnswers: ['A'],
    explanation: 'co_ve là True nhưng du_tuoi là False. Phép toán True and False cho kết quả là False -> Chuyển sang nhánh else.',
    wrongExplanations: {
      B: 'Dù có vé nhưng chưa đủ tuổi nên điều kiện and bị Sai.',
      C: 'In chuỗi văn bản trong else.',
      D: 'Nhánh else luôn chạy khi điều kiện if sai.'
    },
    takeaway: 'Chỉ cần một điều kiện trong and bị False, toàn bộ biểu thức sẽ là False.'
  },
  {
    id: 'if_007',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'logical_or_one_true',
    conceptNameVi: 'Toán tử or khi có 1 điều kiện đúng',
    type: 'single',
    code: `la_chu_nhat = False
la_ngay_le = True

if la_chu_nhat or la_ngay_le:
    print("DUOC NGHI HOC")
else:
    print("PHAI DI HOC")`,
    question: 'Cánh cửa nào sẽ mở ra?',
    options: [
      { id: 'A', text: '🚪 Cửa DUOC NGHI HOC' },
      { id: 'B', text: '🚪 Cửa PHAI DI HOC' },
      { id: 'C', text: 'True' },
      { id: 'D', text: 'Lỗi cú pháp' }
    ],
    correctAnswers: ['A'],
    explanation: 'False or True = True (chỉ cần 1 vế đúng là được). Điều kiện đúng nên in ra "DUOC NGHI HOC".',
    wrongExplanations: {
      B: 'Nhờ có ngày lễ (la_ngay_le = True) nên đã thỏa mãn phép or.',
      C: 'Lệnh print in nội dung chữ bên trong.',
      D: 'Toán tử or là cú pháp chuẩn của Python.'
    },
    takeaway: 'Toán tử or chỉ cần ÍT NHẤT MỘT điều kiện đúng là sẽ cho kết quả True.'
  },
  {
    id: 'if_008',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'logical_or_both_false',
    conceptNameVi: 'Toán tử or khi cả hai điều kiện đều sai',
    type: 'single',
    code: `troi_mua = False
troi_gio = False

if troi_mua or troi_gio:
    print("O TRONG NHA")
else:
    print("DI DA BONG")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa DI DA BONG' },
      { id: 'B', text: '🚪 Cửa O TRONG NHA' },
      { id: 'C', text: 'False' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'False or False = False (cả 2 đều sai). Python chuyển vào nhánh else và in "DI DA BONG".',
    wrongExplanations: {
      B: 'Trời không mưa và cũng không gió nên không vào nhánh if.',
      C: 'In nội dung chữ trong print().',
      D: 'Code chạy bình thường.'
    },
    takeaway: 'Toán tử or chỉ cho kết quả False khi TẤT CẢ các điều kiện đều False.'
  },
  {
    id: 'if_009',
    game: 'ifmaze',
    difficulty: 2,
    concept: 'not_operator_in_if',
    conceptNameVi: 'Toán tử phủ định not trong câu điều kiện',
    type: 'single',
    code: `troi_mua = False

if not troi_mua:
    print("DI CONG VIEN")
else:
    print("O NHA DOC SACH")`,
    question: 'Màn hình sẽ hiển thị thông báo nào?',
    options: [
      { id: 'A', text: '🚪 Cửa DI CONG VIEN' },
      { id: 'B', text: '🚪 Cửa O NHA DOC SACH' },
      { id: 'C', text: 'False' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'troi_mua là False. Phủ định not False = True. Vì điều kiện là True nên Python thực hiện nhánh if: "DI CONG VIEN".',
    wrongExplanations: {
      B: 'not troi_mua có nghĩa là "trời KHÔNG mưa", vì trời không mưa thật nên điều kiện là True.',
      C: 'In nội dung chuỗi.',
      D: 'Toán tử not rất phổ biến trong Python.'
    },
    takeaway: 'not biến False thành True và biến True thành False.'
  },
  {
    id: 'if_010',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'nested_if_conditions',
    conceptNameVi: 'Cấu trúc if lồng nhau (Nested If)',
    type: 'single',
    code: `so = 12

if so > 0:
    if so % 2 == 0:
        print("DUONG CHAN")
    else:
        print("DUONG LE")
else:
    print("SO AM")`,
    question: 'Python sẽ đi qua các cánh cửa nào để in ra kết quả?',
    options: [
      { id: 'A', text: '🚪 Cửa DUONG CHAN' },
      { id: 'B', text: '🚪 Cửa DUONG LE' },
      { id: 'C', text: '🚪 Cửa SO AM' },
      { id: 'D', text: 'In ca DUONG CHAN va DUONG LE' }
    ],
    correctAnswers: ['A'],
    explanation: '12 > 0 là True (vào khối trong). Tiếp tục: 12 % 2 == 0 là True (12 chia hết cho 2) -> in "DUONG CHAN".',
    wrongExplanations: {
      B: '12 chia 2 dư 0 (số chẵn), không vào nhánh else số lẻ.',
      C: '12 là số dương nên không bao giờ xuống nhánh SO AM.',
      D: 'if-else bên trong chỉ chọn 1 nhánh.'
    },
    takeaway: 'Trong if lồng nhau, Python kiểm tra điều kiện ngoài trước, nếu đúng mới đi tiếp vào kiểm tra điều kiện bên trong.'
  },
  {
    id: 'if_011',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'string_comparison',
    conceptNameVi: 'So sánh chuỗi văn bản',
    type: 'single',
    code: `mau = "do"

if mau == "xanh":
    print("DI TIEP")
elif mau == "vang":
    print("DI CHAM")
elif mau == "do":
    print("DUNG LAI")
else:
    print("KHONG XAC DINH")`,
    question: 'Đèn tín hiệu màu đỏ sẽ đưa đến cửa nào?',
    options: [
      { id: 'A', text: '🚪 Cửa DUNG LAI' },
      { id: 'B', text: '🚪 Cửa DI TIEP' },
      { id: 'C', text: '🚪 Cửa DI CHAM' },
      { id: 'D', text: '🚪 Cửa KHONG XAC DINH' }
    ],
    correctAnswers: ['A'],
    explanation: 'mau = "do". Nhánh 1 (xanh) -> False. Nhánh 2 (vang) -> False. Nhánh 3 (do) -> True -> In "DUNG LAI".',
    wrongExplanations: {
      B: 'mau không bằng "xanh".',
      C: 'mau không bằng "vang".',
      D: 'Đã tìm thấy nhánh khớp "do" nên không vào else.'
    },
    takeaway: 'So sánh chuỗi trong if phân biệt chính xác từng chữ cái.'
  },
  {
    id: 'if_012',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'combined_and_or_precedence',
    conceptNameVi: 'Độ ưu tiên giữa and và or',
    type: 'single',
    code: `x = 5
y = 10

if x > 3 and y < 5 or x == 5:
    print("CUA A")
else:
    print("CUA B")`,
    question: 'Cánh cửa nào sẽ được kích hoạt?',
    options: [
      { id: 'A', text: '🚪 Cửa CUA A' },
      { id: 'B', text: '🚪 Cửa CUA B' },
      { id: 'C', text: 'Lỗi cú pháp' },
      { id: 'D', text: 'Khong in gi' }
    ],
    correctAnswers: ['A'],
    explanation: 'Toán tử and ưu tiên trước or: (x > 3 and y < 5) = (True and False) = False. Sau đó: False or (x == 5) = False or True = True -> Mở CUA A.',
    wrongExplanations: {
      B: 'Vế sau dấu or là (x == 5) cho kết quả True, giúp toàn bộ điều kiện thành True.',
      C: 'Kết hợp and và or là cú pháp hợp lệ.',
      D: 'Chương trình in kết quả bình thường.'
    },
    takeaway: 'Trong Python, toán tử and có độ ưu tiên cao hơn toán tử or.'
  },
  {
    id: 'if_013',
    game: 'ifmaze',
    difficulty: 2,
    concept: 'not_equal_condition',
    conceptNameVi: 'Điều kiện so sánh khác !=',
    type: 'single',
    code: `tien = 0

if tien != 0:
    print("CON TIEN")
else:
    print("HET TIEN")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa HET TIEN' },
      { id: 'B', text: '🚪 Cửa CON TIEN' },
      { id: 'C', text: '0' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'tien = 0. Điều kiện 0 != 0 (0 khác 0) là False (Sai). Vì vậy chuyển sang nhánh else và in "HET TIEN".',
    wrongExplanations: {
      B: '0 bằng 0 chứ không khác 0, nên điều kiện != bị False.',
      C: 'In dòng chữ trong lệnh print.',
      D: 'Toán tử != hoàn toàn hợp lệ.'
    },
    takeaway: '!= có nghĩa là "khác". a != b là False khi a và b bằng nhau.'
  },
  {
    id: 'if_014',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'list_membership_in',
    conceptNameVi: 'Kiểm tra phần tử trong danh sách bằng in',
    type: 'single',
    code: `mon_yeu_thich = "Tin"
ds_mon = ["Toan", "Van", "Tin", "Anh"]

if mon_yeu_thich in ds_mon:
    print("CO TRONG DANH SACH")
else:
    print("KHONG CO")`,
    question: 'Python sẽ in ra thông báo nào?',
    options: [
      { id: 'A', text: '🚪 Cửa CO TRONG DANH SACH' },
      { id: 'B', text: '🚪 Cửa KHONG CO' },
      { id: 'C', text: 'Tin' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'Từ khóa "in" kiểm tra xem giá trị có nằm trong danh sách hay không. "Tin" có trong ds_mon nên trả về True -> in "CO TRONG DANH SACH".',
    wrongExplanations: {
      B: '"Tin" là phần tử thứ 3 trong danh sách nên điều kiện là True.',
      C: 'In nội dung chuỗi trong print().',
      D: 'Toán tử "in" là một trong những tính năng mạnh mẽ nhất của Python.'
    },
    takeaway: 'Cú pháp "x in danh_sach" trả về True nếu x tồn tại trong danh sách.'
  },
  {
    id: 'if_015',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'not_in_membership',
    conceptNameVi: 'Kiểm tra không tồn tại với not in',
    type: 'single',
    code: `trai_cay = "Sau rieng"
ds = ["Cam", "Xoai", "Tao"]

if trai_cay not in ds:
    print("CHUA CO, HAY MUA THEM")
else:
    print("DA CO SAN")`,
    question: 'Cánh cửa nào sẽ được chọn?',
    options: [
      { id: 'A', text: '🚪 Cửa CHUA CO, HAY MUA THEM' },
      { id: 'B', text: '🚪 Cửa DA CO SAN' },
      { id: 'C', text: 'Sau rieng' },
      { id: 'D', text: 'Lỗi cú pháp' }
    ],
    correctAnswers: ['A'],
    explanation: '"Sau rieng" không có trong ds. Phép so sánh "not in" (không nằm trong) cho kết quả là True -> in "CHUA CO, HAY MUA THEM".',
    wrongExplanations: {
      B: '"Sau rieng" thực sự chưa có trong danh sách.',
      C: 'In thông báo trong print.',
      D: 'not in là cú pháp chuẩn của Python.'
    },
    takeaway: 'Cú pháp "x not in danh_sach" trả về True nếu x CHƯA có trong danh sách.'
  },
  {
    id: 'if_016',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'chained_comparison',
    conceptNameVi: 'So sánh kép dạng a < x < b',
    type: 'single',
    code: `tuoi = 14

if 12 <= tuoi <= 15:
    print("HOC SINH THCS")
else:
    print("CAP HOC KHAC")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa HOC SINH THCS' },
      { id: 'B', text: '🚪 Cửa CAP HOC KHAC' },
      { id: 'C', text: '14' },
      { id: 'D', text: 'Lỗi so sánh kép' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python, 12 <= tuoi <= 15 tương đương (12 <= 14 and 14 <= 15). Cả 2 đều đúng -> True -> in "HOC SINH THCS".',
    wrongExplanations: {
      B: '14 tuổi nằm gọn trong khoảng từ 12 đến 15.',
      C: 'Lệnh print in chuỗi kết quả.',
      D: 'Python cho phép viết so sánh kép rất tự nhiên giống hệt trong toán học.'
    },
    takeaway: 'Python hỗ trợ so sánh kép: a <= x <= b (kiểm tra x nằm trong đoạn từ a đến b).'
  },
  {
    id: 'if_017',
    game: 'ifmaze',
    difficulty: 2,
    concept: 'boolean_variable_direct',
    conceptNameVi: 'Dùng trực tiếp biến Boolean làm điều kiện',
    type: 'single',
    code: `da_dang_nhap = True

if da_dang_nhap:
    print("CHAO MUNG BAN")
else:
    print("VUI LONG DANG NHAP")`,
    question: 'Màn hình sẽ hiển thị dòng chữ nào?',
    options: [
      { id: 'A', text: '🚪 Cửa CHAO MUNG BAN' },
      { id: 'B', text: '🚪 Cửa VUI LONG DANG NHAP' },
      { id: 'C', text: 'True' },
      { id: 'D', text: 'Lỗi vì thiếu dấu so sánh ==' }
    ],
    correctAnswers: ['A'],
    explanation: 'Biến da_dang_nhap đã mang giá trị True, nên câu lệnh if da_dang_nhap: trực tiếp nhận giá trị True và in "CHAO MUNG BAN".',
    wrongExplanations: {
      B: 'Biến là True nên không vào nhánh else.',
      C: 'In nội dung trong lệnh print.',
      D: 'Không cần viết "== True", viết "if da_dang_nhap:" là cách viết chuẩn và đẹp nhất trong Python.'
    },
    takeaway: 'Có thể đặt trực tiếp biến Boolean vào sau chữ if mà không cần viết thêm == True.'
  },
  {
    id: 'if_018',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'len_condition',
    conceptNameVi: 'Kiểm tra độ dài chuỗi trong điều kiện',
    type: 'single',
    code: `ten = "Minh"

if len(ten) > 5:
    print("TEN DAI")
else:
    print("TEN NGAN")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa TEN NGAN' },
      { id: 'B', text: '🚪 Cửa TEN DAI' },
      { id: 'C', text: '4' },
      { id: 'D', text: 'Minh' }
    ],
    correctAnswers: ['A'],
    explanation: 'len("Minh") = 4. Điều kiện 4 > 5 là False -> Rẽ vào nhánh else và in "TEN NGAN".',
    wrongExplanations: {
      B: 'Tên Minh chỉ có 4 ký tự, không lớn hơn 5.',
      C: '4 là độ dài, kết quả in là chuỗi trong else.',
      D: 'In nhãn kết quả.'
    },
    takeaway: 'Có thể lồng các hàm như len() vào biểu thức so sánh của if.'
  },
  {
    id: 'if_019',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'nested_elif_ladder',
    conceptNameVi: 'Thang đo nhiệt độ nhiều nhánh',
    type: 'single',
    code: `nhiet_do = 22

if nhiet_do >= 35:
    print("RAT NONG")
elif nhiet_do >= 25:
    print("AM AP")
elif nhiet_do >= 15:
    print("MAT ME")
else:
    print("LANH")`,
    question: 'Nhiệt độ 22 độ C sẽ đưa về kết quả nào?',
    options: [
      { id: 'A', text: '🚪 Cửa MAT ME' },
      { id: 'B', text: '🚪 Cửa AM AP' },
      { id: 'C', text: '🚪 Cửa LANH' },
      { id: 'D', text: '🚪 Cửa RAT NONG' }
    ],
    correctAnswers: ['A'],
    explanation: '22 >= 35 (False) -> 22 >= 25 (False) -> 22 >= 15 (True) -> In "MAT ME" và dừng lại.',
    wrongExplanations: {
      B: '22 nhỏ hơn 25 nên chưa đạt mức AM AP.',
      C: 'Vì nhánh MAT ME đã đúng nên không xuống nhánh else LANH.',
      D: '22 nhỏ hơn 35.'
    },
    takeaway: 'Trong chuỗi elif, Python kiểm tra từng điều kiện một, gặp điều kiện đúng đầu tiên là dừng ngay.'
  },
  {
    id: 'if_020',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'leap_year_logic_simplified',
    conceptNameVi: 'Kiểm tra năm nhuận đơn giản',
    type: 'single',
    code: `nam = 2024

if nam % 4 == 0:
    print("NAM NHUAN")
else:
    print("NAM THUONG")`,
    question: 'Năm 2024 là năm gì theo đoạn code trên?',
    options: [
      { id: 'A', text: '🚪 Cửa NAM NHUAN' },
      { id: 'B', text: '🚪 Cửa NAM THUONG' },
      { id: 'C', text: '0' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: '2024 chia hết cho 4 (2024 % 4 == 0 là True) -> in "NAM NHUAN".',
    wrongExplanations: {
      B: '2024 chia hết cho 4 nên không vào nhánh else.',
      C: 'In thông báo trong print.',
      D: 'Phép % là phép chia lấy dư chuẩn.'
    },
    takeaway: 'Phép chia lấy dư so % 4 == 0 dùng để kiểm tra một số có chia hết cho 4 hay không.'
  },
  {
    id: 'if_021',
    game: 'ifmaze',
    difficulty: 2,
    concept: 'empty_list_condition',
    conceptNameVi: 'Kiểm tra danh sách rỗng',
    type: 'single',
    code: `gio_hang = []

if len(gio_hang) == 0:
    print("GIO HANG DANG TRONG")
else:
    print("CO SAN PHAM")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa GIO HANG DANG TRONG' },
      { id: 'B', text: '🚪 Cửa CO SAN PHAM' },
      { id: 'C', text: '[]' },
      { id: 'D', text: '0' }
    ],
    correctAnswers: ['A'],
    explanation: 'gio_hang là danh sách rỗng [], độ dài len(gio_hang) bằng 0. 0 == 0 là True -> in "GIO HANG DANG TRONG".',
    wrongExplanations: {
      B: 'Giỏ hàng chưa có phần tử nào.',
      C: 'Lệnh in xuất ra chuỗi thông báo.',
      D: 'len bằng 0 làm điều kiện True.'
    },
    takeaway: 'len(ds) == 0 dùng để kiểm tra xem danh sách có đang trống hay không.'
  },
  {
    id: 'if_022',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'modulo_even_odd',
    conceptNameVi: 'Kiểm tra số chẵn lẻ',
    type: 'single',
    code: `n = 17

if n % 2 == 0:
    print("SO CHAN")
else:
    print("SO LE")`,
    question: 'Số 17 sẽ cho ra kết quả nào?',
    options: [
      { id: 'A', text: '🚪 Cửa SO LE' },
      { id: 'B', text: '🚪 Cửa SO CHAN' },
      { id: 'C', text: '1' },
      { id: 'D', text: '17' }
    ],
    correctAnswers: ['A'],
    explanation: '17 % 2 = 1 (17 chia 2 dư 1). Điều kiện 1 == 0 là False -> Rẽ vào else: in "SO LE".',
    wrongExplanations: {
      B: '17 không chia hết cho 2 nên không phải số chẵn.',
      C: '1 là số dư, lệnh in ra chữ "SO LE".',
      D: 'In chuỗi thông báo.'
    },
    takeaway: 'n % 2 == 0 là công thức chuẩn để nhận biết số chẵn trong lập trình.'
  },
  {
    id: 'if_023',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'complex_and_logic',
    conceptNameVi: 'Ba điều kiện and đồng thời',
    type: 'single',
    code: `a = 5
b = 10
c = 15

if a < b and b < c and a + b == c:
    print("THOA MAN TAT CA")
else:
    print("KHONG THOA MAN")`,
    question: 'Cánh cửa nào sẽ được mở?',
    options: [
      { id: 'A', text: '🚪 Cửa THOA MAN TAT CA' },
      { id: 'B', text: '🚪 Cửa KHONG THOA MAN' },
      { id: 'C', text: 'True' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: '5 < 10 (True), 10 < 15 (True), và 5 + 10 == 15 (True). Cả 3 điều kiện đều True -> In "THOA MAN TAT CA".',
    wrongExplanations: {
      B: 'Cả 3 điều kiện đều thỏa mãn xuất sắc.',
      C: 'In câu thông báo.',
      D: 'Cú pháp hoàn toàn đúng.'
    },
    takeaway: 'Có thể nối nhiều điều kiện and liên tiếp: dk1 and dk2 and dk3.'
  },
  {
    id: 'if_024',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'elif_no_match_else',
    conceptNameVi: 'Khi không nhánh elif nào khớp -> về else',
    type: 'single',
    code: `thu = 8

if thu == 2:
    print("THU HAI")
elif thu == 3:
    print("THU BA")
elif thu == 4:
    print("THU TU")
else:
    print("KHONG HOP LE")`,
    question: 'Với thu = 8, kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa KHONG HOP LE' },
      { id: 'B', text: '🚪 Cửa THU HAI' },
      { id: 'C', text: '🚪 Cửa THU TU' },
      { id: 'D', text: 'Khong in gi ca' }
    ],
    correctAnswers: ['A'],
    explanation: 'thu = 8 không khớp với bất kỳ nhánh if/elif nào (2, 3, 4) nên rơi vào nhánh else cuối cùng: in "KHONG HOP LE".',
    wrongExplanations: {
      B: 'thu là 8 chứ không phải 2.',
      C: 'thu không phải 4.',
      D: 'Nhánh else sẽ luôn được thực thi khi mọi điều kiện trước đó đều sai.'
    },
    takeaway: 'Nhánh else đóng vai trò là chiếc lưới an toàn, đón nhận mọi trường hợp chưa được liệt kê ở trên.'
  },
  {
    id: 'if_025',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'string_startswith_logic',
    conceptNameVi: 'Kiểm tra ký tự đầu tiên của chuỗi',
    type: 'single',
    code: `ma_so = "HS08A"

if ma_so[0] == "H":
    print("HOC SINH")
else:
    print("GIAO VIEN")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa HOC SINH' },
      { id: 'B', text: '🚪 Cửa GIAO VIEN' },
      { id: 'C', text: 'H' },
      { id: 'D', text: 'Lỗi chỉ số' }
    ],
    correctAnswers: ['A'],
    explanation: 'ma_so[0] là ký tự đầu tiên: "H". Phép so sánh "H" == "H" là True -> in "HOC SINH".',
    wrongExplanations: {
      B: 'Ký tự đầu đúng là chữ H nên vào nhánh if.',
      C: 'In dòng chữ trong lệnh print.',
      D: 'Chỉ số [0] hoàn toàn hợp lệ.'
    },
    takeaway: 'chuoi[0] lấy ký tự đầu tiên để kiểm tra trong câu lệnh điều kiện if.'
  },
  {
    id: 'if_026',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'discount_calculator',
    conceptNameVi: 'Tính toán giảm giá phân tầng',
    type: 'single',
    code: `tong_tien = 500000

if tong_tien >= 1000000:
    giam = 0.2
elif tong_tien >= 400000:
    giam = 0.1
else:
    giam = 0

print("Giam:", giam)`,
    question: 'Mức giảm giá in ra là bao nhiêu?',
    options: [
      { id: 'A', text: 'Giam: 0.1' },
      { id: 'B', text: 'Giam: 0.2' },
      { id: 'Giam: 0', text: 'Giam: 0' },
      { id: 'D', text: 'Giam: 50000' }
    ],
    correctAnswers: ['A'],
    explanation: '500.000 < 1.000.000 (bỏ qua if). Tiếp tục: 500.000 >= 400.000 là True -> giam = 0.1 (10%). In ra "Giam: 0.1".',
    wrongExplanations: {
      B: 'Chưa đủ 1 triệu để được giảm 0.2.',
      C: 'Đã đạt trên 400.000 nên được giảm 0.1 chứ không phải 0.',
      D: 'In giá trị biến giam là 0.1.'
    },
    takeaway: 'Dùng if-elif để xác định các mức hệ số, sau đó áp dụng vào tính toán.'
  },
  {
    id: 'if_027',
    game: 'ifmaze',
    difficulty: 2,
    concept: 'zero_is_falsey_concept',
    conceptNameVi: 'So sánh số với 0',
    type: 'single',
    code: `so_luong = 0

if so_luong > 0:
    print("CON HANG")
else:
    print("HET HANG")`,
    question: 'Cửa nào sẽ được chọn?',
    options: [
      { id: 'A', text: '🚪 Cửa HET HANG' },
      { id: 'B', text: '🚪 Cửa CON HANG' },
      { id: 'C', text: '0' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: '0 > 0 là False (0 không lớn hơn 0). Python nhảy vào else và in "HET HANG".',
    wrongExplanations: {
      B: '0 không lớn hơn 0, nếu muốn tính cả 0 phải dùng >=.',
      C: 'In chữ trong lệnh print.',
      D: 'Code chuẩn.'
    },
    takeaway: '0 > 0 luôn là False. Muốn bao gồm số 0 phải dùng dấu >= 0.'
  },
  {
    id: 'if_028',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'boolean_flags_combo',
    conceptNameVi: 'Kết hợp cờ hiệu (Flag combination)',
    type: 'single',
    code: `co_wifi = True
co_pin = False

if co_wifi or co_pin:
    if co_wifi and not co_pin:
        print("DUNG TAM WIFI, CAN SAC PIN")
    else:
        print("HOAT DONG TOT")
else:
    print("TAT MAY")`,
    question: 'Thiết bị sẽ báo trạng thái nào?',
    options: [
      { id: 'A', text: '🚪 Cửa DUNG TAM WIFI, CAN SAC PIN' },
      { id: 'B', text: '🚪 Cửa HOAT DONG TOT' },
      { id: 'C', text: '🚪 Cửa TAT MAY' },
      { id: 'D', text: 'Lỗi logic' }
    ],
    correctAnswers: ['A'],
    explanation: 'co_wifi or co_pin = True or False = True (vào trong). Tiếp tục: True and not False = True and True = True -> in "DUNG TAM WIFI, CAN SAC PIN".',
    wrongExplanations: {
      B: 'Điều kiện if con bên trong đã thỏa mãn.',
      C: 'Có wifi nên không rơi vào else ngoài cùng.',
      D: 'Các bước logic chạy hoàn toàn thông suốt.'
    },
    takeaway: 'Chia nhỏ logic phức tạp thành các tầng if giúp code dễ kiểm soát hơn.'
  },
  {
    id: 'if_029',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'max_of_three_manual',
    conceptNameVi: 'Thuật toán tìm số lớn nhất dùng if',
    type: 'single',
    code: `a = 15
b = 22
c = 9

max_val = a
if b > max_val:
    max_val = b
if c > max_val:
    max_val = c

print("Max la:", max_val)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: 'Max la: 22' },
      { id: 'B', text: 'Max la: 15' },
      { id: 'C', text: 'Max la: 9' },
      { id: 'D', text: 'Max la: c' }
    ],
    correctAnswers: ['A'],
    explanation: 'Ban đầu max_val = 15. Kiểm tra b (22 > 15: True) -> max_val đổi thành 22. Kiểm tra c (9 > 22: False) -> max_val giữ nguyên 22.',
    wrongExplanations: {
      B: '15 đã bị 22 vượt qua.',
      C: '9 là số nhỏ nhất.',
      D: 'In giá trị của biến max_val.'
    },
    takeaway: 'Đây là thuật toán kinh điển tìm giá trị lớn nhất: giả sử số đầu là lớn nhất, rồi lần lượt so sánh với các số còn lại.'
  },
  {
    id: 'if_030',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'negative_check',
    conceptNameVi: 'Kiểm tra số âm, dương hay số không',
    type: 'single',
    code: `x = 0

if x > 0:
    print("DUONG")
elif x < 0:
    print("AM")
else:
    print("SO KHONG")`,
    question: 'Với x = 0, Python sẽ in ra gì?',
    options: [
      { id: 'A', text: '🚪 Cửa SO KHONG' },
      { id: 'B', text: '🚪 Cửa DUONG' },
      { id: 'C', text: '🚪 Cửa AM' },
      { id: 'D', text: '0' }
    ],
    correctAnswers: ['A'],
    explanation: '0 > 0 (False) -> 0 < 0 (False) -> Vào nhánh else: in "SO KHONG".',
    wrongExplanations: {
      B: '0 không phải là số dương.',
      C: '0 không phải là số âm.',
      D: 'In dòng chữ mô tả trong print.'
    },
    takeaway: 'Cấu trúc if-elif-else phân loại hoàn hảo 3 tập hợp: số dương, số âm và số 0.'
  },
  {
    id: 'if_031',
    game: 'ifmaze',
    difficulty: 2,
    concept: 'multiple_independent_ifs',
    conceptNameVi: 'Nhiều lệnh if độc lập liên tiếp',
    type: 'single',
    code: `diem = 10

if diem > 5:
    print("QUA MON")
if diem == 10:
    print("DIEM TUYET DOI")`,
    question: 'Chương trình trên sẽ in ra bao nhiêu dòng chữ?',
    options: [
      { id: 'A', text: 'In cả 2 dòng: QUA MON và DIEM TUYET DOI' },
      { id: 'B', text: 'Chỉ in dòng đầu tiên: QUA MON' },
      { id: 'C', text: 'Chỉ in dòng thứ hai: DIEM TUYET DOI' },
      { id: 'D', text: 'Không in gì' }
    ],
    correctAnswers: ['A'],
    explanation: 'Vì đây là 2 lệnh if ĐỘC LẬP (không dùng elif/else), Python sẽ kiểm tra cả hai. Cả hai điều kiện đều đúng nên in cả 2 dòng.',
    wrongExplanations: {
      B: 'Nếu dùng elif thì mới dừng sau lệnh đầu, ở đây là 2 lệnh if riêng biệt!',
      C: 'Lệnh if đầu tiên vẫn được thực hiện bình thường.',
      D: 'Cả hai điều kiện đều đúng.'
    },
    takeaway: 'Các câu lệnh if độc lập sẽ luôn được kiểm tra lần lượt, khác với chuỗi if-elif.'
  },
  {
    id: 'if_032',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'string_length_threshold',
    conceptNameVi: 'Kiểm tra mật khẩu đủ 6 ký tự',
    type: 'single',
    code: `mk = "abc"

if len(mk) >= 6:
    print("MAT KHAU MANH")
else:
    print("MAT KHAU QUA NGAN")`,
    question: 'Mật khẩu "abc" sẽ dẫn đến cửa nào?',
    options: [
      { id: 'A', text: '🚪 Cửa MAT KHAU QUA NGAN' },
      { id: 'B', text: '🚪 Cửa MAT KHAU MANH' },
      { id: 'C', text: '3' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'len("abc") = 3. 3 >= 6 là False -> Rẽ vào nhánh else: in "MAT KHAU QUA NGAN".',
    wrongExplanations: {
      B: '"abc" mới có 3 ký tự, chưa đủ 6 ký tự.',
      C: '3 là độ dài, chương trình in chuỗi cảnh báo.',
      D: 'Code chạy tốt.'
    },
    takeaway: 'Dùng len(chuoi) >= n để xác thực độ dài tối thiểu của dữ liệu nhập vào.'
  },
  {
    id: 'if_033',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'triangle_validity',
    conceptNameVi: 'Kiểm tra bất đẳng thức tam giác',
    type: 'single',
    code: `a = 3
b = 4
c = 5

if a + b > c and a + c > b and b + c > a:
    print("TAO THANH TAM GIAC")
else:
    print("KHONG PHAI TAM GIAC")`,
    question: 'Ba cạnh 3, 4, 5 sẽ in ra thông báo nào?',
    options: [
      { id: 'A', text: '🚪 Cửa TAO THANH TAM GIAC' },
      { id: 'B', text: '🚪 Cửa KHONG PHAI TAM GIAC' },
      { id: 'C', text: '12' },
      { id: 'D', text: 'Lỗi toán học' }
    ],
    correctAnswers: ['A'],
    explanation: '3+4=7>5 (True), 3+5=8>4 (True), 4+5=9>3 (True). Thỏa mãn bất đẳng thức tam giác -> in "TAO THANH TAM GIAC".',
    wrongExplanations: {
      B: '3, 4, 5 là bộ 3 cạnh tam giác vuông chuẩn (Pythagoras).',
      C: '12 là chu vi.',
      D: 'Điều kiện toán học áp dụng hoàn hảo trong code.'
    },
    takeaway: 'Lập trình có thể kiểm tra các quy luật hình học và toán học bằng toán tử and.'
  },
  {
    id: 'if_034',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'boolean_algebra_de_morgan',
    conceptNameVi: 'Phủ định của phép and: not (A and B)',
    type: 'single',
    code: `co_tien = True
co_thoi_gian = False

if not (co_tien and co_thoi_gian):
    print("CHUA DI DU LICH DUOC")
else:
    print("XACH BALO LEN VA DI")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa CHUA DI DU LICH DUOC' },
      { id: 'B', text: '🚪 Cửa XACH BALO LEN VA DI' },
      { id: 'C', text: 'False' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: '(co_tien and co_thoi_gian) = (True and False) = False. Phủ định not (False) = True -> in "CHUA DI DU LICH DUOC".',
    wrongExplanations: {
      B: 'Vì thiếu thời gian (co_thoi_gian = False) nên chưa đi được.',
      C: 'In nội dung chữ trong print.',
      D: 'Cú pháp ngoặc và not hoàn toàn đúng.'
    },
    takeaway: 'not (A and B) có nghĩa là: "chỉ cần thiếu một trong hai điều kiện là kích hoạt".'
  },
  {
    id: 'if_035',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'list_equality',
    conceptNameVi: 'So sánh hai danh sách bằng ==',
    type: 'single',
    code: `ds1 = [1, 2, 3]
ds2 = [1, 2, 3]

if ds1 == ds2:
    print("HAI DANH SACH GIONG HET NHAU")
else:
    print("KHAC NHAU")`,
    question: 'Màn hình sẽ hiển thị kết quả nào?',
    options: [
      { id: 'A', text: '🚪 Cửa HAI DANH SACH GIONG HET NHAU' },
      { id: 'B', text: '🚪 Cửa KHAC NHAU' },
      { id: 'C', text: 'Lỗi không so sánh được danh sách' },
      { id: 'D', text: 'True' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python, toán tử == so sánh giá trị từng phần tử của 2 danh sách. Vì các phần tử và thứ tự giống hệt nhau nên kết quả là True.',
    wrongExplanations: {
      B: 'Hai danh sách có cùng độ dài và cùng các giá trị theo thứ tự.',
      C: 'Python hỗ trợ so sánh danh sách bằng == rất trực quan.',
      D: 'In chuỗi kết quả.'
    },
    takeaway: 'ds1 == ds2 trả về True khi hai danh sách có các phần tử giống hệt nhau theo đúng thứ tự.'
  },
  {
    id: 'if_036',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'order_matters_in_list_comparison',
    conceptNameVi: 'Thứ tự phần tử khi so sánh danh sách',
    type: 'single',
    code: `ds1 = [1, 2]
ds2 = [2, 1]

if ds1 == ds2:
    print("BANG NHAU")
else:
    print("KHAC NHAU VI KHAC THU TU")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '🚪 Cửa KHAC NHAU VI KHAC THU TU' },
      { id: 'B', text: '🚪 Cửa BANG NHAU' },
      { id: 'C', text: 'Lỗi' },
      { id: 'D', text: '[1, 2]' }
    ],
    correctAnswers: ['A'],
    explanation: 'Danh sách trong Python có thứ tự. [1, 2] và [2, 1] khác nhau về vị trí các phần tử nên phép so sánh == trả về False -> Rẽ vào else.',
    wrongExplanations: {
      B: 'Dù chứa cùng các con số 1 và 2, nhưng thứ tự khác nhau thì hai danh sách KHÔNG bằng nhau.',
      C: 'So sánh hoàn toàn hợp lệ.',
      D: 'In thông báo trong else.'
    },
    takeaway: 'Danh sách (List) quan tâm đến THỨ TỰ: [1, 2] != [2, 1].'
  },
  {
    id: 'if_037',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'ticket_price_by_age',
    conceptNameVi: 'Tính giá vé theo độ tuổi',
    type: 'single',
    code: `tuoi = 5

if tuoi < 6:
    gia = 0
elif tuoi <= 12:
    gia = 20000
else:
    gia = 50000

print("Gia ve:", gia)`,
    question: 'Em bé 5 tuổi sẽ mua vé với giá bao nhiêu?',
    options: [
      { id: 'A', text: 'Gia ve: 0 (Mien phi)' },
      { id: 'B', text: 'Gia ve: 20000' },
      { id: 'C', text: 'Gia ve: 50000' },
      { id: 'D', text: 'Gia ve: 5' }
    ],
    correctAnswers: ['A'],
    explanation: '5 < 6 là True -> gia = 0 (miễn phí vé cho trẻ em dưới 6 tuổi). In "Gia ve: 0".',
    wrongExplanations: {
      B: 'Từ 6 đến 12 tuổi mới là 20.000đ.',
      C: 'Trên 12 tuổi mới là 50.000đ.',
      D: '0 là giá vé, 5 là tuổi.'
    },
    takeaway: 'Nhánh if đầu tiên xử lý trường hợp đặc biệt (trẻ em dưới 6 tuổi).'
  },
  {
    id: 'if_038',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'multiple_condition_range',
    conceptNameVi: 'Kiểm tra điểm hợp lệ trong thang 0 đến 10',
    type: 'single',
    code: `diem = 12

if diem < 0 or diem > 10:
    print("DIEM KHONG HOP LE")
else:
    print("DIEM HOP LE")`,
    question: 'Với điểm số là 12, Python sẽ in ra dòng nào?',
    options: [
      { id: 'A', text: '🚪 Cửa DIEM KHONG HOP LE' },
      { id: 'B', text: '🚪 Cửa DIEM HOP LE' },
      { id: 'C', text: '12' },
      { id: 'D', text: 'Lỗi cú pháp' }
    ],
    correctAnswers: ['A'],
    explanation: '12 > 10 là True. Phép toán (diem < 0 or diem > 10) = (False or True) = True -> in "DIEM KHONG HOP LE".',
    wrongExplanations: {
      B: '12 vượt quá thang điểm 10 nên không thể là điểm hợp lệ.',
      C: 'In câu thông báo.',
      D: 'Toán tử or hoạt động chuẩn xác.'
    },
    takeaway: 'Công thức "x < min or x > max" là cách kinh điển để phát hiện giá trị vượt ngoài giới hạn cho phép.'
  },
  {
    id: 'if_039',
    game: 'ifmaze',
    difficulty: 3,
    concept: 'divisible_by_both_3_and_5',
    conceptNameVi: 'Kiểm tra chia hết cho cả 3 và 5',
    type: 'single',
    code: `n = 15

if n % 3 == 0 and n % 5 == 0:
    print("CHIA HET CHO CA 3 VA 5")
else:
    print("KHONG CHIA HET")`,
    question: 'Số 15 sẽ mở ra cánh cửa nào?',
    options: [
      { id: 'A', text: '🚪 Cửa CHIA HET CHO CA 3 VA 5' },
      { id: 'B', text: '🚪 Cửa KHONG CHIA HET' },
      { id: 'C', text: '15' },
      { id: 'D', text: '0' }
    ],
    correctAnswers: ['A'],
    explanation: '15 % 3 == 0 (True) and 15 % 5 == 0 (True). Cả 2 đều chia hết nên in "CHIA HET CHO CA 3 VA 5".',
    wrongExplanations: {
      B: '15 vừa chia hết cho 3 vừa chia hết cho 5.',
      C: 'In câu thông báo.',
      D: 'Điều kiện trả về True.'
    },
    takeaway: 'Để kiểm tra một số chia hết cho cả 2 số, ta dùng toán tử and kết hợp với % == 0.'
  },
  {
    id: 'if_040',
    game: 'ifmaze',
    difficulty: 4,
    concept: 'boss_logic_labyrinth',
    conceptNameVi: 'Mê cung điều kiện tổng hợp cao cấp',
    type: 'single',
    code: `lv = 8
co_chia_khoa = True
mau = 80

if lv >= 5:
    if co_chia_khoa and mau > 50:
        print("CHIEN THANG QUAI VAT")
    else:
        print("CAN THEM TRANG BI")
else:
    print("CAP DO QUA THAP")`,
    question: 'Nhân vật đạt lv 8, có chìa khóa và 80 máu sẽ nhận kết quả gì?',
    options: [
      { id: 'A', text: '🚪 Cửa CHIEN THANG QUAI VAT' },
      { id: 'B', text: '🚪 Cửa CAN THEM TRANG BI' },
      { id: 'C', text: '🚪 Cửa CAP DO QUA THAP' },
      { id: 'D', text: 'Thua cuoc' }
    ],
    correctAnswers: ['A'],
    explanation: 'lv = 8 >= 5 (True -> vào trong). co_chia_khoa (True) and mau = 80 > 50 (True) -> True and True = True -> In "CHIEN THANG QUAI VAT".',
    wrongExplanations: {
      B: 'Đã có cả chìa khóa và đủ trên 50 máu.',
      C: 'Cấp độ 8 đã vượt qua yêu cầu tối thiểu cấp 5.',
      D: 'Nhân vật hoàn toàn đủ điều kiện chiến thắng.'
    },
    takeaway: 'Phối hợp nhịp nhàng giữa if lồng nhau và các toán tử logic and/or giúp tạo nên những kịch bản game hấp dẫn trong Python.'
  }
];
