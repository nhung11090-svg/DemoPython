import { Question } from '../types';

export const CODE_PREDICTOR_QUESTIONS: Question[] = [
  {
    id: 'predict_001',
    game: 'predict',
    difficulty: 1,
    concept: 'print',
    conceptNameVi: 'Lệnh xuất print()',
    type: 'single',
    code: `print("Xin chao Python")`,
    question: 'Màn hình sẽ hiển thị kết quả nào khi chạy lệnh trên?',
    options: [
      { id: 'A', text: 'Xin chao Python' },
      { id: 'B', text: '"Xin chao Python"' },
      { id: 'C', text: 'print(Xin chao Python)' },
      { id: 'D', text: 'Không hiển thị gì cả' }
    ],
    correctAnswers: ['A'],
    explanation: 'Lệnh print() sẽ đưa nội dung bên trong dấu ngoặc kép ra màn hình và tự động bỏ đi dấu ngoặc kép.',
    wrongExplanations: {
      B: 'Dấu ngoặc kép chỉ dùng để báo cho Python biết đây là một chuỗi ký tự, khi in ra màn hình dấu ngoặc kép sẽ không hiển thị.',
      C: 'Từ khóa print là tên hàm, Python chỉ in nội dung truyền vào trong ngoặc tròn.',
      D: 'Lệnh print() luôn xuất dữ liệu ra màn hình.'
    },
    takeaway: 'Lệnh print() dùng để hiển thị dữ liệu văn bản hoặc số ra màn hình.'
  },
  {
    id: 'predict_002',
    game: 'predict',
    difficulty: 1,
    concept: 'arithmetic',
    conceptNameVi: 'Phép toán cộng trừ',
    type: 'single',
    code: `a = 15
b = 5
print(a + b)`,
    question: 'Kết quả in ra màn hình là gì?',
    options: [
      { id: 'A', text: '15 + 5' },
      { id: 'B', text: '20' },
      { id: 'C', text: '155' },
      { id: 'D', text: 'a + b' }
    ],
    correctAnswers: ['B'],
    explanation: 'Python lấy giá trị của a (15) cộng với giá trị của b (5) rồi in kết quả là 20.',
    wrongExplanations: {
      A: 'Khi không có dấu ngoặc kép, Python sẽ tính toán giá trị biểu thức chứ không in nguyên văn.',
      C: 'Đây là phép cộng hai số nguyên (15 + 5 = 20), không phải ghép chuỗi ký tự.',
      D: 'a và b là tên biến, Python sẽ lấy giá trị được lưu bên trong chúng.'
    },
    takeaway: 'Khi truyền biểu thức số học vào print(), Python sẽ tính kết quả trước rồi mới in ra.'
  },
  {
    id: 'predict_003',
    game: 'predict',
    difficulty: 2,
    concept: 'operator_precedence',
    conceptNameVi: 'Thứ tự ưu tiên toán tử',
    type: 'single',
    code: `x = 5
y = 2
print(x + y * 3)`,
    question: 'Python sẽ hiển thị kết quả nào?',
    options: [
      { id: 'A', text: '21' },
      { id: 'B', text: '11' },
      { id: 'C', text: '15' },
      { id: 'D', text: '7' }
    ],
    correctAnswers: ['B'],
    explanation: 'Python thực hiện phép nhân trước phép cộng: y * 3 = 2 * 3 = 6, sau đó x + 6 = 5 + 6 = 11.',
    wrongExplanations: {
      A: 'Có vẻ em đã cộng 5 + 2 = 7 trước rồi mới nhân 3 = 21. Trong Python, nhân chia luôn làm trước cộng trừ!',
      C: 'Có vẻ em chỉ tính 5 * 3.',
      D: 'Có vẻ em chỉ tính x + y = 5 + 2.'
    },
    takeaway: 'Quy tắc thứ tự toán tử trong Python: Nhân (*) và Chia (/) ưu tiên trước Cộng (+) và Trừ (-).'
  },
  {
    id: 'predict_004',
    game: 'predict',
    difficulty: 2,
    concept: 'string_repetition',
    conceptNameVi: 'Phép nhân chuỗi',
    type: 'single',
    code: `tu = "Hi!"
print(tu * 3)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: 'Hi!Hi!Hi!' },
      { id: 'B', text: 'Hi! * 3' },
      { id: 'C', text: 'Lỗi chương trình' },
      { id: 'D', text: 'Hi! 3' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python, khi lấy một chuỗi ký tự nhân với số nguyên n, chuỗi đó sẽ được lặp lại n lần.',
    wrongExplanations: {
      B: 'Python nhận diện dấu * là toán tử lặp chuỗi, không in ký tự *.',
      C: 'Phép nhân chuỗi với số nguyên hoàn toàn hợp lệ trong Python.',
      D: 'Phép nhân chuỗi không tự động chèn thêm số 3 vào sau.'
    },
    takeaway: 'Chuỗi * Số nguyên = Lặp lại chuỗi đó nhiều lần liên tiếp.'
  },
  {
    id: 'predict_005',
    game: 'predict',
    difficulty: 2,
    concept: 'string_concat',
    conceptNameVi: 'Nối chuỗi',
    type: 'single',
    code: `ho = "Nguyen "
ten = "An"
print(ho + ten)`,
    question: 'Màn hình sẽ hiển thị dòng chữ nào?',
    options: [
      { id: 'A', text: 'NguyenAn' },
      { id: 'B', text: 'Nguyen An' },
      { id: 'C', text: 'ho + ten' },
      { id: 'D', text: 'Nguyen + An' }
    ],
    correctAnswers: ['B'],
    explanation: 'Dấu + nối hai chuỗi lại với nhau. Vì chuỗi ho đã có khoảng trắng ở cuối ("Nguyen "), nên kết quả là "Nguyen An".',
    wrongExplanations: {
      A: 'Chuỗi ho có sẵn dấu cách ("Nguyen ") nên giữa chữ Nguyen và An có khoảng trống.',
      C: 'ho và ten là tên biến, Python sẽ lấy nội dung bên trong biến ra ghép lại.',
      D: 'Dấu + thực hiện hành động nối chuỗi, không xuất hiện trong kết quả.'
    },
    takeaway: 'Toán tử + dùng giữa 2 chuỗi sẽ ghép chúng thành một chuỗi duy nhất.'
  },
  {
    id: 'predict_006',
    game: 'predict',
    difficulty: 2,
    concept: 'integer_division',
    conceptNameVi: 'Chia lấy phần nguyên //',
    type: 'single',
    code: `a = 17
b = 5
print(a // b)`,
    question: 'Kết quả in ra là số nào?',
    options: [
      { id: 'A', text: '3.4' },
      { id: 'B', text: '3' },
      { id: 'C', text: '2' },
      { id: 'D', text: '3.0' }
    ],
    correctAnswers: ['B'],
    explanation: 'Toán tử // là phép chia lấy phần nguyên. 17 chia 5 được 3 dư 2, nên kết quả là số nguyên 3.',
    wrongExplanations: {
      A: '3.4 là kết quả của phép chia thực a / b, còn // chỉ lấy phần nguyên.',
      C: '2 là phần dư (kết quả của a % b), không phải phần nguyên.',
      D: 'Khi chia nguyên 2 số nguyên, kết quả trả về là số nguyên int (3).'
    },
    takeaway: '// là phép chia lấy phần nguyên, bỏ qua toàn bộ phần thập phân.'
  },
  {
    id: 'predict_007',
    game: 'predict',
    difficulty: 2,
    concept: 'modulo',
    conceptNameVi: 'Chia lấy phần dư %',
    type: 'single',
    code: `x = 23
y = 4
print(x % y)`,
    question: 'Kết quả của phép chia lấy dư này là gì?',
    options: [
      { id: 'A', text: '5' },
      { id: 'B', text: '3' },
      { id: 'C', text: '5.75' },
      { id: 'D', text: '0' }
    ],
    correctAnswers: ['B'],
    explanation: 'Toán tử % là phép chia lấy số dư. 23 chia 4 được 5 dư 3, nên x % y trả về 3.',
    wrongExplanations: {
      A: '5 là phần nguyên (kết quả của 23 // 4), không phải số dư.',
      C: '5.75 là kết quả phép chia thông thường 23 / 4.',
      D: '23 không chia hết cho 4 nên phần dư không thể bằng 0.'
    },
    takeaway: '% là toán tử lấy số dư trong phép chia số học.'
  },
  {
    id: 'predict_008',
    game: 'predict',
    difficulty: 3,
    concept: 'exponentiation',
    conceptNameVi: 'Phép lũy thừa **',
    type: 'single',
    code: `co_so = 2
so_mu = 4
print(co_so ** so_mu)`,
    question: 'Màn hình sẽ hiển thị kết quả nào?',
    options: [
      { id: 'A', text: '8' },
      { id: 'B', text: '16' },
      { id: 'C', text: '6' },
      { id: 'D', text: '24' }
    ],
    correctAnswers: ['B'],
    explanation: 'Toán tử ** là phép lũy thừa (mũ). 2 ** 4 = 2 * 2 * 2 * 2 = 16.',
    wrongExplanations: {
      A: '8 là kết quả của phép nhân 2 * 4, còn ** là phép nâng lên lũy thừa.',
      C: '6 là kết quả của phép cộng 2 + 4.',
      D: '2 và 4 ghép lại không phải là 24 trong phép toán số học.'
    },
    takeaway: '** là toán tử lũy thừa (a ** b có nghĩa là a mũ b).'
  },
  {
    id: 'predict_009',
    game: 'predict',
    difficulty: 3,
    concept: 'parentheses',
    conceptNameVi: 'Dấu ngoặc tròn trong biểu thức',
    type: 'single',
    code: `a = 4
b = 3
c = 2
print((a + b) * c)`,
    question: 'Giá trị in ra màn hình là bao nhiêu?',
    options: [
      { id: 'A', text: '10' },
      { id: 'B', text: '14' },
      { id: 'C', text: '24' },
      { id: 'D', text: '9' }
    ],
    correctAnswers: ['B'],
    explanation: 'Biểu thức trong ngoặc tròn luôn được tính trước: (a + b) = 4 + 3 = 7, sau đó 7 * 2 = 14.',
    wrongExplanations: {
      A: 'Nếu không có ngoặc, a + b * c = 4 + 6 = 10. Nhưng vì có ngoặc (a + b) nên phép cộng được làm trước!',
      C: 'Có vẻ em đã nhân tất cả các số lại với nhau.',
      D: 'Tính toán chưa chuẩn xác.'
    },
    takeaway: 'Dấu ngoặc tròn () có độ ưu tiên cao nhất, ép Python tính toán bên trong trước.'
  },
  {
    id: 'predict_010',
    game: 'predict',
    difficulty: 3,
    concept: 'multiple_print',
    conceptNameVi: 'In nhiều giá trị với dấu phẩy',
    type: 'single',
    code: `ten = "Luffy"
tuoi = 17
print("Ten:", ten, "Tuoi:", tuoi)`,
    question: 'Kết quả in ra màn hình là gì?',
    options: [
      { id: 'A', text: 'Ten:LuffyTuoi:17' },
      { id: 'B', text: 'Ten: Luffy Tuoi: 17' },
      { id: 'C', text: 'Ten: "Luffy" Tuoi: 17' },
      { id: 'D', text: 'Lỗi vì không thể in chữ và số cùng lúc' }
    ],
    correctAnswers: ['B'],
    explanation: 'Khi dùng dấu phẩy trong lệnh print(), Python tự động thêm một khoảng trắng giữa các giá trị.',
    wrongExplanations: {
      A: 'Lệnh print() khi dùng dấu phẩy sẽ tự động ngăn cách các mục bằng 1 khoảng trắng.',
      C: 'Dấu ngoặc kép của chuỗi ký tự sẽ không được in ra.',
      D: 'Lệnh print() hoàn toàn in được nhiều kiểu dữ liệu cùng lúc khi cách nhau bằng dấu phẩy.'
    },
    takeaway: 'Dấu phẩy trong print() vừa in được nhiều giá trị vừa tự động chèn khoảng trắng ở giữa.'
  },
  {
    id: 'predict_011',
    game: 'predict',
    difficulty: 1,
    concept: 'print_number',
    conceptNameVi: 'In số nguyên',
    type: 'single',
    code: `print(2026)`,
    question: 'Lệnh trên sẽ in ra nội dung gì?',
    options: [
      { id: 'A', text: '2026' },
      { id: 'B', text: '"2026"' },
      { id: 'C', text: 'Lỗi vì thiếu dấu ngoặc kép' },
      { id: 'D', text: '0' }
    ],
    correctAnswers: ['A'],
    explanation: 'Số nguyên có thể in trực tiếp trong print() mà không cần dấu ngoặc kép.',
    wrongExplanations: {
      B: 'Số nguyên in ra không có dấu ngoặc kép.',
      C: 'Số thì không cần ngoặc kép, chỉ có văn bản (chuỗi) mới bắt buộc có ngoặc kép.',
      D: 'Python in chính xác giá trị số được truyền vào.'
    },
    takeaway: 'Số học không cần dấu ngoặc kép khi in ra màn hình.'
  },
  {
    id: 'predict_012',
    game: 'predict',
    difficulty: 2,
    concept: 'string_numbers',
    conceptNameVi: 'Cộng chuỗi số',
    type: 'single',
    code: `a = "10"
b = "20"
print(a + b)`,
    question: 'Kết quả xuất hiện trên màn hình là gì?',
    options: [
      { id: 'A', text: '30' },
      { id: 'B', text: '1020' },
      { id: 'C', text: '10 20' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['B'],
    explanation: 'Vì "10" và "20" nằm trong ngoặc kép nên chúng là CHUỖI. Toán tử + giữa 2 chuỗi sẽ ghép chúng thành "1020".',
    wrongExplanations: {
      A: 'Để ra 30, a và b phải là số (a = 10, b = 20). Ở đây chúng có ngoặc kép nên là văn bản.',
      C: 'Phép ghép chuỗi không tự thêm khoảng trắng ở giữa.',
      D: 'Ghép 2 chuỗi là hoàn toàn hợp lệ.'
    },
    takeaway: '"10" + "20" là ghép chuỗi ("1020"), còn 10 + 20 mới là phép tính số học (30).'
  },
  {
    id: 'predict_013',
    game: 'predict',
    difficulty: 3,
    concept: 'len_function',
    conceptNameVi: 'Hàm đo độ dài len()',
    type: 'single',
    code: `mon_hoc = "Python"
print(len(mon_hoc))`,
    question: 'Màn hình sẽ hiển thị kết quả nào?',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: 'Python' },
      { id: 'C', text: '5' },
      { id: 'D', text: 'mon_hoc' }
    ],
    correctAnswers: ['A'],
    explanation: 'Hàm len() đếm số lượng ký tự trong chuỗi. "P-y-t-h-o-n" có đúng 6 chữ cái.',
    wrongExplanations: {
      B: 'len() trả về số lượng ký tự của chuỗi chứ không in lại chuỗi.',
      C: 'Hãy đếm kỹ lại: P, y, t, h, o, n là 6 ký tự.',
      D: 'len() tính toán giá trị độ dài của biến.'
    },
    takeaway: 'len("chuỗi") trả về độ dài (tổng số ký tự) của chuỗi đó.'
  },
  {
    id: 'predict_014',
    game: 'predict',
    difficulty: 3,
    concept: 'type_function',
    conceptNameVi: 'Kiểu dữ liệu bool',
    type: 'single',
    code: `da_qua_mon = True
print(da_qua_mon)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: '"True"' },
      { id: 'C', text: '1' },
      { id: 'D', text: 'Đúng' }
    ],
    correctAnswers: ['A'],
    explanation: 'True là giá trị logic (Boolean) trong Python, khi in ra màn hình sẽ hiển thị chữ True.',
    wrongExplanations: {
      B: 'Giá trị logic in ra không kèm dấu ngoặc kép.',
      C: 'Mặc dù True tương đương 1 trong phép tính, lệnh print in ra chữ True.',
      D: 'Python dùng tiếng Anh chuẩn cho từ khóa True/False.'
    },
    takeaway: 'True (Đúng) và False (Sai) là hai giá trị thuộc kiểu dữ liệu Boolean.'
  },
  {
    id: 'predict_015',
    game: 'predict',
    difficulty: 4,
    concept: 'nested_arithmetic',
    conceptNameVi: 'Biểu thức phức hợp',
    type: 'single',
    code: `k = 10 - 2 * 3 + 8 // 4
print(k)`,
    question: 'Giá trị của biến k là bao nhiêu?',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: '10' },
      { id: 'C', text: '8' },
      { id: 'D', text: '4' }
    ],
    correctAnswers: ['A'],
    explanation: 'Python tính nhân chia trước: 2 * 3 = 6 và 8 // 4 = 2. Biểu thức thành: 10 - 6 + 2 = 4 + 2 = 6.',
    wrongExplanations: {
      B: 'Hãy cẩn thận thứ tự: nhân (2*3=6) và chia (8//4=2) làm trước, sau đó tính từ trái sang phải: 10 - 6 + 2 = 6.',
      C: 'Có thể em đã cộng 6 + 2 trước rồi lấy 10 trừ đi. Phép cộng và trừ có độ ưu tiên bằng nhau nên tính từ trái sang phải!',
      D: 'Tính toán chưa chuẩn xác các bước.'
    },
    takeaway: 'Các toán tử cùng cấp (+ và -) được thực hiện lần lượt từ trái sang phải.'
  },
  {
    id: 'predict_016',
    game: 'predict',
    difficulty: 2,
    concept: 'negative_numbers',
    conceptNameVi: 'Số âm trong phép tính',
    type: 'single',
    code: `a = -5
b = 3
print(a * b)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '-15' },
      { id: 'B', text: '15' },
      { id: 'C', text: '-2' },
      { id: 'D', text: '-8' }
    ],
    correctAnswers: ['A'],
    explanation: 'Một số âm nhân với một số dương cho kết quả là số âm: (-5) * 3 = -15.',
    wrongExplanations: {
      B: 'Âm nhân dương ra âm, không thể ra dương 15.',
      C: '-2 là kết quả của phép cộng a + b = -5 + 3.',
      D: '-8 là kết quả của a - b = -5 - 3.'
    },
    takeaway: 'Quy tắc dấu trong Python hoàn toàn tuân theo đại số toán học: (-) * (+) = (-).'
  },
  {
    id: 'predict_017',
    game: 'predict',
    difficulty: 3,
    concept: 'print_sep',
    conceptNameVi: 'Tham số sep trong print()',
    type: 'single',
    code: `print("A", "B", "C", sep="-")`,
    question: 'Lệnh trên in ra dòng nào?',
    options: [
      { id: 'A', text: 'A-B-C' },
      { id: 'B', text: 'A B C -' },
      { id: 'C', text: 'A B C' },
      { id: 'D', text: 'ABC-' }
    ],
    correctAnswers: ['A'],
    explanation: 'Tham số sep="-" quy định ký tự ngăn cách giữa các giá trị khi in. Thay vì dấu cách, Python dùng dấu gạch ngang.',
    wrongExplanations: {
      B: 'sep không in ở cuối mà dùng làm dấu phân cách ở giữa các phần tử.',
      C: 'Mặc định sep là dấu cách, nhưng ở đây đã đổi thành "-".',
      D: 'sep nằm giữa mỗi cặp chữ cái.'
    },
    takeaway: 'Tham số sep giúp thay đổi ký tự phân cách giữa các mục trong lệnh print().'
  },
  {
    id: 'predict_018',
    game: 'predict',
    difficulty: 3,
    concept: 'list_index',
    conceptNameVi: 'Chỉ số phần tử trong Danh sách (List)',
    type: 'single',
    code: `trai_cay = ["Tao", "Chuoi", "Cam"]
print(trai_cay[0])`,
    question: 'Màn hình sẽ hiển thị gì?',
    options: [
      { id: 'A', text: 'Tao' },
      { id: 'B', text: 'Chuoi' },
      { id: 'C', text: 'Cam' },
      { id: 'D', text: '0' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python, chỉ số danh sách bắt đầu từ 0. Do đó trai_cay[0] là phần tử đầu tiên: "Tao".',
    wrongExplanations: {
      B: '"Chuoi" nằm ở vị trí số 1 (trai_cay[1]).',
      C: '"Cam" nằm ở vị trí số 2 (trai_cay[2]).',
      D: '[0] là cách chọn phần tử tại vị trí 0, không in số 0.'
    },
    takeaway: 'Chỉ số (index) trong Python luôn đếm từ 0, nên vị trí 0 là phần tử đầu tiên.'
  },
  {
    id: 'predict_019',
    game: 'predict',
    difficulty: 3,
    concept: 'comparison_output',
    conceptNameVi: 'In kết quả phép so sánh',
    type: 'single',
    code: `diem = 9
print(diem >= 8)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: 'diem >= 8' },
      { id: 'D', text: '9' }
    ],
    correctAnswers: ['A'],
    explanation: 'Phép so sánh 9 >= 8 là đúng, vì vậy biểu thức trả về giá trị Boolean là True.',
    wrongExplanations: {
      B: '9 lớn hơn hoặc bằng 8 là sự thật, không thể là False.',
      C: 'Biểu thức so sánh sẽ được Python lượng giá thành True hoặc False.',
      D: 'Lệnh in kết quả của phép so sánh chứ không in lại biến diem.'
    },
    takeaway: 'Phép so sánh (>, <, >=, <=, ==, !=) luôn trả về giá trị True hoặc False.'
  },
  {
    id: 'predict_020',
    game: 'predict',
    difficulty: 4,
    concept: 'string_indexing',
    conceptNameVi: 'Lấy ký tự trong chuỗi',
    type: 'single',
    code: `s = "PYTHON"
print(s[1] + s[4])`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: 'YO' },
      { id: 'B', text: 'PO' },
      { id: 'C', text: 'YN' },
      { id: 'D', text: 'PT' }
    ],
    correctAnswers: ['A'],
    explanation: 'Đếm từ 0: s[0]="P", s[1]="Y", s[2]="T", s[3]="H", s[4]="O", s[5]="N". Vậy s[1] + s[4] = "Y" + "O" = "YO".',
    wrongExplanations: {
      B: 's[0] mới là "P", s[1] là "Y".',
      C: 's[5] mới là "N", s[4] là "O".',
      D: 'Chỉ số 1 là Y và 4 là O.'
    },
    takeaway: 'Ký tự đầu tiên của chuỗi có chỉ số là 0, ký tự thứ hai có chỉ số là 1.'
  },
  {
    id: 'predict_021',
    game: 'predict',
    difficulty: 2,
    concept: 'print_newline',
    conceptNameVi: 'Ký tự xuống dòng \\n',
    type: 'single',
    code: `print("Dong 1\\nDong 2")`,
    question: 'Lệnh trên sẽ in như thế nào?',
    options: [
      { id: 'A', text: 'In Dong 1 và Dong 2 trên 2 dòng riêng biệt' },
      { id: 'B', text: 'Dong 1\\nDong 2 trên cùng 1 dòng' },
      { id: 'C', text: 'Dong 1 nDong 2' },
      { id: 'D', text: 'Lỗi cú pháp' }
    ],
    correctAnswers: ['A'],
    explanation: 'Ký tự đặc biệt \\n đại diện cho phím Enter (xuống dòng mới).',
    wrongExplanations: {
      B: '\\n là mã điều khiển xuống dòng, không in ký tự \\n ra màn hình.',
      C: 'Dấu gạch chéo ngược kết hợp với chữ n tạo thành lệnh xuống dòng.',
      D: 'Đây là cú pháp hợp lệ và rất phổ biến.'
    },
    takeaway: '\\n là ký hiệu đặc biệt để ngắt dòng văn bản.'
  },
  {
    id: 'predict_022',
    game: 'predict',
    difficulty: 3,
    concept: 'float_addition',
    conceptNameVi: 'Phép tính với số thực (float)',
    type: 'single',
    code: `a = 2.5
b = 1.5
print(a + b)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '4.0' },
      { id: 'B', text: '4' },
      { id: 'C', text: '3.10' },
      { id: 'D', text: '2.51.5' }
    ],
    correctAnswers: ['A'],
    explanation: 'Cộng hai số thực (float) 2.5 + 1.5 = 4.0. Python giữ kiểu số thực nên có phần thập phân .0.',
    wrongExplanations: {
      B: 'Khi có sự tham gia của số thực float, Python trả về kết quả kiểu float (4.0).',
      C: 'Cộng số học 0.5 + 0.5 = 1.0, không phải 10.',
      D: 'Đây là số, không phải chuỗi ghép nối.'
    },
    takeaway: 'Phép toán có chứa số thực (float) sẽ cho ra kết quả kiểu số thực (ví dụ 4.0).'
  },
  {
    id: 'predict_023',
    game: 'predict',
    difficulty: 4,
    concept: 'chained_operations',
    conceptNameVi: 'Chuỗi phép gán và tính toán',
    type: 'single',
    code: `n = 20
n = n - 5
n = n * 2
print(n)`,
    question: 'Màn hình sẽ hiển thị số nào?',
    options: [
      { id: 'A', text: '30' },
      { id: 'B', text: '10' },
      { id: 'C', text: '20' },
      { id: 'D', text: '25' }
    ],
    correctAnswers: ['A'],
    explanation: 'Ban đầu n = 20. Dòng 2: n = 20 - 5 = 15. Dòng 3: n = 15 * 2 = 30. Cuối cùng in ra 30.',
    wrongExplanations: {
      B: 'Nếu làm ngược lại nhân trước trừ sau thì 20 - 10 = 10, nhưng code chạy từ trên xuống dưới!',
      C: 'Giá trị n đã bị thay đổi qua các dòng lệnh.',
      D: 'Dòng 3 nhân đôi 15 thành 30 chứ không phải cộng thêm 10.'
    },
    takeaway: 'Chương trình thực thi tuần tự từ trên xuống dưới, giá trị mới sẽ ghi đè lên giá trị cũ.'
  },
  {
    id: 'predict_024',
    game: 'predict',
    difficulty: 3,
    concept: 'equality_check',
    conceptNameVi: 'So sánh bằng ==',
    type: 'single',
    code: `x = 10
y = 10
print(x == y)`,
    question: 'Màn hình sẽ in ra gì?',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: '10' },
      { id: 'D', text: 'x == y' }
    ],
    correctAnswers: ['A'],
    explanation: 'Dấu == dùng để kiểm tra xem hai giá trị có bằng nhau hay không. Vì 10 bằng 10 nên kết quả là True.',
    wrongExplanations: {
      B: 'Hai số 10 hoàn toàn bằng nhau nên không thể ra False.',
      C: '== là phép so sánh logic, trả về True/False chứ không trả về số 10.',
      D: 'Biểu thức so sánh được tính toán thành giá trị Boolean.'
    },
    takeaway: 'Dấu == dùng để so sánh bằng (hỏi "có bằng nhau không?"), trả về True hoặc False.'
  },
  {
    id: 'predict_025',
    game: 'predict',
    difficulty: 4,
    concept: 'not_equal',
    conceptNameVi: 'So sánh khác !=',
    type: 'single',
    code: `a = 7
b = 8
print(a != b)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: '-1' },
      { id: 'D', text: 'Lỗi cú pháp' }
    ],
    correctAnswers: ['A'],
    explanation: '!= có nghĩa là "khác" (không bằng). Vì 7 khác 8 là đúng nên kết quả là True.',
    wrongExplanations: {
      B: '7 thực sự khác 8, nhận định "7 khác 8" là đúng nên trả về True.',
      C: '!= là toán tử so sánh logic, không phải phép trừ.',
      D: '!= là toán tử so sánh hoàn toàn hợp lệ trong Python.'
    },
    takeaway: '!= có nghĩa là "khác nhau" trong Python.'
  },
  {
    id: 'predict_026',
    game: 'predict',
    difficulty: 2,
    concept: 'string_length_spaces',
    conceptNameVi: 'Độ dài chuỗi có khoảng trắng',
    type: 'single',
    code: `s = "Tin hoc 8"
print(len(s))`,
    question: 'Hàm len(s) sẽ trả về bao nhiêu?',
    options: [
      { id: 'A', text: '9' },
      { id: 'B', text: '7' },
      { id: 'C', text: '8' },
      { id: 'D', text: '3' }
    ],
    correctAnswers: ['A'],
    explanation: 'Khoảng trắng cũng được tính là 1 ký tự: "T-i-n" (3) + " " (1) + "h-o-c" (3) + " " (1) + "8" (1) = 9 ký tự.',
    wrongExplanations: {
      B: 'Nếu không đếm 2 dấu cách thì ra 7, nhưng hàm len() đếm TẤT CẢ các ký tự bao gồm cả dấu cách!',
      C: 'Hãy đếm đủ: T, i, n, [cách], h, o, c, [cách], 8 = 9.',
      D: '3 là số từ ngữ, không phải số ký tự.'
    },
    takeaway: 'Khoảng trắng (dấu cách) cũng là một ký tự và được tính vào độ dài chuỗi.'
  },
  {
    id: 'predict_027',
    game: 'predict',
    difficulty: 3,
    concept: 'list_length',
    conceptNameVi: 'Độ dài của Danh sách',
    type: 'single',
    code: `danh_sach = [10, 20, 30, 40]
print(len(danh_sach))`,
    question: 'Màn hình sẽ hiển thị số nào?',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '100' },
      { id: 'C', text: '40' },
      { id: 'D', text: '3' }
    ],
    correctAnswers: ['A'],
    explanation: 'Hàm len() khi áp dụng cho danh sách sẽ đếm tổng số phần tử bên trong. Danh sách có 4 số nên kết quả là 4.',
    wrongExplanations: {
      B: '100 là tổng các số (10+20+30+40), còn len() chỉ đếm số lượng phần tử.',
      C: '40 là giá trị phần tử cuối cùng.',
      D: 'Chỉ số cao nhất là 3, nhưng tổng số phần tử là 4.'
    },
    takeaway: 'len(danh_sach) trả về số lượng phần tử có trong danh sách.'
  },
  {
    id: 'predict_028',
    game: 'predict',
    difficulty: 3,
    concept: 'str_conversion',
    conceptNameVi: 'Hàm chuyển đổi str()',
    type: 'single',
    code: `tuoi = 14
thong_bao = "Tuoi cua em la: " + str(tuoi)
print(thong_bao)`,
    question: 'Kết quả in ra màn hình là gì?',
    options: [
      { id: 'A', text: 'Tuoi cua em la: 14' },
      { id: 'B', text: 'Tuoi cua em la: tuoi' },
      { id: 'C', text: 'Lỗi vì không thể cộng chữ với số' },
      { id: 'D', text: '14' }
    ],
    correctAnswers: ['A'],
    explanation: 'Hàm str(14) đã chuyển số 14 thành chuỗi "14", sau đó phép + nối hai chuỗi lại với nhau an toàn.',
    wrongExplanations: {
      B: 'str(tuoi) chuyển giá trị 14 của biến thành chuỗi "14", không in tên biến.',
      C: 'Hàm str() đã giải quyết vấn đề kiểu dữ liệu nên không bị lỗi.',
      D: 'Biến thong_bao chứa cả câu hoàn chỉnh.'
    },
    takeaway: 'Dùng str(so) để đổi số thành chuỗi trước khi ghép với chuỗi khác bằng dấu +.'
  },
  {
    id: 'predict_029',
    game: 'predict',
    difficulty: 4,
    concept: 'int_conversion',
    conceptNameVi: 'Chuyển chuỗi thành số với int()',
    type: 'single',
    code: `s1 = "50"
s2 = "30"
tong = int(s1) + int(s2)
print(tong)`,
    question: 'Màn hình sẽ hiển thị kết quả nào?',
    options: [
      { id: 'A', text: '80' },
      { id: 'B', text: '5030' },
      { id: 'C', text: '"80"' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'Hàm int("50") đổi chuỗi thành số nguyên 50, int("30") đổi thành 30. Phép cộng số học 50 + 30 = 80.',
    wrongExplanations: {
      B: 'Nếu không dùng int(), "50" + "30" sẽ ra "5030". Nhưng ở đây đã dùng int() nên thực hiện phép cộng số học!',
      C: 'Kết quả in ra là số nguyên 80.',
      D: 'int("50") là hoàn toàn hợp lệ vì nội dung chuỗi là các chữ số.'
    },
    takeaway: 'int("chuỗi_số") giúp biến đổi văn bản chứa số thành số nguyên để tính toán.'
  },
  {
    id: 'predict_030',
    game: 'predict',
    difficulty: 3,
    concept: 'min_max',
    conceptNameVi: 'Hàm min() và max()',
    type: 'single',
    code: `a = 12
b = 25
c = 8
print(max(a, b, c) - min(a, b, c))`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '17' },
      { id: 'B', text: '25' },
      { id: 'C', text: '8' },
      { id: 'D', text: '13' }
    ],
    correctAnswers: ['A'],
    explanation: 'max(12, 25, 8) = 25 (lớn nhất). min(12, 25, 8) = 8 (nhỏ nhất). Kết quả: 25 - 8 = 17.',
    wrongExplanations: {
      B: '25 mới chỉ là giá trị max, chưa trừ đi min.',
      C: '8 mới chỉ là giá trị min.',
      D: '25 - 12 = 13, nhưng 8 mới là số nhỏ nhất.'
    },
    takeaway: 'max() tìm số lớn nhất, min() tìm số nhỏ nhất trong các số được cung cấp.'
  },
  {
    id: 'predict_031',
    game: 'predict',
    difficulty: 2,
    concept: 'case_sensitive',
    conceptNameVi: 'Phân biệt chữ hoa và thường',
    type: 'single',
    code: `ten = "Minh"
Ten = "Khoa"
print(ten)`,
    question: 'Màn hình sẽ hiển thị tên nào?',
    options: [
      { id: 'A', text: 'Minh' },
      { id: 'B', text: 'Khoa' },
      { id: 'C', text: 'Minh Khoa' },
      { id: 'D', text: 'Lỗi trùng tên biến' }
    ],
    correctAnswers: ['A'],
    explanation: 'Python phân biệt chữ hoa và chữ thường. "ten" (chữ thường) và "Ten" (chữ hoa) là 2 biến hoàn toàn khác nhau. Lệnh print(ten) in "Minh".',
    wrongExplanations: {
      B: 'Biến "Ten" (viết hoa) mới chứa "Khoa", còn lệnh in yêu cầu in biến "ten" (viết thường).',
      C: 'Hai biến này đứng độc lập, không tự ghép vào nhau.',
      D: 'Trong Python, ten và Ten là 2 biến phân biệt hợp lệ.'
    },
    takeaway: 'Python có tính phân biệt chữ hoa chữ thường (Case-sensitive): ten khác với Ten.'
  },
  {
    id: 'predict_032',
    game: 'predict',
    difficulty: 3,
    concept: 'print_end',
    conceptNameVi: 'Tham số end trong print()',
    type: 'single',
    code: `print("A", end="*")
print("B")`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: 'A*B' },
      { id: 'B', text: 'A\\nB' },
      { id: 'C', text: 'A*\\nB*' },
      { id: 'D', text: 'AB*' }
    ],
    correctAnswers: ['A'],
    explanation: 'Mặc định print kết thúc bằng việc xuống dòng. end="*" thay thế việc xuống dòng bằng dấu *, nên chữ B in tiếp ngay sau: "A*B".',
    wrongExplanations: {
      B: 'end="*" đã vô hiệu hóa việc xuống dòng của lệnh in đầu tiên.',
      C: 'Lệnh print("B") thứ hai không có tham số end nên kết thúc bình thường.',
      D: 'Dấu * nằm ngay sau A rồi mới tới B.'
    },
    takeaway: 'Tham số end giúp thay đổi ký tự kết thúc lệnh print (mặc định là xuống dòng).'
  },
  {
    id: 'predict_033',
    game: 'predict',
    difficulty: 4,
    concept: 'negative_index',
    conceptNameVi: 'Chỉ số âm trong Danh sách',
    type: 'single',
    code: `ds = ["Toan", "Van", "Tin"]
print(ds[-1])`,
    question: 'Chỉ số âm -1 sẽ lấy phần tử nào?',
    options: [
      { id: 'A', text: 'Tin' },
      { id: 'B', text: 'Toan' },
      { id: 'C', text: 'Van' },
      { id: 'D', text: 'Lỗi chỉ số không hợp lệ' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python, chỉ số âm đếm ngược từ cuối danh sách. -1 là phần tử cuối cùng: "Tin".',
    wrongExplanations: {
      B: '"Toan" là phần tử đầu tiên (chỉ số 0).',
      C: '"Van" là phần tử ở vị trí ds[-2].',
      D: 'Chỉ số âm là tính năng cực kỳ tiện lợi và hoàn toàn hợp lệ trong Python.'
    },
    takeaway: 'Chỉ số -1 luôn trỏ đến phần tử cuối cùng của danh sách hoặc chuỗi.'
  },
  {
    id: 'predict_034',
    game: 'predict',
    difficulty: 4,
    concept: 'boolean_and_or',
    conceptNameVi: 'Biểu thức and & or',
    type: 'single',
    code: `x = 5
print(x > 3 and x < 10)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: '5' },
      { id: 'D', text: '3 < 5 < 10' }
    ],
    correctAnswers: ['A'],
    explanation: 'x > 3 là True (5 > 3), x < 10 là True (5 < 10). Phép toán True and True cho kết quả là True.',
    wrongExplanations: {
      B: 'Cả hai vế so sánh đều đúng nên phép and cho kết quả True.',
      C: 'Đây là biểu thức điều kiện logic nên trả về Boolean.',
      D: 'Python đánh giá giá trị logic chứ không in nguyên văn.'
    },
    takeaway: 'Toán tử and chỉ trả về True khi CẢ HAI điều kiện đều đúng.'
  },
  {
    id: 'predict_035',
    game: 'predict',
    difficulty: 3,
    concept: 'string_escape',
    conceptNameVi: 'Dấu ngoặc kép lồng nhau',
    type: 'single',
    code: `print('Thay noi: "Hay co gang!"')`,
    question: 'Màn hình sẽ hiển thị gì?',
    options: [
      { id: 'A', text: 'Thay noi: "Hay co gang!"' },
      { id: 'B', text: 'Thay noi: Hay co gang!' },
      { id: 'C', text: 'Lỗi cú pháp' },
      { id: 'D', text: 'Thay noi:' }
    ],
    correctAnswers: ['A'],
    explanation: 'Khi chuỗi được bọc ngoài bằng dấu ngoặc đơn (\'\'), dấu ngoặc kép ("") bên trong sẽ được giữ nguyên và in ra màn hình.',
    wrongExplanations: {
      B: 'Dấu ngoặc kép bên trong được in ra nguyên vẹn vì nó nằm trong chuỗi dấu ngoặc đơn.',
      C: 'Cách lồng ngoặc đơn ngoài, ngoặc kép trong là cú pháp chuẩn trong Python.',
      D: 'Toàn bộ nội dung chuỗi sẽ được in đầy đủ.'
    },
    takeaway: 'Để in được dấu ngoặc kép ", ta có thể bọc toàn bộ chuỗi bằng dấu ngoặc đơn \'.'
  },
  {
    id: 'predict_036',
    game: 'predict',
    difficulty: 4,
    concept: 'round_function',
    conceptNameVi: 'Hàm làm tròn round()',
    type: 'single',
    code: `diem = 8.67
print(round(diem, 1))`,
    question: 'Lệnh trên sẽ in ra số nào?',
    options: [
      { id: 'A', text: '8.7' },
      { id: 'B', text: '8.6' },
      { id: 'C', text: '9.0' },
      { id: 'D', text: '8' }
    ],
    correctAnswers: ['A'],
    explanation: 'Hàm round(diem, 1) làm tròn đến 1 chữ số thập phân. Vì số tiếp theo là 7 (>= 5) nên làm tròn lên thành 8.7.',
    wrongExplanations: {
      B: 'Chữ số thứ hai là 7 >= 5 nên phải làm tròn lên 8.7 chứ không giữ nguyên 8.6.',
      C: 'round(diem) mới làm tròn thành 9, ở đây có tham số lấy 1 chữ số thập phân.',
      D: 'Hàm round giữ lại 1 chữ số sau dấu phẩy.'
    },
    takeaway: 'round(số, n) dùng để làm tròn số đến n chữ số phần thập phân.'
  },
  {
    id: 'predict_037',
    game: 'predict',
    difficulty: 3,
    concept: 'list_append_effect',
    conceptNameVi: 'Thêm phần tử vào Danh sách',
    type: 'single',
    code: `ds = [1, 2]
ds.append(3)
print(ds)`,
    question: 'Danh sách ds sau khi append(3) sẽ là gì?',
    options: [
      { id: 'A', text: '[1, 2, 3]' },
      { id: 'B', text: '[3, 1, 2]' },
      { id: 'C', text: '[1, 2]' },
      { id: 'D', text: '3' }
    ],
    correctAnswers: ['A'],
    explanation: 'Phương thức append() sẽ thêm phần tử mới vào VỊ TRÍ CUỐI CÙNG của danh sách.',
    wrongExplanations: {
      B: 'append() thêm vào đuôi danh sách, không thêm vào đầu.',
      C: 'Danh sách đã được cập nhật thêm số 3.',
      D: 'Lệnh print(ds) in toàn bộ danh sách [1, 2, 3].'
    },
    takeaway: 'danh_sach.append(x) luôn thêm giá trị x vào cuối danh sách hiện có.'
  },
  {
    id: 'predict_038',
    game: 'predict',
    difficulty: 2,
    concept: 'empty_string',
    conceptNameVi: 'Chuỗi rỗng',
    type: 'single',
    code: `s = ""
print(len(s))`,
    question: 'Độ dài của chuỗi rỗng s là bao nhiêu?',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: '1' },
      { id: 'C', text: 'None' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'Chuỗi rỗng "" không chứa bất kỳ ký tự nào, do đó hàm len() trả về 0.',
    wrongExplanations: {
      B: 'Nếu có 1 dấu cách " " thì độ dài mới là 1. Ở đây không có gì nên là 0.',
      C: 'len() luôn trả về một số nguyên.',
      D: 'Chuỗi rỗng là một chuỗi hoàn toàn hợp lệ trong Python.'
    },
    takeaway: 'Chuỗi rỗng "" có độ dài bằng 0.'
  },
  {
    id: 'predict_039',
    game: 'predict',
    difficulty: 4,
    concept: 'math_division_float',
    conceptNameVi: 'Phép chia thực / luôn ra float',
    type: 'single',
    code: `x = 10 / 2
print(x)`,
    question: 'Kết quả in ra của phép chia 10 / 2 là gì?',
    options: [
      { id: 'A', text: '5.0' },
      { id: 'B', text: '5' },
      { id: 'C', text: '2.5' },
      { id: 'D', text: '10/2' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python 3, phép chia đơn / LUÔN LUÔN trả về số thực (float), ngay cả khi chia hết. Do đó 10 / 2 = 5.0.',
    wrongExplanations: {
      B: 'Phép chia // mới trả về số nguyên 5, còn phép chia / luôn trả về 5.0.',
      C: '10 chia 2 bằng 5.',
      D: 'Python thực hiện phép tính toán.'
    },
    takeaway: 'Toán tử chia / trong Python luôn cho ra số thực float (có phần thập phân như .0).'
  },
  {
    id: 'predict_040',
    game: 'predict',
    difficulty: 4,
    concept: 'complex_precedence',
    conceptNameVi: 'Độ ưu tiên lũy thừa và nhân',
    type: 'single',
    code: `kq = 2 * 3 ** 2
print(kq)`,
    question: 'Màn hình sẽ hiển thị kết quả nào?',
    options: [
      { id: 'A', text: '18' },
      { id: 'B', text: '36' },
      { id: 'C', text: '12' },
      { id: 'D', text: '64' }
    ],
    correctAnswers: ['A'],
    explanation: 'Lũy thừa ** có độ ưu tiên cao hơn phép nhân *. Python tính 3 ** 2 = 9 trước, sau đó 2 * 9 = 18.',
    wrongExplanations: {
      B: 'Nếu tính 2 * 3 = 6 rồi mới 6 ** 2 = 36 là sai thứ tự! Lũy thừa ** luôn làm trước phép nhân *.',
      C: 'Tính toán chưa đúng.',
      D: 'Lũy thừa thực hiện trên cơ số 3.'
    },
    takeaway: 'Lũy thừa (**) có mức ưu tiên cao hơn phép nhân (*) và phép chia (/).'
  }
];
