import type { Question } from '../types.js';

export const BUG_HUNTER_QUESTIONS: Question[] = [
  {
    id: 'bug_001',
    game: 'bug',
    difficulty: 1,
    concept: 'print_parentheses',
    conceptNameVi: 'Thiếu dấu ngoặc trong print',
    bugType: 'Syntax Error',
    type: 'single',
    code: `print "Xin chao"`,
    question: 'Đoạn code trên bị lỗi gì?',
    options: [
      { id: 'A', text: 'Thiếu dấu ngoặc tròn () cho hàm print' },
      { id: 'B', text: 'Thiếu dấu chấm phẩy ở cuối dòng' },
      { id: 'C', text: 'Dùng sai dấu ngoặc kép' },
      { id: 'D', text: 'Không có lỗi nào cả' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python 3, print là một hàm nên bắt buộc phải có dấu ngoặc tròn bao quanh nội dung: print("Xin chao").',
    wrongExplanations: {
      B: 'Python không bắt buộc dấu chấm phẩy ở cuối dòng như C++ hay Pascal.',
      C: 'Dấu ngoặc kép được dùng hoàn toàn đúng cho chuỗi ký tự.',
      D: 'Đây là lỗi SyntaxError rất phổ biến khi chuyển từ Python 2 sang Python 3.'
    },
    takeaway: 'Trong Python 3, lệnh in bắt buộc phải có dạng: print(...)'
  },
  {
    id: 'bug_002',
    game: 'bug',
    difficulty: 2,
    concept: 'input_type_concat',
    conceptNameVi: 'Cộng chuỗi từ input() với số nguyên',
    bugType: 'Type Error',
    type: 'single',
    code: `tuoi = input("Nhap tuoi: ")
nam_sau = tuoi + 1
print(nam_sau)`,
    question: 'Tại sao chương trình trên báo lỗi TypeError?',
    options: [
      { id: 'A', text: 'Hàm input() trả về chuỗi (str), không thể cộng trực tiếp với số nguyên (int)' },
      { id: 'B', text: 'Hàm input() không được chứa câu nhắc trong ngoặc kép' },
      { id: 'C', text: 'Tên biến nam_sau chứa dấu gạch dưới' },
      { id: 'D', text: 'Thiếu dấu hai chấm sau lệnh input' }
    ],
    correctAnswers: ['A'],
    explanation: 'input() luôn trả về chuỗi văn bản. Muốn cộng với số 1, ta phải ép kiểu thành số nguyên bằng int(input(...)).',
    wrongExplanations: {
      B: 'Câu nhắc bên trong input("...") là hoàn toàn hợp lệ và nên dùng.',
      C: 'Tên biến có dấu gạch dưới là chuẩn quy ước của Python (snake_case).',
      D: 'Lệnh gán không cần dấu hai chấm.'
    },
    takeaway: 'Luôn dùng int(input(...)) hoặc float(input(...)) khi muốn nhập dữ liệu số để tính toán.'
  },
  {
    id: 'bug_003',
    game: 'bug',
    difficulty: 2,
    concept: 'if_missing_colon',
    conceptNameVi: 'Thiếu dấu hai chấm ở lệnh if',
    bugType: 'Syntax Error',
    type: 'single',
    code: `diem = 8
if diem >= 5
    print("Dat")`,
    question: 'Dòng lệnh if đang thiếu ký tự quan trọng nào?',
    options: [
      { id: 'A', text: 'Thiếu dấu hai chấm (:) ở cuối dòng if' },
      { id: 'B', text: 'Thiếu từ khóa then' },
      { id: 'C', text: 'Thiếu dấu ngoặc đơn quanh điều kiện' },
      { id: 'D', text: 'Sai toán tử >=' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python, sau điều kiện của if, elif, else bắt buộc phải có dấu hai chấm (:). Cú pháp đúng: if diem >= 5:',
    wrongExplanations: {
      B: 'Python không sử dụng từ khóa then (khác với Pascal).',
      C: 'Python không bắt buộc bọc ngoặc tròn quanh điều kiện if.',
      D: 'Toán tử >= (lớn hơn hoặc bằng) là hoàn toàn chuẩn xác.'
    },
    takeaway: 'Luôn đặt dấu hai chấm (:) ở cuối các câu lệnh điều kiện (if, elif, else) và vòng lặp.'
  },
  {
    id: 'bug_004',
    game: 'bug',
    difficulty: 2,
    concept: 'indentation_error',
    conceptNameVi: 'Lỗi thụt lề (Indentation)',
    bugType: 'Indentation Error',
    type: 'single',
    code: `x = 10
if x > 5:
print("x lon hon 5")`,
    question: 'Lỗi trong đoạn mã trên là gì?',
    options: [
      { id: 'A', text: 'Lệnh print bên trong khối if không được thụt đầu dòng (thụt lề)' },
      { id: 'B', text: 'x phải được khai báo kiểu dữ liệu int x = 10' },
      { id: 'C', text: 'Dấu hai chấm bị đặt thừa' },
      { id: 'D', text: 'Không được so sánh x > 5' }
    ],
    correctAnswers: ['A'],
    explanation: 'Python dùng khoảng cách thụt lề (thường là 4 dấu cách hoặc 1 phím Tab) để xác định khối lệnh bên trong if.',
    wrongExplanations: {
      B: 'Python tự nhận diện kiểu dữ liệu, không cần khai báo int x.',
      C: 'Dấu hai chấm là bắt buộc.',
      D: 'Phép so sánh x > 5 hoàn toàn đúng cú pháp.'
    },
    takeaway: 'Các câu lệnh thuộc khối con của if/else bắt buộc phải thụt lề vào trong.'
  },
  {
    id: 'bug_005',
    game: 'bug',
    difficulty: 2,
    concept: 'assign_instead_of_equal',
    conceptNameVi: 'Nhầm dấu = (gán) với == (so sánh)',
    bugType: 'Syntax Error',
    type: 'single',
    code: `diem = 10
if diem = 10:
    print("Xuat sac")`,
    question: 'Vì sao dòng if diem = 10: bị lỗi cú pháp?',
    options: [
      { id: 'A', text: 'Phải dùng toán tử so sánh == thay vì toán tử gán =' },
      { id: 'B', text: 'Không được so sánh số nguyên' },
      { id: 'C', text: 'Chữ Xuat sac phải dùng ngoặc đơn' },
      { id: 'D', text: 'Thiếu dấu chấm phẩy' }
    ],
    correctAnswers: ['A'],
    explanation: 'Dấu = là phép gán giá trị, còn dấu == mới là phép so sánh bằng. Đúng phải là: if diem == 10:',
    wrongExplanations: {
      B: 'So sánh số nguyên là hoàn toàn bình thường.',
      C: 'Ngoặc kép hay ngoặc đơn đều hợp lệ cho chuỗi.',
      D: 'Python không dùng dấu chấm phẩy.'
    },
    takeaway: '= là để GÁN giá trị, còn == là để SO SÁNH bằng trong điều kiện.'
  },
  {
    id: 'bug_006',
    game: 'bug',
    difficulty: 2,
    concept: 'zero_division',
    conceptNameVi: 'Lỗi chia cho số 0',
    bugType: 'ZeroDivision Error',
    type: 'single',
    code: `a = 10
b = 0
print(a / b)`,
    question: 'Khi chạy đoạn code trên, Python sẽ thông báo lỗi gì?',
    options: [
      { id: 'A', text: 'ZeroDivisionError (Lỗi chia cho số 0)' },
      { id: 'B', text: 'NameError (Chưa định nghĩa biến)' },
      { id: 'C', text: 'TypeError (Sai kiểu dữ liệu)' },
      { id: 'D', text: 'In ra kết quả là 0' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong toán học cũng như trong lập trình, không thể chia một số cho 0. Python sẽ báo lỗi ZeroDivisionError.',
    wrongExplanations: {
      B: 'Cả a và b đều đã được định nghĩa rõ ràng.',
      C: 'a và b đều là số hợp lệ.',
      D: 'Máy tính không thể tính phép chia cho 0 nên không thể in ra 0.'
    },
    takeaway: 'Tuyệt đối không để mẫu số bằng 0 trong bất kỳ phép chia nào (/, //, %).'
  },
  {
    id: 'bug_007',
    game: 'bug',
    difficulty: 2,
    concept: 'undefined_variable',
    conceptNameVi: 'Dùng biến chưa khai báo',
    bugType: 'Name Error',
    type: 'single',
    code: `tong = 50
print(Tong)`,
    question: 'Tại sao dòng print(Tong) gây ra lỗi NameError?',
    options: [
      { id: 'A', text: 'Python phân biệt hoa thường nên biến Tong (viết hoa) chưa được định nghĩa' },
      { id: 'B', text: 'Không được đặt tên biến là tong' },
      { id: 'C', text: 'Số 50 không được gán vào biến' },
      { id: 'D', text: 'Thiếu dấu ngoặc kép quanh chữ Tong' }
    ],
    correctAnswers: ['A'],
    explanation: 'Biến được tạo là "tong" (chữ thường). Lệnh in gọi "Tong" (chữ T viết hoa), Python không tìm thấy biến này nên báo NameError.',
    wrongExplanations: {
      B: 'Tên biến "tong" hoàn toàn hợp lệ.',
      C: 'Gán tong = 50 là đúng chuẩn.',
      D: 'Nếu thêm ngoặc kép nó sẽ in ra chữ "Tong", nhưng ở đây mục đích là in giá trị biến số.'
    },
    takeaway: 'Phải viết tên biến chính xác từng chữ hoa chữ thường giống như lúc khai báo.'
  },
  {
    id: 'bug_008',
    game: 'bug',
    difficulty: 3,
    concept: 'invalid_var_name_number',
    conceptNameVi: 'Tên biến bắt đầu bằng chữ số',
    bugType: 'Syntax Error',
    type: 'single',
    code: `1hoc_sinh = "Nam"
print(1hoc_sinh)`,
    question: 'Tên biến 1hoc_sinh vi phạm quy tắc đặt tên nào của Python?',
    options: [
      { id: 'A', text: 'Tên biến không được bắt đầu bằng chữ số' },
      { id: 'B', text: 'Tên biến không được chứa chữ cái' },
      { id: 'C', text: 'Tên biến phải viết hoa toàn bộ' },
      { id: 'D', text: 'Tên biến không được có dấu gạch dưới' }
    ],
    correctAnswers: ['A'],
    explanation: 'Quy tắc đặt tên biến trong Python: Chỉ gồm chữ cái, chữ số và dấu gạch dưới, nhưng KHÔNG ĐƯỢC bắt đầu bằng chữ số.',
    wrongExplanations: {
      B: 'Tên biến bắt buộc cần có chữ cái để dễ hiểu.',
      C: 'Tên biến không bắt buộc viết hoa.',
      D: 'Dấu gạch dưới _ hoàn toàn được phép dùng trong tên biến.'
    },
    takeaway: 'Tên biến hợp lệ không được bắt đầu bằng số (ví dụ đúng: hoc_sinh1 hoặc hs_1).'
  },
  {
    id: 'bug_009',
    game: 'bug',
    difficulty: 3,
    concept: 'unclosed_string',
    conceptNameVi: 'Chuỗi chưa đóng ngoặc kép',
    bugType: 'Syntax Error',
    type: 'single',
    code: `print("Chuc mung nam moi)`,
    question: 'Lỗi cú pháp nào đang xảy ra ở dòng lệnh trên?',
    options: [
      { id: 'A', text: 'Thiếu dấu ngoặc kép đóng chuỗi ở cuối' },
      { id: 'B', text: 'Thiếu dấu phẩy' },
      { id: 'C', text: 'Tiếng Việt không được dùng trong print' },
      { id: 'D', text: 'Thừa dấu ngoặc tròn' }
    ],
    correctAnswers: ['A'],
    explanation: 'Mở chuỗi bằng dấu ngoặc kép " thì bắt buộc phải đóng chuỗi bằng dấu ngoặc kép " tương ứng: print("Chuc mung nam moi").',
    wrongExplanations: {
      B: 'Không cần dấu phẩy khi chỉ in một chuỗi đơn.',
      C: 'Python 3 hỗ trợ in văn bản Unicode (kể cả tiếng Việt) rất tốt.',
      D: 'Dấu ngoặc tròn là bắt buộc cho hàm print.'
    },
    takeaway: 'Mỗi dấu mở ngoặc kép " hoặc mở ngoặc đơn \' phải có dấu đóng tương ứng đi kèm.'
  },
  {
    id: 'bug_010',
    game: 'bug',
    difficulty: 3,
    concept: 'keyword_as_variable',
    conceptNameVi: 'Dùng từ khóa Python làm tên biến',
    bugType: 'Syntax Error',
    type: 'single',
    code: `if = 10
print(if)`,
    question: 'Tại sao không thể đặt tên biến là if = 10?',
    options: [
      { id: 'A', text: 'if là từ khóa dành riêng cho câu lệnh điều kiện của Python' },
      { id: 'B', text: 'Tên biến quá ngắn' },
      { id: 'C', text: 'Không được gán số 10' },
      { id: 'D', text: 'Phải viết là IF' }
    ],
    correctAnswers: ['A'],
    explanation: 'Các từ khóa như if, else, for, while, print... là từ khóa riêng của Python, không được dùng làm tên biến.',
    wrongExplanations: {
      B: 'Tên biến 1 chữ cái như x, y, a vẫn hợp lệ, nhưng if là từ khóa cấm.',
      C: 'Gán số 10 vào biến là bình thường.',
      D: 'Dù IF viết hoa có thể chạy được nhưng không nên đặt tên gây nhầm lẫn.'
    },
    takeaway: 'Không đặt tên biến trùng với các từ khóa của ngôn ngữ Python (if, else, while, for, and, or...).'
  },
  {
    id: 'bug_011',
    game: 'bug',
    difficulty: 3,
    concept: 'list_index_out_of_range',
    conceptNameVi: 'Chỉ số danh sách vượt quá giới hạn',
    bugType: 'Logic Error',
    type: 'single',
    code: `ds = [10, 20, 30]
print(ds[3])`,
    question: 'Tại sao lệnh print(ds[3]) gây ra lỗi IndexError?',
    options: [
      { id: 'A', text: 'Danh sách có 3 phần tử thì chỉ số chỉ từ 0 đến 2, không có chỉ số 3' },
      { id: 'B', text: 'Danh sách phải dùng ngoặc tròn thay vì ngoặc vuông' },
      { id: 'C', text: 'Không thể in phần tử trong danh sách' },
      { id: 'D', text: 'Phải dùng ds(3)' }
    ],
    correctAnswers: ['A'],
    explanation: 'ds có 3 phần tử: ds[0]=10, ds[1]=20, ds[2]=30. Chỉ số 3 vượt ra ngoài phạm vi nên bị IndexError: list index out of range.',
    wrongExplanations: {
      B: 'Danh sách trong Python bắt buộc dùng ngoặc vuông [].',
      C: 'In phần tử qua chỉ số là cách làm chuẩn.',
      D: 'Truy xuất phần tử danh sách phải dùng ngoặc vuông ds[...], không dùng ngoặc tròn.'
    },
    takeaway: 'Với danh sách có n phần tử, chỉ số hợp lệ chỉ chạy từ 0 đến n - 1.'
  },
  {
    id: 'bug_012',
    game: 'bug',
    difficulty: 2,
    concept: 'string_int_concat_error',
    conceptNameVi: 'Cộng chuỗi với số nguyên bằng dấu +',
    bugType: 'Type Error',
    type: 'single',
    code: `ten = "Linh"
tuoi = 14
print("Ban " + ten + " co tuoi la " + tuoi)`,
    question: 'Lỗi TypeError xảy ra vì nguyên nhân nào?',
    options: [
      { id: 'A', text: 'Dấu + không thể trực tiếp nối chuỗi với số nguyên tuoi (cần dùng str(tuoi) hoặc dấu phẩy)' },
      { id: 'B', text: 'Tên biến ten không hợp lệ' },
      { id: 'C', text: 'Dấu ngoặc kép bị thừa' },
      { id: 'D', text: 'Lệnh print chỉ in được 1 biến' }
    ],
    correctAnswers: ['A'],
    explanation: 'Toán tử + chỉ nối chuỗi với chuỗi. Biến tuoi là số nguyên nên phải chuyển thành chuỗi bằng str(tuoi) hoặc dùng dấu phẩy trong print.',
    wrongExplanations: {
      B: 'Biến ten hoàn toàn hợp lệ.',
      C: 'Các dấu ngoặc kép đều đúng cú pháp.',
      D: 'print() có thể in vô số biến nếu cách nhau bằng dấu phẩy.'
    },
    takeaway: 'Muốn nối chuỗi với số bằng dấu +, phải bọc số trong hàm str(so).'
  },
  {
    id: 'bug_013',
    game: 'bug',
    difficulty: 3,
    concept: 'else_with_condition',
    conceptNameVi: 'Dùng điều kiện sau từ khóa else',
    bugType: 'Syntax Error',
    type: 'single',
    code: `x = 5
if x > 10:
    print("Lon hon 10")
else x <= 10:
    print("Nho hon hoac bang 10")`,
    question: 'Dòng lệnh else đang mắc lỗi cú pháp gì?',
    options: [
      { id: 'A', text: 'else không được kèm theo điều kiện (nếu muốn có điều kiện phải dùng elif)' },
      { id: 'B', text: 'else phải viết hoa thành ELSE' },
      { id: 'C', text: 'Điều kiện phải để trong ngoặc nhọn {}' },
      { id: 'D', text: 'Dấu <= bị sai' }
    ],
    correctAnswers: ['A'],
    explanation: 'Cú pháp của else chỉ là "else:" (xử lý mọi trường hợp còn lại). Nếu muốn kiểm tra thêm điều kiện, phải dùng "elif x <= 10:".',
    wrongExplanations: {
      B: 'Từ khóa Python luôn viết bằng chữ thường.',
      C: 'Python không dùng ngoặc nhọn cho điều kiện.',
      D: 'Toán tử <= là hợp lệ, nhưng else không được chứa điều kiện.'
    },
    takeaway: 'else luôn đứng một mình kèm dấu hai chấm (else:). Có điều kiện phải dùng elif.'
  },
  {
    id: 'bug_014',
    game: 'bug',
    difficulty: 3,
    concept: 'unmatched_parentheses',
    conceptNameVi: 'Đóng mở ngoặc không khớp',
    bugType: 'Syntax Error',
    type: 'single',
    code: `tong = (5 + 3 * (2 + 4)
print(tong)`,
    question: 'Dòng khai báo biến tong bị thiếu ký tự nào?',
    options: [
      { id: 'A', text: 'Thiếu một dấu đóng ngoặc tròn )' },
      { id: 'B', text: 'Thiếu dấu ngoặc vuông ]' },
      { id: 'C', text: 'Thừa dấu cộng' },
      { id: 'D', text: 'Thiếu dấu nhân' }
    ],
    correctAnswers: ['A'],
    explanation: 'Có 2 dấu mở ngoặc tròn ( nhưng chỉ có 1 dấu đóng ngoặc tròn ). Cần bổ sung thêm ) để biểu thức cân đối: (5 + 3 * (2 + 4)).',
    wrongExplanations: {
      B: 'Biểu thức số học dùng ngoặc tròn, không dùng ngoặc vuông.',
      C: 'Dấu cộng được đặt đúng vị trí.',
      D: 'Phép nhân 3 * ... đã có dấu *.'
    },
    takeaway: 'Số lượng dấu mở ngoặc ( phải luôn bằng số lượng dấu đóng ngoặc ).'
  },
  {
    id: 'bug_015',
    game: 'bug',
    difficulty: 4,
    concept: 'logic_swap_without_temp',
    conceptNameVi: 'Lỗi hoán đổi làm mất dữ liệu',
    bugType: 'Logic Error',
    type: 'single',
    code: `a = 5
b = 10
# Muc tieu: Doi gia tri a va b
a = b
b = a
print(a, b)`,
    question: 'Chương trình in ra "10 10" thay vì "10 5". Lỗi logic ở đây là gì?',
    options: [
      { id: 'A', text: 'Dòng a = b đã ghi đè làm mất giá trị 5 ban đầu của a trước khi kịp gán cho b' },
      { id: 'B', text: 'Python không cho phép hoán đổi giá trị hai biến' },
      { id: 'C', text: 'Dấu = bị hỏng' },
      { id: 'D', text: 'Phải dùng a == b' }
    ],
    correctAnswers: ['A'],
    explanation: 'Khi a = b, a trở thành 10 (mất số 5). Dòng sau b = a tức là b = 10, nên cả hai biến đều là 10. Để sửa, cần biến tạm temp hoặc dùng a, b = b, a.',
    wrongExplanations: {
      B: 'Hoán đổi hoàn toàn làm được nếu dùng biến trung gian hoặc a, b = b, a.',
      C: 'Dấu = thực hiện đúng nhiệm vụ gán giá trị.',
      D: 'a == b là so sánh, không thể đổi giá trị.'
    },
    takeaway: 'Khi đổi chỗ 2 biến, hãy dùng a, b = b, a hoặc lưu giá trị ban đầu vào một biến tạm.'
  },
  {
    id: 'bug_016',
    game: 'bug',
    difficulty: 3,
    concept: 'space_in_variable_name',
    conceptNameVi: 'Tên biến chứa khoảng trắng',
    bugType: 'Syntax Error',
    type: 'single',
    code: `diem toan = 9
print(diem toan)`,
    question: 'Tên biến diem toan bị lỗi gì?',
    options: [
      { id: 'A', text: 'Tên biến không được chứa dấu cách (khoảng trắng)' },
      { id: 'B', text: 'Tên biến phải có dấu ngoặc kép' },
      { id: 'C', text: 'Không được đặt tên biến bằng tiếng Việt' },
      { id: 'D', text: 'Phải viết liền không dấu' }
    ],
    correctAnswers: ['A'],
    explanation: 'Tên biến phải là một từ liền mạch. Thay vì dùng dấu cách, ta dùng dấu gạch dưới: diem_toan = 9.',
    wrongExplanations: {
      B: 'Tên biến không được có dấu ngoặc kép (nếu có sẽ bị hiểu là chuỗi).',
      C: 'Tên biến tiếng Việt không dấu hoàn toàn dùng được.',
      D: 'Dùng dấu gạch dưới diem_toan giúp dễ đọc và hợp lệ.'
    },
    takeaway: 'Không dùng dấu cách trong tên biến. Dùng dấu gạch dưới _ để nối các từ (ví dụ: diem_toan).'
  },
  {
    id: 'bug_017',
    game: 'bug',
    difficulty: 2,
    concept: 'missing_comma_print',
    conceptNameVi: 'Thiếu dấu phẩy ngăn cách trong print',
    bugType: 'Syntax Error',
    type: 'single',
    code: `ten = "Binh"
print("Xin chao" ten)`,
    question: 'Lệnh print trên bị thiếu ký tự nào giữa chuỗi và biến ten?',
    options: [
      { id: 'A', text: 'Thiếu dấu phẩy (,) hoặc toán tử nối chuỗi (+)' },
      { id: 'B', text: 'Thiếu dấu chấm phẩy (;)' },
      { id: 'C', text: 'Thiếu từ khóa in' },
      { id: 'D', text: 'Thiếu dấu ngoặc vuông' }
    ],
    correctAnswers: ['A'],
    explanation: 'Khi in nhiều mục trong hàm print(), các mục bắt buộc phải ngăn cách nhau bằng dấu phẩy: print("Xin chao", ten).',
    wrongExplanations: {
      B: 'Dấu chấm phẩy không dùng để ngăn cách tham số trong hàm.',
      C: 'Từ khóa in dùng trong vòng lặp for, không dùng ở đây.',
      D: 'Hàm dùng dấu ngoặc tròn.'
    },
    takeaway: 'Dùng dấu phẩy , để ngăn cách giữa các giá trị khi in nhiều thứ cùng lúc.'
  },
  {
    id: 'bug_018',
    game: 'bug',
    difficulty: 3,
    concept: 'type_conversion_spelling',
    conceptNameVi: 'Sai chính tả tên hàm chuyển đổi int',
    bugType: 'Name Error',
    type: 'single',
    code: `s = "25"
n = integer(s)
print(n * 2)`,
    question: 'Hàm integer(s) gây ra lỗi NameError vì sao?',
    options: [
      { id: 'A', text: 'Trong Python, tên hàm đúng là int(s), không phải integer(s)' },
      { id: 'B', text: 'Chuỗi "25" không thể đổi thành số' },
      { id: 'C', text: 'Không được nhân với 2' },
      { id: 'D', text: 'Thiếu thư viện math' }
    ],
    correctAnswers: ['A'],
    explanation: 'Tên hàm chuẩn của Python để đổi thành số nguyên là int(). Python không có hàm nào tên là integer().',
    wrongExplanations: {
      B: '"25" hoàn toàn đổi được thành số nguyên 25.',
      C: 'Nhân số nguyên với 2 là hoàn toàn bình thường.',
      D: 'int() là hàm có sẵn (built-in), không cần import thư viện.'
    },
    takeaway: 'Hàm ép kiểu số nguyên trong Python viết tắt là int(), số thực là float(), chuỗi là str().'
  },
  {
    id: 'bug_019',
    game: 'bug',
    difficulty: 4,
    concept: 'wrong_comparison_operator',
    conceptNameVi: 'Dùng sai ký hiệu toán tử so sánh',
    bugType: 'Syntax Error',
    type: 'single',
    code: `x = 10
if x => 10:
    print("Dat yeu cau")`,
    question: 'Toán tử => ở dòng if bị sai như thế nào?',
    options: [
      { id: 'A', text: 'Toán tử lớn hơn hoặc bằng trong Python phải viết là >= chứ không phải =>' },
      { id: 'B', text: 'Không có phép so sánh lớn hơn hoặc bằng' },
      { id: 'C', text: 'Phải viết là greater_than' },
      { id: 'D', text: 'Phải viết là =' }
    ],
    correctAnswers: ['A'],
    explanation: 'Python quy ước dấu so sánh đứng trước, dấu bằng đứng sau: >= (lớn hơn hoặc bằng) và <= (nhỏ hơn hoặc bằng). Ký hiệu => không tồn tại.',
    wrongExplanations: {
      B: 'Python có hỗ trợ đầy đủ >= và <=.',
      C: 'Python dùng ký hiệu toán học >=, không dùng chữ.',
      D: 'Dấu = là phép gán.'
    },
    takeaway: 'Toán tử so sánh luôn có dấu > hoặc < đứng trước dấu bằng =: >= và <=.'
  },
  {
    id: 'bug_020',
    game: 'bug',
    difficulty: 3,
    concept: 'append_assign_none',
    conceptNameVi: 'Gán kết quả của phương thức append()',
    bugType: 'Logic Error',
    type: 'single',
    code: `ds = [1, 2]
ds = ds.append(3)
print(ds)`,
    question: 'Chương trình in ra None thay vì [1, 2, 3]. Tại sao?',
    options: [
      { id: 'A', text: 'Hàm append() chỉnh sửa trực tiếp danh sách và trả về None, không được gán ngược lại ds = ds.append(3)' },
      { id: 'B', text: 'append không thêm được số 3' },
      { id: 'C', text: 'Phải dùng add thay vì append' },
      { id: 'D', text: 'Danh sách bị giới hạn 2 phần tử' }
    ],
    correctAnswers: ['A'],
    explanation: 'Phương thức append() tự động thêm vào danh sách gốc và không trả về giá trị (trả về None). Chỉ cần viết: ds.append(3).',
    wrongExplanations: {
      B: 'append thêm số 3 rất tốt, lỗi do phép gán đè ds = ... làm ds nhận giá trị None.',
      C: 'Danh sách trong Python dùng append(), không dùng add().',
      D: 'Danh sách có thể chứa số lượng phần tử tùy ý.'
    },
    takeaway: 'Chỉ gọi ds.append(x), tuyệt đối không viết ds = ds.append(x).'
  },
  {
    id: 'bug_021',
    game: 'bug',
    difficulty: 2,
    concept: 'math_case_sensitive',
    conceptNameVi: 'Viết hoa tên hàm chuẩn',
    bugType: 'Name Error',
    type: 'single',
    code: `s = "Hello"
print(LEN(s))`,
    question: 'Tại sao dòng print(LEN(s)) gây ra lỗi?',
    options: [
      { id: 'A', text: 'Tên hàm len() phải viết bằng chữ thường, Python không nhận diện hàm LEN()' },
      { id: 'B', text: 'len không áp dụng được cho chuỗi' },
      { id: 'C', text: 's không có độ dài' },
      { id: 'D', text: 'Phải viết là length(s)' }
    ],
    correctAnswers: ['A'],
    explanation: 'Tất cả các hàm chuẩn của Python như print(), len(), input(), int() đều bắt buộc viết bằng chữ thường.',
    wrongExplanations: {
      B: 'len() sinh ra để đo độ dài chuỗi và danh sách.',
      C: 'Chuỗi "Hello" có độ dài là 5.',
      D: 'Trong Python tên hàm là len(), không phải length().'
    },
    takeaway: 'Các hàm có sẵn của Python luôn viết bằng chữ thường: len(), print(), input(), int().'
  },
  {
    id: 'bug_022',
    game: 'bug',
    difficulty: 3,
    concept: 'quotes_mismatch',
    conceptNameVi: 'Mở ngoặc kép nhưng đóng ngoặc đơn',
    bugType: 'Syntax Error',
    type: 'single',
    code: `loi_chao = "Xin chao'`,
    question: 'Dòng gán biến loi_chao bị lỗi cú pháp gì?',
    options: [
      { id: 'A', text: 'Bắt đầu bằng dấu ngoặc kép (") nhưng lại kết thúc bằng dấu ngoặc đơn (\')' },
      { id: 'B', text: 'Không được đặt tên biến là loi_chao' },
      { id: 'C', text: 'Thiếu lệnh in' },
      { id: 'D', text: 'Không được dùng tiếng Việt' }
    ],
    correctAnswers: ['A'],
    explanation: 'Dấu mở và đóng của một chuỗi ký tự phải cùng một loại: hoặc là cặp "..." hoặc là cặp \'...\'.',
    wrongExplanations: {
      B: 'Tên biến loi_chao rất đẹp và đúng quy ước.',
      C: 'Gán biến không bắt buộc phải có lệnh in.',
      D: 'Nội dung chuỗi chứa chữ gì cũng được.'
    },
    takeaway: 'Luôn đóng mở chuỗi bằng cùng một loại dấu ngoặc ("..." hoặc \'...\').'
  },
  {
    id: 'bug_023',
    game: 'bug',
    difficulty: 4,
    concept: 'range_boundary_off_by_one',
    conceptNameVi: 'Lỗi quên cận trên của hàm range()',
    bugType: 'Logic Error',
    type: 'single',
    code: `# Muon in cac so tu 1 den 5
for i in range(1, 5):
    print(i)`,
    question: 'Đoạn code chỉ in ra 1, 2, 3, 4 (thiếu số 5). Làm sao để sửa?',
    options: [
      { id: 'A', text: 'Sửa thành range(1, 6) vì range dừng lại trước cận trên 1 đơn vị' },
      { id: 'B', text: 'Sửa thành range(1, 5, 1)' },
      { id: 'C', text: 'Thêm lệnh print(5) ở cuối' },
      { id: 'D', text: 'Bỏ số 1 đi' }
    ],
    correctAnswers: ['A'],
    explanation: 'range(start, stop) chỉ sinh các số từ start đến stop - 1. Muốn lấy đến số 5, ta phải đặt stop = 6: range(1, 6).',
    wrongExplanations: {
      B: 'Bước nhảy mặc định đã là 1 nên range(1, 5, 1) vẫn chỉ ra 1, 2, 3, 4.',
      C: 'Thêm lệnh rời rạc không giải quyết bản chất của vòng lặp.',
      D: 'Bỏ số 1 thì vòng lặp chạy từ 0 đến 4.'
    },
    takeaway: 'range(a, b) chỉ chạy từ a đến b - 1 (không bao gồm số b).'
  },
  {
    id: 'bug_024',
    game: 'bug',
    difficulty: 3,
    concept: 'misplaced_colon',
    conceptNameVi: 'Đặt sai vị trí dấu hai chấm',
    bugType: 'Syntax Error',
    type: 'single',
    code: `if: x > 5
    print("Lon hon 5")`,
    question: 'Dấu hai chấm đang bị đặt sai ở đâu?',
    options: [
      { id: 'A', text: 'Dấu hai chấm phải nằm ở CUỐI dòng điều kiện (if x > 5:) chứ không nằm ngay sau chữ if' },
      { id: 'B', text: 'Dấu hai chấm phải nằm trước chữ print' },
      { id: 'C', text: 'Phải dùng dấu chấm phẩy thay cho hai chấm' },
      { id: 'D', text: 'Không được có dấu hai chấm' }
    ],
    correctAnswers: ['A'],
    explanation: 'Dấu hai chấm biểu thị sự kết thúc của phần điều kiện và mở đầu cho khối lệnh con, nên nó phải đứng ở cuối dòng: if x > 5:',
    wrongExplanations: {
      B: 'Trước print dùng khoảng cách thụt lề, không dùng dấu hai chấm.',
      C: 'Python không dùng chấm phẩy.',
      D: 'Dấu hai chấm là bắt buộc ở cuối câu điều kiện.'
    },
    takeaway: 'Cấu trúc chuẩn: if <điều_kiện>: (dấu hai chấm luôn nằm ở cuối dòng).'
  },
  {
    id: 'bug_025',
    game: 'bug',
    difficulty: 3,
    concept: 'and_spelling_cap',
    conceptNameVi: 'Viết hoa toán tử logic AND',
    bugType: 'Syntax Error',
    type: 'single',
    code: `x = 7
if x > 5 AND x < 10:
    print("Hop le")`,
    question: 'Tại sao từ khóa AND bị báo lỗi cú pháp?',
    options: [
      { id: 'A', text: 'Trong Python, toán tử logic phải viết chữ thường là "and", không phải "AND"' },
      { id: 'B', text: 'Python dùng ký hiệu && thay cho and' },
      { id: 'C', text: 'Không thể kết hợp 2 điều kiện' },
      { id: 'D', text: 'Thiếu dấu ngoặc nhọn' }
    ],
    correctAnswers: ['A'],
    explanation: 'Các toán tử logic trong Python là and, or, not viết hoàn toàn bằng chữ thường (khác với SQL hay một số ngôn ngữ khác).',
    wrongExplanations: {
      B: 'Python không dùng ký hiệu && (đó là của C++/Java), Python dùng từ tiếng Anh "and".',
      C: 'Kết hợp nhiều điều kiện bằng "and" là hoàn toàn bình thường.',
      D: 'Python không dùng ngoặc nhọn.'
    },
    takeaway: 'Toán tử logic trong Python viết chữ thường: and, or, not.'
  },
  {
    id: 'bug_026',
    game: 'bug',
    difficulty: 2,
    concept: 'special_char_in_var',
    conceptNameVi: 'Tên biến chứa ký tự đặc biệt',
    bugType: 'Syntax Error',
    type: 'single',
    code: `diem-so = 10
print(diem-so)`,
    question: 'Dấu gạch ngang (-) trong tên biến diem-so gây ra lỗi gì?',
    options: [
      { id: 'A', text: 'Python hiểu nhầm dấu gạch ngang là phép trừ (diem trừ so)' },
      { id: 'B', text: 'Tên biến quá dài' },
      { id: 'C', text: 'Số 10 không hợp lệ' },
      { id: 'D', text: 'Không có lỗi gì' }
    ],
    correctAnswers: ['A'],
    explanation: 'Dấu gạch ngang - là toán tử trừ trong Python. Tên biến chỉ được dùng dấu gạch dưới _ (diem_so = 10).',
    wrongExplanations: {
      B: 'Tên biến không bị giới hạn độ dài ngắn như vậy.',
      C: '10 là số nguyên bình thường.',
      D: 'Đây là lỗi SyntaxError thường gặp.'
    },
    takeaway: 'Chỉ dùng dấu gạch dưới _ (underscore) trong tên biến, tuyệt đối không dùng dấu gạch ngang - (hyphen).'
  },
  {
    id: 'bug_027',
    game: 'bug',
    difficulty: 3,
    concept: 'float_string_int_cast',
    conceptNameVi: 'Chuyển chuỗi số thập phân trực tiếp bằng int()',
    bugType: 'Logic Error',
    type: 'single',
    code: `s = "3.14"
n = int(s)
print(n)`,
    question: 'Lệnh int("3.14") gây ra lỗi ValueError vì sao?',
    options: [
      { id: 'A', text: 'Hàm int() không thể trực tiếp chuyển chuỗi chứa số thập phân (phải dùng float(s) trước)' },
      { id: 'B', text: '3.14 không phải là số' },
      { id: 'C', text: 'int chỉ dùng cho số âm' },
      { id: 'D', text: 'Thiếu dấu ngoặc vuông' }
    ],
    correctAnswers: ['A'],
    explanation: 'Chuỗi "3.14" có dấu chấm thập phân nên int() không hiểu được. Phải chuyển bằng float("3.14") hoặc int(float("3.14")).',
    wrongExplanations: {
      B: '3.14 là số thập phân (số thực float).',
      C: 'int dùng được cho cả số âm, số 0 và số dương.',
      D: 'Không liên quan đến ngoặc vuông.'
    },
    takeaway: 'Muốn đổi chuỗi có dấu chấm thập phân thành số, hãy dùng float(chuoi).'
  },
  {
    id: 'bug_028',
    game: 'bug',
    difficulty: 3,
    concept: 'missing_quotes_in_list',
    conceptNameVi: 'Quên dấu ngoặc kép cho chuỗi trong danh sách',
    bugType: 'Name Error',
    type: 'single',
    code: `trai_cay = [Tao, Chuoi, Cam]
print(trai_cay)`,
    question: 'Tại sao danh sách trên gây lỗi NameError: name \'Tao\' is not defined?',
    options: [
      { id: 'A', text: 'Các từ Tao, Chuoi, Cam là chuỗi ký tự nhưng bị quên dấu ngoặc kép ["Tao", "Chuoi", "Cam"]' },
      { id: 'B', text: 'Danh sách không được chứa tên hoa quả' },
      { id: 'C', text: 'Thiếu dấu hai chấm' },
      { id: 'D', text: 'Phải dùng ngoặc tròn' }
    ],
    correctAnswers: ['A'],
    explanation: 'Nếu không có ngoặc kép, Python sẽ tưởng Tao là tên một biến đã tạo từ trước. Khi không tìm thấy biến Tao, Python báo NameError.',
    wrongExplanations: {
      B: 'Danh sách chứa bất kỳ dữ liệu văn bản nào cũng được.',
      C: 'Khai báo danh sách không dùng dấu hai chấm.',
      D: 'Danh sách dùng ngoặc vuông [].'
    },
    takeaway: 'Mọi chuỗi văn bản trong danh sách bắt buộc phải có dấu ngoặc kép hoặc ngoặc đơn.'
  },
  {
    id: 'bug_029',
    game: 'bug',
    difficulty: 4,
    concept: 'infinite_while_logic',
    conceptNameVi: 'Vòng lặp vô tận do quên cập nhật biến đếm',
    bugType: 'Logic Error',
    type: 'single',
    code: `i = 1
while i <= 5:
    print(i)
    # Quen tang bien i`,
    question: 'Chương trình trên sẽ gặp hiện tượng gì khi chạy?',
    options: [
      { id: 'A', text: 'Bị lặp vô tận (in số 1 liên tục không bao giờ dừng) vì giá trị biến i không đổi' },
      { id: 'B', text: 'In ra từ 1 đến 5 rồi dừng' },
      { id: 'C', text: 'Báo lỗi SyntaxError' },
      { id: 'D', text: 'Không in gì cả' }
    ],
    correctAnswers: ['A'],
    explanation: 'Vì không có lệnh i = i + 1 bên trong vòng lặp, i luôn bằng 1, điều kiện 1 <= 5 luôn đúng -> tạo thành vòng lặp vô tận làm đơ chương trình.',
    wrongExplanations: {
      B: 'i không tự tăng lên nếu người lập trình không viết lệnh tăng.',
      C: 'Cú pháp hoàn toàn đúng, đây là lỗi tư duy logic (Logic Error).',
      D: 'Nó sẽ in liên tục số 1 ra màn hình.'
    },
    takeaway: 'Trong vòng lặp while, luôn nhớ cập nhật biến điều kiện (ví dụ: i += 1) để vòng lặp có điểm dừng.'
  },
  {
    id: 'bug_030',
    game: 'bug',
    difficulty: 3,
    concept: 'elif_spelling',
    conceptNameVi: 'Viết sai cú pháp elif (nhầm sang else if)',
    bugType: 'Syntax Error',
    type: 'single',
    code: `diem = 7
if diem >= 8:
    print("Gioi")
else if diem >= 6.5:
    print("Kha")`,
    question: 'Từ khóa "else if" ở dòng 4 bị sai trong Python. Cú pháp đúng là gì?',
    options: [
      { id: 'A', text: 'elif (viết tắt của else if)' },
      { id: 'B', text: 'elseif (viết liền)' },
      { id: 'C', text: 'then if' },
      { id: 'D', text: 'or if' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python, nhánh rẽ phụ có điều kiện được viết tắt gọn gàng là "elif" (không dùng "else if" như C/C++ hay JavaScript).',
    wrongExplanations: {
      B: 'Python không dùng elseif (không có chữ e ở giữa), từ khóa chuẩn là elif.',
      C: 'Python không có từ khóa then if.',
      D: 'or if không phải là cú pháp điều kiện.'
    },
    takeaway: 'Trong Python, "else if" được viết thành một từ khóa duy nhất là "elif".'
  },
  {
    id: 'bug_031',
    game: 'bug',
    difficulty: 2,
    concept: 'comment_symbol',
    conceptNameVi: 'Dùng sai ký hiệu ghi chú (comment)',
    bugType: 'Syntax Error',
    type: 'single',
    code: `// Day la chu thich
x = 10
print(x)`,
    question: 'Ký hiệu // để chú thích bị lỗi cú pháp. Ký hiệu chú thích đúng của Python là gì?',
    options: [
      { id: 'A', text: 'Dấu thăng #' },
      { id: 'B', text: 'Dấu gạch chéo /* */' },
      { id: 'C', text: 'Dấu chấm phẩy ;' },
      { id: 'D', text: 'Dấu gạch ngang --' }
    ],
    correctAnswers: ['A'],
    explanation: 'Python dùng dấu thăng # cho chú thích trên 1 dòng. Ký hiệu // trong Python là phép chia lấy phần nguyên chứ không phải chú thích.',
    wrongExplanations: {
      B: '/* */ là chú thích của C/C++/Java, không dùng trong Python.',
      C: 'Dấu chấm phẩy không phải chú thích trong Python.',
      D: '-- là chú thích của SQL.'
    },
    takeaway: 'Dùng dấu thăng # để viết ghi chú (comment) giải thích mã nguồn trong Python.'
  },
  {
    id: 'bug_032',
    game: 'bug',
    difficulty: 3,
    concept: 'str_multiplication_with_float',
    conceptNameVi: 'Nhân chuỗi với số thực',
    bugType: 'Type Error',
    type: 'single',
    code: `s = "Hello"
print(s * 2.5)`,
    question: 'Tại sao phép tính s * 2.5 gây ra lỗi TypeError?',
    options: [
      { id: 'A', text: 'Chuỗi chỉ có thể nhân với số nguyên (int), không thể nhân với số thực (float)' },
      { id: 'B', text: 'Chuỗi không thể nhân với bất kỳ số nào' },
      { id: 'C', text: '2.5 phải đổi thành chuỗi' },
      { id: 'D', text: 'Thiếu dấu cộng' }
    ],
    correctAnswers: ['A'],
    explanation: 'Ta có thể lặp lại chuỗi 2 lần hoặc 3 lần, nhưng không thể lặp lại 2.5 lần. Vì vậy Python cấm nhân chuỗi với số thực float.',
    wrongExplanations: {
      B: 'Chuỗi hoàn toàn nhân được với số nguyên dương để lặp lại.',
      C: 'Nếu đổi thành chuỗi thì phép * giữa 2 chuỗi cũng sẽ báo lỗi.',
      D: 'Phép nhân chuỗi chỉ chấp nhận số nguyên int.'
    },
    takeaway: 'Phép nhân chuỗi chỉ hợp lệ khi nhân với số NGUYÊN (int).'
  },
  {
    id: 'bug_033',
    game: 'bug',
    difficulty: 3,
    concept: 'list_remove_nonexistent',
    conceptNameVi: 'Xóa phần tử không tồn tại trong danh sách',
    bugType: 'Logic Error',
    type: 'single',
    code: `ds = ["Toan", "Van"]
ds.remove("Tin")
print(ds)`,
    question: 'Lệnh ds.remove("Tin") gây ra lỗi ValueError vì sao?',
    options: [
      { id: 'A', text: 'Phần tử "Tin" không tồn tại trong danh sách nên không thể xóa' },
      { id: 'B', text: 'remove chỉ xóa được số, không xóa được chữ' },
      { id: 'C', text: 'Phải dùng delete thay cho remove' },
      { id: 'D', text: 'Danh sách không được phép xóa phần tử' }
    ],
    correctAnswers: ['A'],
    explanation: 'Phương thức remove(x) tìm và xóa phần tử x đầu tiên. Nếu x không có trong danh sách, Python sẽ báo ValueError: list.remove(x): x not in list.',
    wrongExplanations: {
      B: 'remove() xóa được mọi kiểu dữ liệu miễn là phần tử đó có mặt trong danh sách.',
      C: 'Phương thức chuẩn của List là remove() hoặc pop().',
      D: 'Danh sách trong Python có thể thêm, sửa, xóa thoải mái.'
    },
    takeaway: 'Trước khi dùng remove(x), hãy đảm bảo phần tử x thực sự có trong danh sách (dùng if x in ds:).'
  },
  {
    id: 'bug_034',
    game: 'bug',
    difficulty: 4,
    concept: 'variable_shadowing_builtin',
    conceptNameVi: 'Đặt tên biến trùng tên hàm có sẵn',
    bugType: 'Logic Error',
    type: 'single',
    code: `print = "Ket qua"
print("Xin chao")`,
    question: 'Dòng lệnh thứ hai print("Xin chao") sẽ bị lỗi gì sau khi chạy dòng một?',
    options: [
      { id: 'A', text: 'TypeError: \'str\' object is not callable (vì hàm print đã bị biến chuỗi ghi đè lên)' },
      { id: 'B', text: 'In ra "Ket qua Xin chao"' },
      { id: 'C', text: 'Không bị ảnh hưởng gì' },
      { id: 'D', text: 'Báo lỗi thiếu ngoặc vuông' }
    ],
    correctAnswers: ['A'],
    explanation: 'Khi đặt tên biến print = "Ket qua", ta đã vô tình xóa mất hàm print() chuẩn của Python và thay bằng 1 chuỗi văn bản. Lúc này không thể gọi print() được nữa!',
    wrongExplanations: {
      B: 'print lúc này là một chuỗi, không còn là hàm để in dữ liệu nữa.',
      C: 'Hành động này làm hỏng hoàn toàn lệnh print phía sau.',
      D: 'Đây là lỗi kiểu dữ liệu nghiêm trọng do trùng tên.'
    },
    takeaway: 'Không bao giờ đặt tên biến trùng với tên các hàm chuẩn như print, len, int, str, list...'
  },
  {
    id: 'bug_035',
    game: 'bug',
    difficulty: 3,
    concept: 'mixed_indentation_tabs_spaces',
    conceptNameVi: 'Thụt lề không đồng nhất giữa các dòng',
    bugType: 'Indentation Error',
    type: 'single',
    code: `x = 5
if x > 0:
    print("Duong")
      print("Hop le")`,
    question: 'Khối lệnh trong if bị lỗi thụt lề gì?',
    options: [
      { id: 'A', text: 'Hai lệnh cùng cấp trong một khối if nhưng lại thụt lề không thẳng hàng nhau' },
      { id: 'B', text: 'Lệnh print thứ 2 phải viết hoa' },
      { id: 'C', text: 'Chỉ được viết tối đa 1 dòng lệnh trong if' },
      { id: 'D', text: 'Không có lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'Các câu lệnh nằm trong cùng một khối lệnh con bắt buộc phải có cùng mức thụt lề (thẳng hàng dọc với nhau).',
    wrongExplanations: {
      B: 'print luôn viết thường.',
      C: 'Trong if có thể có bao nhiêu dòng lệnh tùy thích, miễn là thụt lề thẳng hàng.',
      D: 'Python sẽ báo IndentationError: unindent does not match...'
    },
    takeaway: 'Tất cả các dòng lệnh trong cùng một khối bắt buộc phải thụt lề bằng nhau và thẳng hàng.'
  },
  {
    id: 'bug_036',
    game: 'bug',
    difficulty: 2,
    concept: 'string_index_assignment',
    conceptNameVi: 'Cố gắng sửa trực tiếp ký tự của chuỗi',
    bugType: 'Type Error',
    type: 'single',
    code: `s = "Python"
s[0] = "J"
print(s)`,
    question: 'Tại sao dòng s[0] = "J" gây ra lỗi TypeError?',
    options: [
      { id: 'A', text: 'Chuỗi ký tự trong Python là bất biến (immutable), không thể gán sửa từng ký tự như danh sách' },
      { id: 'B', text: 'Chữ J phải viết thường' },
      { id: 'C', text: 'Chỉ số 0 không tồn tại' },
      { id: 'D', text: 'Phải dùng ngoặc đơn s(0)' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python, chuỗi ký tự (str) không cho phép thay đổi từng ký tự qua chỉ số s[i] = ... Muốn sửa chuỗi, ta phải tạo ra một chuỗi mới.',
    wrongExplanations: {
      B: 'Ký tự nào cũng không thể gán sửa trực tiếp vào chuỗi.',
      C: 's[0] chính là ký tự "P" đầu tiên.',
      D: 'Chỉ số luôn dùng ngoặc vuông.'
    },
    takeaway: 'Chuỗi ký tự (string) là bất biến. Không thể dùng s[0] = "..." để sửa ký tự.'
  },
  {
    id: 'bug_037',
    game: 'bug',
    difficulty: 4,
    concept: 'modulo_by_zero',
    conceptNameVi: 'Lỗi chia lấy dư cho số 0',
    bugType: 'ZeroDivision Error',
    type: 'single',
    code: `so = 15
du = so % (5 - 5)
print(du)`,
    question: 'Biểu thức so % (5 - 5) gây ra lỗi gì?',
    options: [
      { id: 'A', text: 'ZeroDivisionError vì (5 - 5) = 0 và không thể chia lấy dư cho 0' },
      { id: 'B', text: 'SyntaxError vì có quá nhiều dấu ngoặc' },
      { id: 'C', text: 'In ra 0' },
      { id: 'D', text: 'In ra 15' }
    ],
    correctAnswers: ['A'],
    explanation: '5 - 5 bằng 0. Phép toán 15 % 0 là phép chia lấy dư cho số 0 nên Python lập tức báo lỗi ZeroDivisionError: integer division or modulo by zero.',
    wrongExplanations: {
      B: 'Cú pháp dấu ngoặc hoàn toàn đúng.',
      C: 'Không thể tính toán khi số chia bằng 0.',
      D: 'Phép toán sẽ bị dừng ngay khi gặp mẫu số 0.'
    },
    takeaway: 'Cả 3 phép toán /, // và % đều tuyệt đối cấm chia cho số 0.'
  },
  {
    id: 'bug_038',
    game: 'bug',
    difficulty: 3,
    concept: 'missing_in_keyword',
    conceptNameVi: 'Thiếu từ khóa in trong vòng lặp for',
    bugType: 'Syntax Error',
    type: 'single',
    code: `for i range(5):
    print(i)`,
    question: 'Dòng lệnh vòng lặp for đang thiếu từ khóa nào?',
    options: [
      { id: 'A', text: 'Thiếu từ khóa "in" giữa i và range(5)' },
      { id: 'B', text: 'Thiếu từ khóa "to"' },
      { id: 'C', text: 'Thiếu dấu chấm phẩy' },
      { id: 'D', text: 'Thiếu dấu ngoặc nhọn' }
    ],
    correctAnswers: ['A'],
    explanation: 'Cấu trúc chuẩn của vòng lặp for trong Python là: for <biến> in <dãy_giá_trị>: (bắt buộc phải có từ khóa "in").',
    wrongExplanations: {
      B: 'Python không dùng từ khóa "to" (đó là cú pháp của Pascal).',
      C: 'Python không dùng dấu chấm phẩy.',
      D: 'Python dùng dấu hai chấm : ở cuối dòng for.'
    },
    takeaway: 'Cấu trúc vòng lặp for luôn có dạng: for i in range(...):'
  },
  {
    id: 'bug_039',
    game: 'bug',
    difficulty: 4,
    concept: 'wrong_variable_case_in_condition',
    conceptNameVi: 'Gõ nhầm chữ hoa thường trong điều kiện if',
    bugType: 'Name Error',
    type: 'single',
    code: `tuoi = 15
if Tuoi >= 18:
    print("Nguoi lon")
else:
    print("Tre em")`,
    question: 'Tại sao chương trình không in ra "Tre em" mà lại báo lỗi NameError: name \'Tuoi\' is not defined?',
    options: [
      { id: 'A', text: 'Vì biến tạo ra là "tuoi" (chữ thường) nhưng điều kiện if lại dùng "Tuoi" (chữ hoa)' },
      { id: 'B', text: 'Số 15 nhỏ hơn 18 nên bị lỗi' },
      { id: 'C', text: 'Cấu trúc else bị sai' },
      { id: 'D', text: 'Lệnh print bị lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'Khi Python chạy đến dòng if Tuoi >= 18, nó tìm biến "Tuoi" nhưng không có, nên dừng chương trình ngay tại đó và báo NameError trước khi kịp chạy đến else.',
    wrongExplanations: {
      B: '15 < 18 chỉ là giá trị số học, không gây ra lỗi dừng chương trình.',
      C: 'Cú pháp else hoàn toàn đúng chuẩn.',
      D: 'Lệnh print đúng cú pháp.'
    },
    takeaway: 'Chỉ cần sai một chữ cái viết hoa hay viết thường, Python sẽ coi đó là một biến hoàn toàn xa lạ.'
  },
  {
    id: 'bug_040',
    game: 'bug',
    difficulty: 4,
    concept: 'logic_order_in_multi_if',
    conceptNameVi: 'Sai thứ tự điều kiện trong thang điểm if-elif',
    bugType: 'Logic Error',
    type: 'single',
    code: `diem = 9.5
# Xep loai: >=9 Xuat sac, >=8 Gioi, >=6.5 Kha
if diem >= 6.5:
    print("Kha")
elif diem >= 8:
    print("Gioi")
elif diem >= 9:
    print("Xuat sac")`,
    question: 'Học sinh đạt 9.5 điểm nhưng chương trình lại in ra "Kha". Lỗi logic ở đây là gì?',
    options: [
      { id: 'A', text: 'Điều kiện 9.5 >= 6.5 thỏa mãn ngay nhánh if đầu tiên, Python bỏ qua tất cả các nhánh elif phía sau' },
      { id: 'B', text: 'Python không hỗ trợ so sánh số thập phân 9.5' },
      { id: 'C', text: 'Chữ Xuat sac phải đặt trong ngoặc đơn' },
      { id: 'D', text: 'Thiếu nhánh else' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong chuỗi if-elif, Python kiểm tra từ trên xuống và DỪNG LẠI ngay khi gặp điều kiện ĐÚNG đầu tiên. Cần sắp xếp điều kiện từ cao xuống thấp (>= 9 trước, rồi mới tới >= 8, >= 6.5).',
    wrongExplanations: {
      B: 'So sánh số thực 9.5 là hoàn toàn bình thường.',
      C: 'Ngoặc kép dùng cho chuỗi là đúng.',
      D: 'Thiếu else không gây ra lỗi logic này.'
    },
    takeaway: 'Khi xếp loại nhiều mức, luôn kiểm tra điều kiện khắt khe nhất (từ cao xuống thấp) trước.'
  }
];
