import type { Question } from '../types.js';

export const VARIABLE_TRACKER_QUESTIONS: Question[] = [
  {
    id: 'var_001',
    game: 'variable',
    difficulty: 1,
    concept: 'assignment',
    conceptNameVi: 'Phép gán biến cơ bản',
    type: 'single',
    code: `diem = 10
diem = 20
print(diem)`,
    question: 'Sau khi chạy đoạn mã trên, giá trị cuối cùng của biến diem là bao nhiêu?',
    options: [
      { id: 'A', text: '20' },
      { id: 'B', text: '10' },
      { id: 'C', text: '30' },
      { id: 'D', text: '10 20' }
    ],
    correctAnswers: ['A'],
    explanation: 'Ban đầu diem được gán bằng 10. Dòng lệnh tiếp theo diem = 20 đã ghi đè giá trị mới 20 lên biến diem.',
    wrongExplanations: {
      B: 'Giá trị 10 cũ đã bị thay thế bởi lệnh diem = 20.',
      C: 'Phép gán = không cộng dồn hai số, nó thay thế hoàn toàn giá trị cũ.',
      D: 'Biến đơn chỉ lưu một giá trị duy nhất tại một thời điểm.'
    },
    takeaway: 'Phép gán = sẽ ghi đè giá trị mới vào biến, xóa đi giá trị cũ trước đó.'
  },
  {
    id: 'var_002',
    game: 'variable',
    difficulty: 2,
    concept: 'increment',
    conceptNameVi: 'Tăng giá trị biến x = x + 1',
    type: 'single',
    code: `x = 5
x = x + 3
print(x)`,
    question: 'Giá trị của x sau khi thực hiện là gì?',
    options: [
      { id: 'A', text: '8' },
      { id: 'B', text: '5' },
      { id: 'C', text: '3' },
      { id: 'D', text: '53' }
    ],
    correctAnswers: ['A'],
    explanation: 'Python tính vế phải trước: x + 3 = 5 + 3 = 8. Sau đó kết quả 8 được gán lại vào x.',
    wrongExplanations: {
      B: 'x đã được cộng thêm 3 nên không còn giữ số 5.',
      C: '3 chỉ là số được cộng thêm.',
      D: 'Đây là phép cộng số học 5 + 3, không phải ghép chuỗi.'
    },
    takeaway: 'Lệnh x = x + a có nghĩa là: lấy giá trị hiện tại của x cộng với a rồi lưu kết quả mới vào x.'
  },
  {
    id: 'var_003',
    game: 'variable',
    difficulty: 2,
    concept: 'two_variables',
    conceptNameVi: 'Tính toán giữa hai biến',
    type: 'single',
    code: `a = 4
b = a
a = 10
print(b)`,
    question: 'Giá trị in ra của b là bao nhiêu?',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '10' },
      { id: 'C', text: '14' },
      { id: 'D', text: '0' }
    ],
    correctAnswers: ['A'],
    explanation: 'Khi chạy b = a, b nhận giá trị của a lúc đó là 4. Sau đó khi a đổi thành 10, giá trị của b KHÔNG bị đổi theo.',
    wrongExplanations: {
      B: 'Việc thay đổi a sau này không làm thay đổi b đã được gán giá trị 4 trước đó.',
      C: 'Không có phép cộng nào ở đây.',
      D: 'b đã nhận giá trị 4 từ biến a.'
    },
    takeaway: 'Khi gán b = a, b sao chép giá trị của a tại thời điểm đó. Sau này a đổi thì b vẫn giữ nguyên.'
  },
  {
    id: 'var_004',
    game: 'variable',
    difficulty: 3,
    concept: 'swap_variables',
    conceptNameVi: 'Hoán đổi giá trị với biến tạm',
    type: 'single',
    code: `a = 3
b = 7
temp = a
a = b
b = temp
print(a, b)`,
    question: 'Kết quả in ra của hai biến a và b là gì?',
    options: [
      { id: 'A', text: '7 3' },
      { id: 'B', text: '3 7' },
      { id: 'C', text: '7 7' },
      { id: 'D', text: '3 3' }
    ],
    correctAnswers: ['A'],
    explanation: 'temp giữ 3 -> a nhận 7 từ b -> b nhận 3 từ temp. Kết quả a và b đã đổi chỗ cho nhau thành 7 và 3.',
    wrongExplanations: {
      B: 'Giá trị đã được hoán đổi thành công nên a không còn là 3.',
      C: 'Nhờ có biến tạm temp giữ giá trị 3, b nhận 3 chứ không bị thành 7.',
      D: 'a đã nhận giá trị 7 từ biến b.'
    },
    takeaway: 'Sử dụng biến trung gian (temp) là thuật toán kinh điển để hoán đổi giá trị 2 biến trong lập trình.'
  },
  {
    id: 'var_005',
    game: 'variable',
    difficulty: 3,
    concept: 'cumulative_math',
    conceptNameVi: 'Cộng dồn và nhân dồn biến',
    type: 'single',
    code: `tien = 100
tien = tien - 20
tien = tien * 2
tien = tien + 10
print(tien)`,
    question: 'Số tiền cuối cùng là bao nhiêu?',
    options: [
      { id: 'A', text: '170' },
      { id: 'B', text: '160' },
      { id: 'C', text: '200' },
      { id: 'D', text: '190' }
    ],
    correctAnswers: ['A'],
    explanation: 'Theo dõi từng bước: 100 -> trừ 20 còn 80 -> nhân 2 thành 160 -> cộng 10 thành 170.',
    wrongExplanations: {
      B: '160 chưa cộng thêm 10 ở bước cuối.',
      C: 'Tính toán chưa chuẩn xác từng dòng lệnh.',
      D: '100 * 2 = 200 - 20 = 180 + 10 = 190 (sai thứ tự các dòng lệnh!).'
    },
    takeaway: 'Hãy theo dõi giá trị biến thay đổi từng bước một theo thứ tự dòng lệnh từ trên xuống dưới.'
  },
  {
    id: 'var_006',
    game: 'variable',
    difficulty: 2,
    concept: 'augmented_assignment',
    conceptNameVi: 'Phép toán viết tắt +=',
    type: 'single',
    code: `diem = 50
diem += 25
print(diem)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '75' },
      { id: 'B', text: '25' },
      { id: 'C', text: '50' },
      { id: 'D', text: '5025' }
    ],
    correctAnswers: ['A'],
    explanation: 'diem += 25 là cách viết ngắn gọn của diem = diem + 25. Giá trị 50 + 25 = 75.',
    wrongExplanations: {
      B: '+= là cộng thêm vào biến hiện tại, không phải gán đè bằng 25.',
      C: 'Biến đã được cộng thêm 25.',
      D: 'Cộng số học 50 + 25 = 75.'
    },
    takeaway: 'Toán tử += giúp viết ngắn gọn thao tác cộng thêm vào chính biến đó.'
  },
  {
    id: 'var_007',
    game: 'variable',
    difficulty: 2,
    concept: 'augmented_multiply',
    conceptNameVi: 'Toán tử nhân viết tắt *=',
    type: 'single',
    code: `so_luong = 4
so_luong *= 3
print(so_luong)`,
    question: 'Giá trị của so_luong là bao nhiêu?',
    options: [
      { id: 'A', text: '12' },
      { id: 'B', text: '4' },
      { id: 'C', text: '3' },
      { id: 'D', text: '7' }
    ],
    correctAnswers: ['A'],
    explanation: 'so_luong *= 3 tương đương với so_luong = so_luong * 3 = 4 * 3 = 12.',
    wrongExplanations: {
      B: 'so_luong đã được nhân với 3.',
      C: '3 là thừa số nhân vào.',
      D: '7 là kết quả nếu làm phép cộng (4 + 3), nhưng đây là phép nhân (*=).'
    },
    takeaway: 'x *= y tương đương với x = x * y.'
  },
  {
    id: 'var_008',
    game: 'variable',
    difficulty: 3,
    concept: 'multiple_assignment',
    conceptNameVi: 'Gán đồng thời nhiều biến',
    type: 'single',
    code: `x, y = 10, 20
x, y = y, x
print(x, y)`,
    question: 'Kết quả in ra của x và y là gì?',
    options: [
      { id: 'A', text: '20 10' },
      { id: 'B', text: '10 20' },
      { id: 'C', text: '20 20' },
      { id: 'D', text: '10 10' }
    ],
    correctAnswers: ['A'],
    explanation: 'Cú pháp x, y = y, x của Python cho phép tráo đổi trực tiếp giá trị giữa x và y: x thành 20, y thành 10.',
    wrongExplanations: {
      B: 'Hai biến đã được đổi vị trí cho nhau.',
      C: 'Cả 2 vế được đánh giá đồng thời nên không bị mất giá trị.',
      D: 'x và y đã hoán đổi hoàn toàn.'
    },
    takeaway: 'Python hỗ trợ hoán đổi cực nhanh: x, y = y, x mà không cần biến tạm.'
  },
  {
    id: 'var_009',
    game: 'variable',
    difficulty: 3,
    concept: 'string_mutation',
    conceptNameVi: 'Nối chuỗi vào biến chuỗi',
    type: 'single',
    code: `loi_chao = "Xin chao"
loi_chao = loi_chao + " Cac Ban"
print(loi_chao)`,
    question: 'Biến loi_chao sau cùng chứa văn bản nào?',
    options: [
      { id: 'A', text: 'Xin chao Cac Ban' },
      { id: 'B', text: 'Xin chao' },
      { id: 'C', text: 'Cac Ban' },
      { id: 'D', text: 'Xin chaoCac Ban' }
    ],
    correctAnswers: ['A'],
    explanation: 'Lấy "Xin chao" cộng nối với " Cac Ban" cho ra chuỗi mới "Xin chao Cac Ban".',
    wrongExplanations: {
      B: 'Chuỗi đã được nối thêm nội dung mới.',
      C: 'Nội dung ban đầu vẫn được giữ lại phía trước.',
      D: 'Chuỗi thứ hai có dấu cách phía trước chữ " Cac Ban" nên có khoảng trắng.'
    },
    takeaway: 'Có thể cộng dồn chuỗi vào một biến văn bản: chuoi = chuoi + "..."'
  },
  {
    id: 'var_010',
    game: 'variable',
    difficulty: 4,
    concept: 'variable_chaining',
    conceptNameVi: 'Dây chuyền tính toán 3 biến',
    type: 'single',
    code: `a = 2
b = a * 3
c = a + b
a = c * 2
print(a)`,
    question: 'Giá trị cuối cùng của biến a là bao nhiêu?',
    options: [
      { id: 'A', text: '16' },
      { id: 'B', text: '8' },
      { id: 'C', text: '12' },
      { id: 'D', text: '2' }
    ],
    correctAnswers: ['A'],
    explanation: 'a = 2 -> b = 2 * 3 = 6 -> c = 2 + 6 = 8 -> a = 8 * 2 = 16.',
    wrongExplanations: {
      B: '8 là giá trị của c, sau đó a được tính bằng c * 2 = 16.',
      C: 'Tính toán chưa chuẩn xác các bước trung gian.',
      D: 'a ban đầu là 2 nhưng dòng cuối cùng đã gán a = c * 2.'
    },
    takeaway: 'Theo dõi từng biến một trên nháp để không bị nhầm lẫn giữa các bước.'
  },
  {
    id: 'var_011',
    game: 'variable',
    difficulty: 2,
    concept: 'type_change',
    conceptNameVi: 'Biến đổi kiểu dữ liệu của biến',
    type: 'single',
    code: `x = 100
x = "Mot tram"
print(x)`,
    question: 'Chương trình sẽ in ra gì?',
    options: [
      { id: 'A', text: 'Mot tram' },
      { id: 'B', text: '100' },
      { id: 'C', text: 'Lỗi vì biến số không được đổi thành chữ' },
      { id: 'D', text: '100 Mot tram' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python (ngôn ngữ định kiểu động), một biến có thể đổi từ kiểu số sang kiểu chuỗi bất cứ lúc nào.',
    wrongExplanations: {
      B: '100 đã bị thay thế bởi chuỗi mới.',
      C: 'Python hoàn toàn cho phép một biến nhận kiểu dữ liệu khác khi gán lại.',
      D: 'Giá trị cũ bị xóa bỏ, chỉ còn giá trị mới.'
    },
    takeaway: 'Trong Python, biến có thể thay đổi kiểu dữ liệu (từ số sang chuỗi hoặc ngược lại) một cách linh hoạt.'
  },
  {
    id: 'var_012',
    game: 'variable',
    difficulty: 3,
    concept: 'list_element_update',
    conceptNameVi: 'Cập nhật phần tử trong danh sách',
    type: 'single',
    code: `diem_so = [8, 9, 7]
diem_so[1] = 10
print(diem_so)`,
    question: 'Danh sách diem_so sau khi gán lại là gì?',
    options: [
      { id: 'A', text: '[8, 10, 7]' },
      { id: 'B', text: '[10, 9, 7]' },
      { id: 'C', text: '[8, 9, 10]' },
      { id: 'D', text: '[8, 9, 7, 10]' }
    ],
    correctAnswers: ['A'],
    explanation: 'Chỉ số 1 là vị trí thứ hai trong danh sách (số 9 ban đầu). Khi gán diem_so[1] = 10, số 9 được thay bằng 10.',
    wrongExplanations: {
      B: 'Vị trí đầu tiên là diem_so[0], vị trí số 1 là phần tử thứ hai.',
      C: 'Vị trí cuối cùng là diem_so[2].',
      D: 'Gán theo chỉ số sẽ thay thế phần tử chứ không thêm mới (muốn thêm phải dùng append).'
    },
    takeaway: 'danh_sach[i] = gia_tri_moi dùng để sửa đổi phần tử tại vị trí chỉ số i.'
  },
  {
    id: 'var_013',
    game: 'variable',
    difficulty: 3,
    concept: 'decrement',
    conceptNameVi: 'Giảm giá trị biến -=',
    type: 'single',
    code: `hp = 100
hp -= 35
hp -= 15
print(hp)`,
    question: 'Lượng máu hp còn lại là bao nhiêu?',
    options: [
      { id: 'A', text: '50' },
      { id: 'B', text: '65' },
      { id: 'C', text: '15' },
      { id: 'D', text: '0' }
    ],
    correctAnswers: ['A'],
    explanation: '100 - 35 = 65. Sau đó 65 - 15 = 50.',
    wrongExplanations: {
      B: '65 mới chỉ trừ đi 35, chưa trừ tiếp 15.',
      C: '15 là lượng máu trừ ở bước hai.',
      D: 'hp vẫn còn 50 máu.'
    },
    takeaway: 'Toán tử -= dùng để giảm bớt giá trị của một biến.'
  },
  {
    id: 'var_014',
    game: 'variable',
    difficulty: 4,
    concept: 'self_referential',
    conceptNameVi: 'Biến phụ thuộc lẫn nhau',
    type: 'single',
    code: `x = 10
y = 5
x = x + y
y = x - y
x = x - y
print(x, y)`,
    question: 'Giá trị của x và y in ra là bao nhiêu?',
    options: [
      { id: 'A', text: '5 10' },
      { id: 'B', text: '10 5' },
      { id: 'C', text: '15 10' },
      { id: 'D', text: '0 0' }
    ],
    correctAnswers: ['A'],
    explanation: 'Bước 1: x = 10+5 = 15. Bước 2: y = 15-5 = 10. Bước 3: x = 15-10 = 5. Đây là thuật toán hoán đổi dùng phép cộng trừ!',
    wrongExplanations: {
      B: 'Giá trị đã được hoán đổi thành công (x thành 5, y thành 10).',
      C: 'Bước cuối x = 15 - 10 = 5.',
      D: 'Các phép tính toán cho kết quả 5 và 10.'
    },
    takeaway: 'Có thể hoán đổi hai biến số bằng 3 phép toán cộng trừ mà không cần dùng biến thứ 3.'
  },
  {
    id: 'var_015',
    game: 'variable',
    difficulty: 3,
    concept: 'string_repeat_assign',
    conceptNameVi: 'Gán lặp lại chuỗi',
    type: 'single',
    code: `sao = "*"
sao = sao * 5
print(sao)`,
    question: 'Biến sao sẽ in ra gì?',
    options: [
      { id: 'A', text: '*****' },
      { id: 'B', text: '* 5' },
      { id: 'C', text: '*' },
      { id: 'D', text: '5' }
    ],
    correctAnswers: ['A'],
    explanation: '"*" nhân với 5 tạo thành chuỗi 5 dấu sao liên tiếp "*****".',
    wrongExplanations: {
      B: 'Toán tử * với chuỗi sẽ lặp chuỗi chứ không in số 5.',
      C: 'Biến sao đã được nhân 5 lần.',
      D: 'Phép nhân chuỗi trả về chuỗi các ký tự sao.'
    },
    takeaway: 'sao = sao * 5 cập nhật biến sao thành chuỗi lặp lại 5 lần.'
  },
  {
    id: 'var_016',
    game: 'variable',
    difficulty: 4,
    concept: 'list_copy_reference',
    conceptNameVi: 'Thêm phần tử vào danh sách được gán',
    type: 'single',
    code: `a = [1, 2]
b = a
b.append(3)
print(a)`,
    question: 'Khi in danh sách a, kết quả là gì?',
    options: [
      { id: 'A', text: '[1, 2, 3]' },
      { id: 'B', text: '[1, 2]' },
      { id: 'C', text: '[3]' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'Trong Python, khi gán b = a với danh sách, b và a cùng trỏ vào MỘT danh sách trong bộ nhớ. Thay đổi b sẽ làm thay đổi a!',
    wrongExplanations: {
      B: 'Với danh sách (list), gán b = a làm b và a dùng chung một danh sách, nên a cũng có số 3.',
      C: 'Danh sách giữ nguyên các số 1, 2 cũ và thêm 3.',
      D: 'Đây là cơ chế tham chiếu chuẩn của Python.'
    },
    takeaway: 'Với danh sách trong Python, b = a làm cả hai biến cùng trỏ vào một vùng nhớ danh sách.'
  },
  {
    id: 'var_017',
    game: 'variable',
    difficulty: 2,
    concept: 'boolean_toggle',
    conceptNameVi: 'Đảo giá trị Boolean với not',
    type: 'single',
    code: `bat_den = False
bat_den = not bat_den
print(bat_den)`,
    question: 'Giá trị của biến bat_den là gì?',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: 'not False' },
      { id: 'D', text: 'None' }
    ],
    correctAnswers: ['A'],
    explanation: 'Toán tử not dùng để phủ định giá trị Boolean: not False sẽ thành True.',
    wrongExplanations: {
      B: 'not False đã biến đổi giá trị thành True.',
      C: 'not là từ khóa toán tử logic, không phải văn bản.',
      D: 'Kết quả của phép not luôn là True hoặc False.'
    },
    takeaway: 'not True = False, và not False = True (toán tử phủ định logic).'
  },
  {
    id: 'var_018',
    game: 'variable',
    difficulty: 3,
    concept: 'variable_scope_order',
    conceptNameVi: 'Thứ tự định nghĩa biến',
    type: 'single',
    code: `x = 2
y = x + 3
x = 10
print(y)`,
    question: 'Giá trị của y là bao nhiêu?',
    options: [
      { id: 'A', text: '5' },
      { id: 'B', text: '13' },
      { id: 'C', text: '10' },
      { id: 'D', text: '15' }
    ],
    correctAnswers: ['A'],
    explanation: 'Tại dòng 2, y = x + 3 = 2 + 3 = 5. Dòng 3 x đổi thành 10 nhưng y không được tính lại, nên y vẫn giữ 5.',
    wrongExplanations: {
      B: 'Trong lập trình, biến không tự động cập nhật công thức khi biến thành phần thay đổi sau này.',
      C: '10 là giá trị của x, không phải của y.',
      D: 'y = 5 được cố định tại dòng 2.'
    },
    takeaway: 'Phép gán tính giá trị ngay lập tức tại dòng đó và không tự động cập nhật nếu biến thành phần thay đổi sau này.'
  },
  {
    id: 'var_019',
    game: 'variable',
    difficulty: 4,
    concept: 'modulo_accumulator',
    conceptNameVi: 'Cập nhật biến với phép chia lấy dư',
    type: 'single',
    code: `tong = 37
tong = tong % 10
tong = tong * 4
print(tong)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: '28' },
      { id: 'B', text: '12' },
      { id: 'C', text: '37' },
      { id: 'D', text: '40' }
    ],
    correctAnswers: ['A'],
    explanation: '37 % 10 = 7 (37 chia 10 dư 7). Sau đó 7 * 4 = 28.',
    wrongExplanations: {
      B: '37 // 10 = 3 rồi * 4 = 12 (đó là phép chia nguyên //, còn % là lấy số dư 7).',
      C: 'Biến tong đã thay đổi qua 2 phép tính.',
      D: '7 * 4 = 28, không phải 40.'
    },
    takeaway: '37 % 10 lấy chữ số hàng đơn vị (7), sau đó nhân 4 được 28.'
  },
  {
    id: 'var_020',
    game: 'variable',
    difficulty: 3,
    concept: 'string_index_assign',
    conceptNameVi: 'Tính bất biến của chuỗi (String Immutability)',
    type: 'single',
    code: `s = "Cat"
s = "B" + s[1:]
print(s)`,
    question: 'Biến s sẽ trở thành từ nào?',
    options: [
      { id: 'A', text: 'Bat' },
      { id: 'B', text: 'Cat' },
      { id: 'C', text: 'B' },
      { id: 'D', text: 'BCat' }
    ],
    correctAnswers: ['A'],
    explanation: 's[1:] lấy các ký tự từ vị trí 1 đến hết ("at"). "B" + "at" tạo thành chuỗi mới "Bat".',
    wrongExplanations: {
      B: 's đã được gán giá trị mới.',
      C: 'Có ghép thêm phần đuôi "at".',
      D: 's[1:] bỏ qua chữ "C" ở đầu (vị trí 0), nên không bị thành BCat.'
    },
    takeaway: 'Để sửa chữ cái đầu trong chuỗi, ta ghép ký tự mới với phần còn lại của chuỗi cũ.'
  },
  {
    id: 'var_021',
    game: 'variable',
    difficulty: 2,
    concept: 'assignment_semantics',
    conceptNameVi: 'Ý nghĩa dấu bằng =',
    type: 'single',
    code: `a = 5
b = 3
c = a + b
print("Tong =", c)`,
    question: 'Dòng chữ in ra màn hình là gì?',
    options: [
      { id: 'A', text: 'Tong = 8' },
      { id: 'B', text: 'Tong = c' },
      { id: 'C', text: 'Tong = 5 + 3' },
      { id: 'D', text: '8' }
    ],
    correctAnswers: ['A'],
    explanation: '"Tong =" là chuỗi giữ nguyên, c được thay bằng giá trị 8 (5 + 3). Kết quả là "Tong = 8".',
    wrongExplanations: {
      B: 'c là tên biến, Python in giá trị 8 của biến c.',
      C: 'a + b đã được tính toán thành 8 trước khi lưu vào c.',
      D: 'Lệnh in có cả chuỗi nhãn "Tong =".'
    },
    takeaway: 'print() có thể in nhãn giải thích kèm theo giá trị biến số.'
  },
  {
    id: 'var_022',
    game: 'variable',
    difficulty: 3,
    concept: 'triple_step',
    conceptNameVi: 'Cập nhật biến qua 3 giai đoạn',
    type: 'single',
    code: `k = 1
k = k + k
k = k + k
k = k + k
print(k)`,
    question: 'Sau 3 lần tăng gấp đôi, k bằng bao nhiêu?',
    options: [
      { id: 'A', text: '8' },
      { id: 'B', text: '6' },
      { id: 'C', text: '4' },
      { id: 'D', text: '16' }
    ],
    correctAnswers: ['A'],
    explanation: 'k ban đầu = 1. Lần 1: k = 1+1 = 2. Lần 2: k = 2+2 = 4. Lần 3: k = 4+4 = 8.',
    wrongExplanations: {
      B: '1 + 1 + 1 + 1 = 4 (hoặc 1+2+3 = 6) là suy nghĩ sai lầm! Ở mỗi bước k đều nhân đôi: 1 -> 2 -> 4 -> 8.',
      C: '4 mới là giá trị ở lần tăng thứ 2.',
      D: 'Cần thêm 1 bước nữa mới lên 16.'
    },
    takeaway: 'k = k + k làm tăng gấp đôi giá trị của k sau mỗi dòng lệnh (2^n).'
  },
  {
    id: 'var_023',
    game: 'variable',
    difficulty: 4,
    concept: 'mixed_variables',
    conceptNameVi: 'Hoán chuyển nhiều biến xen kẽ',
    type: 'single',
    code: `m = 5
n = 2
p = m * n
m = p - m
n = m + n
print(m, n)`,
    question: 'Kết quả in ra của m và n là gì?',
    options: [
      { id: 'A', text: '5 7' },
      { id: 'B', text: '10 12' },
      { id: 'C', text: '5 2' },
      { id: 'D', text: '7 5' }
    ],
    correctAnswers: ['A'],
    explanation: 'p = 5*2 = 10. m = 10 - 5 = 5. n = 5 + 2 = 7. Vậy m = 5 và n = 7.',
    wrongExplanations: {
      B: 'p = 10 nhưng m = p - m = 10 - 5 = 5.',
      C: 'n đã đổi thành m + n = 5 + 2 = 7.',
      D: 'm in trước (5) rồi mới tới n (7).'
    },
    takeaway: 'Luôn ghi chú cẩn thận giá trị của từng biến sau mỗi dòng lệnh.'
  },
  {
    id: 'var_024',
    game: 'variable',
    difficulty: 3,
    concept: 'list_pop_behavior',
    conceptNameVi: 'Xóa phần tử cuối trong danh sách',
    type: 'single',
    code: `ds = [10, 20, 30]
phan_tu = ds.pop()
print(phan_tu, ds)`,
    question: 'Màn hình sẽ hiển thị gì?',
    options: [
      { id: 'A', text: '30 [10, 20]' },
      { id: 'B', text: '10 [20, 30]' },
      { id: 'C', text: '30 [10, 20, 30]' },
      { id: 'D', text: '[10, 20] 30' }
    ],
    correctAnswers: ['A'],
    explanation: 'ds.pop() lấy ra và xóa phần tử cuối cùng (30). Lúc này phan_tu = 30 và ds còn lại [10, 20].',
    wrongExplanations: {
      B: 'pop() mặc định lấy ở đuôi (30), không lấy ở đầu (10).',
      C: 'pop() sẽ xóa phần tử đó ra khỏi danh sách ban đầu.',
      D: 'phan_tu in trước (30) rồi mới tới ds ([10, 20]).'
    },
    takeaway: 'pop() lấy phần tử cuối ra khỏi danh sách và trả về giá trị đó.'
  },
  {
    id: 'var_025',
    game: 'variable',
    difficulty: 4,
    concept: 'division_variable_type',
    conceptNameVi: 'Biến đổi kiểu số sau phép chia',
    type: 'single',
    code: `x = 8
x = x / 2
x = x + 1
print(x)`,
    question: 'Giá trị in ra của x là gì?',
    options: [
      { id: 'A', text: '5.0' },
      { id: 'B', text: '5' },
      { id: 'C', text: '4.0' },
      { id: 'D', text: '4' }
    ],
    correctAnswers: ['A'],
    explanation: '8 / 2 biến x thành số thực 4.0. Sau đó 4.0 + 1 cho ra kết quả kiểu số thực là 5.0.',
    wrongExplanations: {
      B: 'Vì phép chia / tạo ra số thực 4.0, khi cộng với 1 kết quả vẫn là số thực 5.0.',
      C: '4.0 mới là sau bước chia, chưa cộng 1.',
      D: '8 / 2 = 4.0 + 1 = 5.0.'
    },
    takeaway: 'Một khi biến chuyển thành số thực (float), các phép cộng trừ sau đó vẫn cho ra số thực.'
  },
  {
    id: 'var_026',
    game: 'variable',
    difficulty: 2,
    concept: 'var_reassign_zero',
    conceptNameVi: 'Gán biến về 0',
    type: 'single',
    code: `diem = 100
diem = diem * 0
print(diem)`,
    question: 'Giá trị in ra là gì?',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: '100' },
      { id: 'C', text: 'None' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'Mọi số nhân với 0 đều bằng 0. 100 * 0 = 0, nên diem nhận giá trị 0.',
    wrongExplanations: {
      B: '100 nhân với 0 cho kết quả là 0.',
      C: '0 là một số nguyên cụ thể, không phải None.',
      D: 'Phép nhân với 0 hoàn toàn hợp lệ.'
    },
    takeaway: 'Nhân biến với 0 sẽ biến giá trị của biến đó thành 0.'
  },
  {
    id: 'var_027',
    game: 'variable',
    difficulty: 3,
    concept: 'string_accumulate_loop',
    conceptNameVi: 'Cộng dồn chữ cái',
    type: 'single',
    code: `tu = "A"
tu += "B"
tu += "C"
print(tu)`,
    question: 'Biến tu sau các lệnh cộng chuỗi là gì?',
    options: [
      { id: 'A', text: 'ABC' },
      { id: 'B', text: 'C' },
      { id: 'C', text: 'A B C' },
      { id: 'D', text: 'Lỗi cú pháp' }
    ],
    correctAnswers: ['A'],
    explanation: '"A" -> += "B" thành "AB" -> += "C" thành "ABC".',
    wrongExplanations: {
      B: '+= nối tiếp vào đuôi chuỗi hiện có, không ghi đè thành C.',
      C: 'Không có khoảng trắng được thêm vào.',
      D: 'Toán tử += hoạt động rất tốt với chuỗi ký tự.'
    },
    takeaway: 'Toán tử += dùng trên chuỗi sẽ nối thêm ký tự mới vào cuối chuỗi cũ.'
  },
  {
    id: 'var_028',
    game: 'variable',
    difficulty: 4,
    concept: 'variable_overwrite_logic',
    conceptNameVi: 'Phân tích biến lưu cờ hiệu Boolean',
    type: 'single',
    code: `flag = True
flag = not flag
flag = not flag
print(flag)`,
    question: 'Giá trị cuối cùng của flag là gì?',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: 'not True' },
      { id: 'D', text: '1' }
    ],
    correctAnswers: ['A'],
    explanation: 'Ban đầu flag = True. Lần 1: not True = False. Lần 2: not False = True. Hai lần phủ định đưa biến về giá trị ban đầu.',
    wrongExplanations: {
      B: 'Lần phủ định thứ 2 đã đảo False trở lại thành True.',
      C: 'not là toán tử logic, không in ra chữ.',
      D: 'Lệnh in hiển thị giá trị Boolean True.'
    },
    takeaway: 'Phủ định hai lần (not (not x)) luôn trả về giá trị gốc của x.'
  },
  {
    id: 'var_029',
    game: 'variable',
    difficulty: 3,
    concept: 'list_multiple_mods',
    conceptNameVi: 'Thao tác nhiều biến trên danh sách',
    type: 'single',
    code: `nums = [1, 2]
nums.append(3)
nums[0] = 9
print(nums)`,
    question: 'Danh sách nums cuối cùng là gì?',
    options: [
      { id: 'A', text: '[9, 2, 3]' },
      { id: 'B', text: '[9, 2]' },
      { id: 'C', text: '[1, 2, 3]' },
      { id: 'D', text: '[9, 3]' }
    ],
    correctAnswers: ['A'],
    explanation: '[1, 2] append 3 thành [1, 2, 3]. Sau đó nums[0] = 9 đổi số 1 ở đầu thành 9: [9, 2, 3].',
    wrongExplanations: {
      B: 'append(3) đã thêm số 3 vào danh sách.',
      C: 'nums[0] đã thay số 1 thành số 9.',
      D: 'Số 2 ở vị trí giữa vẫn được giữ nguyên.'
    },
    takeaway: 'Có thể vừa thêm phần tử mới vừa sửa đổi phần tử cũ trong danh sách.'
  },
  {
    id: 'var_030',
    game: 'variable',
    difficulty: 4,
    concept: 'math_variable_state',
    conceptNameVi: 'Biến tính chu vi diện tích',
    type: 'single',
    code: `dai = 6
rong = 4
chu_vi = (dai + rong) * 2
dai = 10
print(chu_vi)`,
    question: 'Giá trị chu_vi in ra là bao nhiêu?',
    options: [
      { id: 'A', text: '20' },
      { id: 'B', text: '28' },
      { id: 'C', text: '24' },
      { id: 'D', text: '40' }
    ],
    correctAnswers: ['A'],
    explanation: 'chu_vi được tính tại dòng 3: (6 + 4) * 2 = 20. Khi dai đổi thành 10 ở dòng 4, biến chu_vi không được tính lại nên vẫn là 20.',
    wrongExplanations: {
      B: '28 là kết quả nếu tính lại với dai=10 ((10+4)*2 = 28), nhưng không có dòng lệnh nào tính lại chu_vi!',
      C: '24 là diện tích (6 * 4).',
      D: 'Tính toán không chính xác.'
    },
    takeaway: 'Biến chu_vi chỉ lưu con số kết quả (20), không tự động tính lại khi các biến cũ thay đổi.'
  },
  {
    id: 'var_031',
    game: 'variable',
    difficulty: 2,
    concept: 'var_reassignment_same_name',
    conceptNameVi: 'Tự gán biến cho chính mình',
    type: 'single',
    code: `x = 7
x = x
print(x)`,
    question: 'Giá trị của x là gì?',
    options: [
      { id: 'A', text: '7' },
      { id: 'B', text: '0' },
      { id: 'C', text: 'x' },
      { id: 'D', text: 'Lỗi' }
    ],
    correctAnswers: ['A'],
    explanation: 'Lệnh x = x lấy giá trị hiện tại của x (7) gán lại vào x, nên x vẫn giữ nguyên là 7.',
    wrongExplanations: {
      B: 'Không có phép trừ hay gán 0.',
      C: 'In giá trị của biến, không in tên x.',
      D: 'Lệnh x = x hoàn toàn hợp lệ trong Python (dù không làm thay đổi giá trị).'
    },
    takeaway: 'Gán một biến bằng chính nó sẽ giữ nguyên giá trị của biến đó.'
  },
  {
    id: 'var_032',
    game: 'variable',
    difficulty: 3,
    concept: 'string_length_track',
    conceptNameVi: 'Theo dõi biến độ dài chuỗi',
    type: 'single',
    code: `s = "Tin"
s = s + " hoc"
do_dai = len(s)
print(do_dai)`,
    question: 'Biến do_dai lưu giá trị bao nhiêu?',
    options: [
      { id: 'A', text: '7' },
      { id: 'B', text: '6' },
      { id: 'C', text: '3' },
      { id: 'D', text: 'Tin hoc' }
    ],
    correctAnswers: ['A'],
    explanation: 's trở thành "Tin hoc" gồm 3 chữ cái "Tin" + 1 dấu cách + 3 chữ cái "hoc" = 7 ký tự.',
    wrongExplanations: {
      B: 'Nếu quên tính dấu cách thì ra 6, nhưng dấu cách cũng là 1 ký tự.',
      C: '3 là độ dài của chữ "Tin" ban đầu.',
      D: 'do_dai là một số nguyên đếm số ký tự.'
    },
    takeaway: 'len("Tin hoc") = 7 vì bao gồm cả khoảng trắng ở giữa.'
  },
  {
    id: 'var_033',
    game: 'variable',
    difficulty: 4,
    concept: 'integer_division_update',
    conceptNameVi: 'Cập nhật biến qua phép chia nguyên',
    type: 'single',
    code: `so = 125
so = so // 10
so = so // 10
print(so)`,
    question: 'Sau 2 lần chia nguyên cho 10, biến so còn lại bao nhiêu?',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '12' },
      { id: 'C', text: '5' },
      { id: 'D', text: '1.25' }
    ],
    correctAnswers: ['A'],
    explanation: 'Lần 1: 125 // 10 = 12 (bỏ đi chữ số 5 cuối). Lần 2: 12 // 10 = 1 (bỏ đi chữ số 2). Kết quả còn lại 1.',
    wrongExplanations: {
      B: '12 mới là sau lần chia thứ nhất.',
      C: '5 là chữ số hàng đơn vị ban đầu (125 % 10).',
      D: '// là phép chia nguyên, không tạo ra phần thập phân.'
    },
    takeaway: 'Chia nguyên cho 10 (// 10) là mẹo lập trình để cắt bỏ chữ số cuối cùng của một số nguyên.'
  },
  {
    id: 'var_034',
    game: 'variable',
    difficulty: 3,
    concept: 'power_update',
    conceptNameVi: 'Cập nhật biến bằng phép lũy thừa **=',
    type: 'single',
    code: `x = 3
x **= 3
print(x)`,
    question: 'Giá trị của x là bao nhiêu?',
    options: [
      { id: 'A', text: '27' },
      { id: 'B', text: '9' },
      { id: 'C', text: '6' },
      { id: 'D', text: '33' }
    ],
    correctAnswers: ['A'],
    explanation: 'x **= 3 tương đương x = x ** 3 = 3 * 3 * 3 = 27.',
    wrongExplanations: {
      B: '9 là 3 ** 2 (3 mũ 2), còn ở đây là 3 mũ 3 = 27.',
      C: '6 là 3 * 2 hoặc 3 + 3.',
      D: 'Đây là phép toán lũy thừa, không phải ghép chuỗi.'
    },
    takeaway: 'x **= n tương đương x = x ** n (nâng x lên lũy thừa n).'
  },
  {
    id: 'var_035',
    game: 'variable',
    difficulty: 4,
    concept: 'variable_sum_list',
    conceptNameVi: 'Cộng dồn các phần tử danh sách',
    type: 'single',
    code: `ds = [5, 10, 15]
tong = 0
tong = tong + ds[0]
tong = tong + ds[1]
tong = tong + ds[2]
print(tong)`,
    question: 'Giá trị của biến tong là bao nhiêu?',
    options: [
      { id: 'A', text: '30' },
      { id: 'B', text: '15' },
      { id: 'C', text: '0' },
      { id: 'D', text: '3' }
    ],
    correctAnswers: ['A'],
    explanation: 'tong bắt đầu = 0. + 5 = 5. + 10 = 15. + 15 = 30. Tổng 3 phần tử là 30.',
    wrongExplanations: {
      B: '15 mới chỉ cộng đến phần tử thứ 2.',
      C: 'Biến tong đã cộng dồn cả 3 phần tử.',
      D: '3 là số lượng phần tử (len(ds)), không phải tổng giá trị.'
    },
    takeaway: 'Mô hình cộng dồn: bat_dau = 0 -> cong_don += gia_tri.'
  },
  {
    id: 'var_036',
    game: 'variable',
    difficulty: 3,
    concept: 'count_occurrences_manual',
    conceptNameVi: 'Biến đếm số lần xuất hiện',
    type: 'single',
    code: `dem = 0
dem += 1
dem += 1
dem += 1
print("Dem =", dem)`,
    question: 'Kết quả in ra là gì?',
    options: [
      { id: 'A', text: 'Dem = 3' },
      { id: 'B', text: 'Dem = 1' },
      { id: 'C', text: '3' },
      { id: 'D', text: 'Dem = 0' }
    ],
    correctAnswers: ['A'],
    explanation: 'Biến đếm ban đầu là 0, sau 3 lần tăng thêm 1 (dem += 1) thì dem = 3. In ra "Dem = 3".',
    wrongExplanations: {
      B: 'Biến dem được cộng 3 lần, không phải 1 lần.',
      C: 'Có nhãn văn bản "Dem =" phía trước.',
      D: 'Biến dem đã được tăng giá trị.'
    },
    takeaway: 'Biến đếm (counter) thường bắt đầu bằng 0 và tăng 1 mỗi khi có sự kiện thỏa mãn.'
  },
  {
    id: 'var_037',
    game: 'variable',
    difficulty: 4,
    concept: 'complex_swap_three',
    conceptNameVi: 'Đổi chỗ xoay vòng 3 biến',
    type: 'single',
    code: `a, b, c = 1, 2, 3
a, b, c = b, c, a
print(a, b, c)`,
    question: 'Giá trị sau khi hoán đổi vòng tròn là gì?',
    options: [
      { id: 'A', text: '2 3 1' },
      { id: 'B', text: '3 2 1' },
      { id: 'C', text: '1 2 3' },
      { id: 'D', text: '2 1 3' }
    ],
    correctAnswers: ['A'],
    explanation: 'a nhận giá trị của b (2), b nhận giá trị của c (3), c nhận giá trị của a (1). Kết quả: 2 3 1.',
    wrongExplanations: {
      B: 'a nhận b (2) chứ không nhận c (3).',
      C: 'Các biến đã được hoán đổi vị trí.',
      D: 'b nhận c (3) chứ không nhận a (1).'
    },
    takeaway: 'Python có thể gán đồng thời nhiều biến: a, b, c = b, c, a xoay vòng rất gọn gàng.'
  },
  {
    id: 'var_038',
    game: 'variable',
    difficulty: 2,
    concept: 'var_override_string',
    conceptNameVi: 'Ghi đè chuỗi hoàn toàn',
    type: 'single',
    code: `ten = "An"
ten = "Binh"
ten = "Cuong"
print(ten)`,
    question: 'Tên cuối cùng in ra là ai?',
    options: [
      { id: 'A', text: 'Cuong' },
      { id: 'B', text: 'An' },
      { id: 'C', text: 'Binh' },
      { id: 'D', text: 'An Binh Cuong' }
    ],
    correctAnswers: ['A'],
    explanation: 'Giá trị "Cuong" được gán ở dòng cuối cùng nên ghi đè lên toàn bộ các giá trị trước đó.',
    wrongExplanations: {
      B: '"An" đã bị thay thế ở dòng 2.',
      C: '"Binh" đã bị thay thế ở dòng 3.',
      D: 'Biến đơn chỉ lưu một giá trị duy nhất.'
    },
    takeaway: 'Mỗi phép gán mới sẽ hủy bỏ hoàn toàn giá trị cũ của biến.'
  },
  {
    id: 'var_039',
    game: 'variable',
    difficulty: 3,
    concept: 'list_reverse_assign',
    conceptNameVi: 'Gán biến đảo danh sách đơn giản',
    type: 'single',
    code: `a = [10, 20]
b = [a[1], a[0]]
print(b)`,
    question: 'Danh sách b sẽ chứa các số nào?',
    options: [
      { id: 'A', text: '[20, 10]' },
      { id: 'B', text: '[10, 20]' },
      { id: 'C', text: '[20]' },
      { id: 'D', text: '[10]' }
    ],
    correctAnswers: ['A'],
    explanation: 'a[1] là số 20, a[0] là số 10. Danh sách b tạo ra từ [a[1], a[0]] chính là [20, 10].',
    wrongExplanations: {
      B: 'Thứ tự đã bị đảo ngược: a[1] đứng trước a[0].',
      C: 'Danh sách b có 2 phần tử.',
      D: 'Cả 2 phần tử đều được đưa vào b.'
    },
    takeaway: 'Có thể tạo danh sách mới bằng cách trích xuất các phần tử của danh sách cũ theo thứ tự mong muốn.'
  },
  {
    id: 'var_040',
    game: 'variable',
    difficulty: 4,
    concept: 'grand_accumulator',
    conceptNameVi: 'Theo dõi tích lũy phức tạp',
    type: 'single',
    code: `tien = 50
tien += 50
tien //= 2
tien -= 10
tien *= 3
print(tien)`,
    question: 'Giá trị cuối cùng của biến tien là bao nhiêu?',
    options: [
      { id: 'A', text: '120' },
      { id: 'B', text: '150' },
      { id: 'C', text: '100' },
      { id: 'D', text: '90' }
    ],
    correctAnswers: ['A'],
    explanation: '50 -> (+50) = 100 -> (//2) = 50 -> (-10) = 40 -> (*3) = 120.',
    wrongExplanations: {
      B: 'Nếu quên bước trừ 10 thì 50 * 3 = 150.',
      C: 'Tính toán chưa chuẩn xác các bước rút gọn.',
      D: '40 * 3 = 120, không phải 90.'
    },
    takeaway: 'Kỹ năng theo dấu biến từng dòng là nền tảng quan trọng nhất để đọc hiểu bất kỳ chương trình máy tính nào.'
  }
];
