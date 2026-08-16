import type { Question } from '../types.js';

export const CODE_BUILDER_QUESTIONS: Question[] = [
  {
    id: 'build_001',
    game: 'builder',
    difficulty: 1,
    concept: 'input_output_flow',
    conceptNameVi: 'Luồng Nhập dữ liệu và Xuất lời chào',
    type: 'reorder',
    code: `# Muc tieu: Hoi ten nguoi dung roi chao theo ten`,
    question: 'Hãy sắp xếp các dòng sau theo đúng thứ tự để tạo chương trình hỏi tên và chào người dùng:',
    options: [
      { id: 'b1', text: 'ten = input("Nhap ten cua ban: ")' },
      { id: 'b2', text: 'print("Xin chao,", ten)' }
    ],
    correctAnswers: ['b1', 'b2'],
    validSequences: [['b1', 'b2']],
    explanation: 'Luồng chuẩn: Phải nhập tên và lưu vào biến `ten` trước, sau đó mới có dữ liệu để in ra lời chào.',
    takeaway: 'Nguyên lý cơ bản: Nhập dữ liệu (Input) -> Xuất dữ liệu (Output).'
  },
  {
    id: 'build_002',
    game: 'builder',
    difficulty: 2,
    concept: 'sum_two_numbers',
    conceptNameVi: 'Chương trình tính tổng hai số',
    type: 'reorder',
    code: `# Muc tieu: Tinh tong hai so a va b roi in ket qua`,
    question: 'Sắp xếp 3 dòng lệnh để tạo chương trình tính tổng hai số:',
    options: [
      { id: 'b1', text: 'a = 10' },
      { id: 'b2', text: 'b = 20' },
      { id: 'b3', text: 'tong = a + b' },
      { id: 'b4', text: 'print("Tong la:", tong)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b2', 'b1', 'b3', 'b4']
    ],
    explanation: 'Khai báo a và b (thứ tự nào trước cũng được) -> Tính tong = a + b -> In kết quả tong.',
    takeaway: 'Quy trình 3 bước: Khởi tạo biến -> Xử lý tính toán -> Xuất kết quả.'
  },
  {
    id: 'build_003',
    game: 'builder',
    difficulty: 2,
    concept: 'rectangle_area',
    conceptNameVi: 'Tính diện tích hình chữ nhật',
    type: 'reorder',
    code: `# Muc tieu: Tinh dien tich hinh chu nhat tu chieu dai va chieu rong`,
    question: 'Sắp xếp các dòng lệnh thành chương trình tính diện tích hình chữ nhật:',
    options: [
      { id: 'b1', text: 'dai = 12' },
      { id: 'b2', text: 'rong = 5' },
      { id: 'b3', text: 'dien_tich = dai * rong' },
      { id: 'b4', text: 'print("Dien tich la:", dien_tich)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b2', 'b1', 'b3', 'b4']
    ],
    explanation: 'Có dai và rong trước -> Tính dien_tich = dai * rong -> In kết quả.',
    takeaway: 'Phải có các biến thành phần trước khi đưa vào công thức tính toán.'
  },
  {
    id: 'build_004',
    game: 'builder',
    difficulty: 2,
    concept: 'check_pass_fail',
    conceptNameVi: 'Chương trình xét đỗ/trượt',
    type: 'reorder',
    code: `# Muc tieu: Kiem tra neu diem >= 5 thi bao Dat, nguoc lai bao Hoc lai`,
    question: 'Sắp xếp các dòng để hoàn thiện cấu trúc rẽ nhánh kiểm tra điểm:',
    options: [
      { id: 'b1', text: 'diem = 8.5' },
      { id: 'b2', text: 'if diem >= 5.0:' },
      { id: 'b3', text: '    print("Dat yeu cau")' },
      { id: 'b4', text: 'else:' },
      { id: 'b5', text: '    print("Can co gang them")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5'],
    validSequences: [['b1', 'b2', 'b3', 'b4', 'b5']],
    explanation: 'Khai báo diem -> if diem >= 5.0: -> lệnh print thụt lề -> else: -> lệnh print thụt lề.',
    takeaway: 'Khối if luôn đứng trước khối else.'
  },
  {
    id: 'build_005',
    game: 'builder',
    difficulty: 3,
    concept: 'calculate_age_next_year',
    conceptNameVi: 'Nhập tuổi từ bàn phím và tính tuổi năm sau',
    type: 'reorder',
    code: `# Muc tieu: Nhap tuoi, ep sang so nguyen, tinh tuoi nam sau roi in ra`,
    question: 'Sắp xếp các bước để tạo chương trình tính tuổi tương lai:',
    options: [
      { id: 'b1', text: 'tuoi_chuoi = input("Nhap tuoi hien tai: ")' },
      { id: 'b2', text: 'tuoi = int(tuoi_chuoi)' },
      { id: 'b3', text: 'tuoi_nam_sau = tuoi + 1' },
      { id: 'b4', text: 'print("Sang nam ban se:", tuoi_nam_sau, "tuoi")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [['b1', 'b2', 'b3', 'b4']],
    explanation: 'Nhập chuỗi -> Chuyển thành số nguyên int() -> Thực hiện phép cộng số học (+ 1) -> In kết quả.',
    takeaway: 'Dữ liệu từ input() phải qua bước ép kiểu int() trước khi thực hiện phép tính số học.'
  },
  {
    id: 'build_006',
    game: 'builder',
    difficulty: 3,
    concept: 'swap_with_temp',
    conceptNameVi: 'Hoán đổi giá trị hai biến với biến tạm',
    type: 'reorder',
    code: `# Muc tieu: Hoan doi gia tri cua a va b nho bien tam temp`,
    question: 'Sắp xếp các dòng lệnh để thực hiện đúng thuật toán tráo đổi hai biến:',
    options: [
      { id: 'b1', text: 'a = 5' },
      { id: 'b2', text: 'b = 9' },
      { id: 'b3', text: 'temp = a' },
      { id: 'b4', text: 'a = b' },
      { id: 'b5', text: 'b = temp' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4', 'b5'],
      ['b2', 'b1', 'b3', 'b4', 'b5']
    ],
    explanation: 'Khởi tạo a, b -> Cất a vào temp -> Gán b sang a -> Gán temp (a cũ) sang b.',
    takeaway: 'Thuật toán hoán đổi: temp = a -> a = b -> b = temp.'
  },
  {
    id: 'build_007',
    game: 'builder',
    difficulty: 3,
    concept: 'accumulate_list_items',
    conceptNameVi: 'Tạo danh sách và tính tổng các phần tử',
    type: 'reorder',
    code: `# Muc tieu: Tao danh sach diem va tinh tong 3 con diem`,
    question: 'Sắp xếp các dòng code để tính tổng điểm từ danh sách:',
    options: [
      { id: 'b1', text: 'ds_diem = [8, 9, 10]' },
      { id: 'b2', text: 'tong = ds_diem[0] + ds_diem[1] + ds_diem[2]' },
      { id: 'b3', text: 'print("Tong 3 diem la:", tong)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [['b1', 'b2', 'b3']],
    explanation: 'Khai báo danh sách ds_diem -> Truy xuất các chỉ số [0], [1], [2] để cộng tổng -> In kết quả ra màn hình.',
    takeaway: 'Tạo cấu trúc dữ liệu trước rồi mới truy cập từng phần tử bên trong.'
  },
  {
    id: 'build_008',
    game: 'builder',
    difficulty: 2,
    concept: 'circle_perimeter',
    conceptNameVi: 'Tính chu vi hình tròn',
    type: 'reorder',
    code: `# Muc tieu: Tinh chu vi hinh tron voi ban kinh r va pi = 3.14`,
    question: 'Sắp xếp các dòng lệnh thành chương trình tính chu vi hình tròn:',
    options: [
      { id: 'b1', text: 'r = 5' },
      { id: 'b2', text: 'pi = 3.14' },
      { id: 'b3', text: 'chu_vi = 2 * pi * r' },
      { id: 'b4', text: 'print("Chu vi hinh tron:", chu_vi)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b2', 'b1', 'b3', 'b4']
    ],
    explanation: 'Khai báo bán kính r và hằng số pi -> Áp dụng công thức 2 * pi * r -> In kết quả.',
    takeaway: 'Công thức toán học được dịch trực tiếp thành các phép toán nhân * trong Python.'
  },
  {
    id: 'build_009',
    game: 'builder',
    difficulty: 3,
    concept: 'even_odd_program',
    conceptNameVi: 'Chương trình nhận biết số chẵn hay lẻ',
    type: 'reorder',
    code: `# Muc tieu: Kiem tra mot so la chan hay le`,
    question: 'Sắp xếp các dòng để hoàn thiện chương trình kiểm tra số chẵn lẻ:',
    options: [
      { id: 'b1', text: 'n = 14' },
      { id: 'b2', text: 'if n % 2 == 0:' },
      { id: 'b3', text: '    print(n, "la so chan")' },
      { id: 'b4', text: 'else:' },
      { id: 'b5', text: '    print(n, "la so le")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5'],
    validSequences: [['b1', 'b2', 'b3', 'b4', 'b5']],
    explanation: 'Có số n -> Kiểm tra n % 2 == 0 -> Nhánh chẵn -> Nhánh lẻ.',
    takeaway: 'Cấu trúc rẽ nhánh chuẩn: if <điều_kiện>: -> lệnh con -> else: -> lệnh con.'
  },
  {
    id: 'build_010',
    game: 'builder',
    difficulty: 4,
    concept: 'average_three_subjects',
    conceptNameVi: 'Tính điểm trung bình 3 môn và xếp loại',
    type: 'reorder',
    code: `# Muc tieu: Tinh DTB va kiem tra hoc sinh gioi`,
    question: 'Sắp xếp các dòng lệnh thành chương trình tính điểm trung bình và xét học lực:',
    options: [
      { id: 'b1', text: 'toan, van, anh = 8.5, 8.0, 9.0' },
      { id: 'b2', text: 'dtb = (toan + van + anh) / 3' },
      { id: 'b3', text: 'print("Diem TB:", round(dtb, 1))' },
      { id: 'b4', text: 'if dtb >= 8.0:' },
      { id: 'b5', text: '    print("Xep loai: Gioi")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4', 'b5'],
      ['b1', 'b2', 'b4', 'b5', 'b3']
    ],
    explanation: 'Khai báo điểm -> Tính dtb bằng trung bình cộng có dấu ngoặc -> In DTB -> Kiểm tra điều kiện if dtb >= 8.0.',
    takeaway: 'Phải dùng ngoặc tròn (toan + van + anh) / 3 để tính tổng trước rồi mới chia cho 3.'
  },
  {
    id: 'build_011',
    game: 'builder',
    difficulty: 3,
    concept: 'list_append_sequence',
    conceptNameVi: 'Tạo danh sách và thêm phần tử liên tiếp',
    type: 'reorder',
    code: `# Muc tieu: Khoi tao danh sach rong roi them 2 mon hoc vao`,
    question: 'Sắp xếp các dòng lệnh để xây dựng danh sách môn học:',
    options: [
      { id: 'b1', text: 'ds_mon = []' },
      { id: 'b2', text: 'ds_mon.append("Tin hoc")' },
      { id: 'b3', text: 'ds_mon.append("Toan hoc")' },
      { id: 'b4', text: 'print("Danh sach mon:", ds_mon)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b1', 'b3', 'b2', 'b4']
    ],
    explanation: 'Khởi tạo danh sách rỗng ds_mon = [] -> Thêm các phần tử bằng append() -> In danh sách hoàn thiện.',
    takeaway: 'Khởi tạo danh sách trước khi gọi phương thức append() để thêm phần tử.'
  },
  {
    id: 'build_012',
    game: 'builder',
    difficulty: 3,
    concept: 'temperature_converter',
    conceptNameVi: 'Chuyển đổi nhiệt độ từ C sang F',
    type: 'reorder',
    code: `# Muc tieu: Chuyen do C sang do F theo cong thuc F = C * 1.8 + 32`,
    question: 'Sắp xếp các dòng lệnh thành chương trình đổi độ C sang độ F:',
    options: [
      { id: 'b1', text: 'do_C = 30' },
      { id: 'b2', text: 'do_F = do_C * 1.8 + 32' },
      { id: 'b3', text: 'print(do_C, "do C =", do_F, "do F")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [['b1', 'b2', 'b3']],
    explanation: 'Có nhiệt độ C ban đầu -> Áp dụng công thức tính F -> In kết quả kèm đơn vị.',
    takeaway: 'Chương trình chuyển đổi đơn vị luôn gồm: Giá trị gốc -> Công thức biến đổi -> Xuất kết quả.'
  },
  {
    id: 'build_013',
    game: 'builder',
    difficulty: 4,
    concept: 'find_larger_of_two',
    conceptNameVi: 'Tìm số lớn hơn trong hai số',
    type: 'reorder',
    code: `# Muc tieu: Tim va in so lon nhat giua x va y`,
    question: 'Sắp xếp các dòng lệnh thành thuật toán tìm số lớn nhất giữa 2 số:',
    options: [
      { id: 'b1', text: 'x = 15' },
      { id: 'b2', text: 'y = 28' },
      { id: 'b3', text: 'if x > y:' },
      { id: 'b4', text: '    max_so = x' },
      { id: 'b5', text: 'else:' },
      { id: 'b6', text: '    max_so = y' },
      { id: 'b7', text: 'print("So lon hon la:", max_so)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
      ['b2', 'b1', 'b3', 'b4', 'b5', 'b6', 'b7']
    ],
    explanation: 'Có 2 số x, y -> So sánh nếu x > y thì max là x, ngược lại max là y -> In giá trị max_so.',
    takeaway: 'Lưu kết quả so sánh vào một biến (max_so) giúp mã nguồn sáng sủa và dễ mở rộng.'
  },
  {
    id: 'build_014',
    game: 'builder',
    difficulty: 3,
    concept: 'string_full_name_format',
    conceptNameVi: 'Ghép họ tên đầy đủ',
    type: 'reorder',
    code: `# Muc tieu: Ghep ho, ten dem va ten thanh ho ten day du`,
    question: 'Sắp xếp các dòng để tạo chuỗi họ và tên hoàn chỉnh:',
    options: [
      { id: 'b1', text: 'ho = "Tran"' },
      { id: 'b2', text: 'ten = "Nam"' },
      { id: 'b3', text: 'ho_ten = ho + " " + ten' },
      { id: 'b4', text: 'print("Ho va ten:", ho_ten)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b2', 'b1', 'b3', 'b4']
    ],
    explanation: 'Khai báo ho và ten -> Nối với dấu cách " " ở giữa -> In ra tên đầy đủ.',
    takeaway: 'Luôn nhớ chèn thêm khoảng trắng " " khi nối họ và tên.'
  },
  {
    id: 'build_015',
    game: 'builder',
    difficulty: 4,
    concept: 'for_loop_counter',
    conceptNameVi: 'Vòng lặp tính tổng từ 1 đến 5',
    type: 'reorder',
    code: `# Muc tieu: Tinh tong S = 1 + 2 + 3 + 4 + 5 dung vong lap for`,
    question: 'Sắp xếp các dòng lệnh thành chương trình tính tổng dãy số:',
    options: [
      { id: 'b1', text: 'tong = 0' },
      { id: 'b2', text: 'for i in range(1, 6):' },
      { id: 'b3', text: '    tong = tong + i' },
      { id: 'b4', text: 'print("Tong tu 1 den 5 la:", tong)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [['b1', 'b2', 'b3', 'b4']],
    explanation: 'Khởi tạo tong = 0 -> Vòng lặp for i chạy từ 1 đến 5 (range(1, 6)) -> Cộng dồn i vào tong -> In tổng sau khi lặp xong.',
    takeaway: 'Mô hình tích lũy: Khởi tạo biến tổng = 0 -> Lặp và cộng dồn -> In kết quả ở ngoài vòng lặp.'
  },
  {
    id: 'build_016',
    game: 'builder',
    difficulty: 2,
    concept: 'square_area',
    conceptNameVi: 'Tính diện tích hình vuông',
    type: 'reorder',
    code: `# Muc tieu: Tinh dien tich hinh vuong canh a`,
    question: 'Sắp xếp các dòng để tính diện tích hình vuông:',
    options: [
      { id: 'b1', text: 'canh = 6' },
      { id: 'b2', text: 'dien_tich = canh ** 2' },
      { id: 'b3', text: 'print("Dien tich hinh vuong:", dien_tich)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [['b1', 'b2', 'b3']],
    explanation: 'Có độ dài cạnh -> Tính diện tích bằng phép lũy thừa ** 2 -> In kết quả.',
    takeaway: 'canh ** 2 tương đương với canh * canh (tính diện tích hình vuông).'
  },
  {
    id: 'build_017',
    game: 'builder',
    difficulty: 3,
    concept: 'count_evens_in_list',
    conceptNameVi: 'Đếm số chẵn trong danh sách đơn giản',
    type: 'reorder',
    code: `# Muc tieu: Dem so luong so chan trong danh sach`,
    question: 'Sắp xếp các dòng lệnh thành chương trình đếm số chẵn:',
    options: [
      { id: 'b1', text: 'nums = [2, 5, 8]' },
      { id: 'b2', text: 'dem_chan = 0' },
      { id: 'b3', text: 'for x in nums:' },
      { id: 'b4', text: '    if x % 2 == 0:' },
      { id: 'b5', text: '        dem_chan += 1' },
      { id: 'b6', text: 'print("So luong so chan:", dem_chan)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      ['b2', 'b1', 'b3', 'b4', 'b5', 'b6']
    ],
    explanation: 'Có danh sách và biến đếm dem_chan = 0 -> Duyệt từng phần tử x -> Kiểm tra x % 2 == 0 -> Tăng biến đếm -> In kết quả.',
    takeaway: 'Mô hình đếm (Count): Khởi tạo dem = 0 -> Lặp và kiểm tra điều kiện -> dem += 1.'
  },
  {
    id: 'build_018',
    game: 'builder',
    difficulty: 3,
    concept: 'shopping_receipt',
    conceptNameVi: 'Tính tiền giỏ hàng',
    type: 'reorder',
    code: `# Muc tieu: Tinh tong tien mua hang voi so luong va don gia`,
    question: 'Sắp xếp các dòng thành chương trình in hóa đơn mua sách:',
    options: [
      { id: 'b1', text: 'don_gia = 25000' },
      { id: 'b2', text: 'so_luong = 4' },
      { id: 'b3', text: 'thanh_tien = don_gia * so_luong' },
      { id: 'b4', text: 'print("Tong tien phai tra:", thanh_tien, "dong")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b2', 'b1', 'b3', 'b4']
    ],
    explanation: 'Có đơn giá và số lượng -> Tính thành tiền = đơn giá * số lượng -> In tổng tiền.',
    takeaway: 'Chương trình thực tế: Đơn giá * Số lượng = Thành tiền.'
  },
  {
    id: 'build_019',
    game: 'builder',
    difficulty: 4,
    concept: 'login_validation_flow',
    conceptNameVi: 'Kiểm tra đăng nhập đúng tài khoản và mật khẩu',
    type: 'reorder',
    code: `# Muc tieu: Kiem tra ca username va password`,
    question: 'Sắp xếp các dòng để hoàn thiện hệ thống kiểm tra đăng nhập:',
    options: [
      { id: 'b1', text: 'user = "admin"' },
      { id: 'b2', text: 'password = "123"' },
      { id: 'b3', text: 'if user == "admin" and password == "123":' },
      { id: 'b4', text: '    print("Dang nhap thanh cong")' },
      { id: 'b5', text: 'else:' },
      { id: 'b6', text: '    print("Tai khoan hoac mat khau sai")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      ['b2', 'b1', 'b3', 'b4', 'b5', 'b6']
    ],
    explanation: 'Có user và password -> Kiểm tra đồng thời bằng toán tử and -> Thông báo thành công hoặc thất bại.',
    takeaway: 'Dùng toán tử and để kiểm tra đồng thời cả hai tiêu chí bảo mật.'
  },
  {
    id: 'build_020',
    game: 'builder',
    difficulty: 3,
    concept: 'string_character_count',
    conceptNameVi: 'Đo độ dài chuỗi và thông báo',
    type: 'reorder',
    code: `# Muc tieu: Nhap chuoi roi in ra so ky tu`,
    question: 'Sắp xếp các bước để tạo chương trình đếm ký tự văn bản:',
    options: [
      { id: 'b1', text: 'van_ban = "Lap trinh Python"' },
      { id: 'b2', text: 'so_ky_tu = len(van_ban)' },
      { id: 'b3', text: 'print("Chuoi co do dai la:", so_ky_tu)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [['b1', 'b2', 'b3']],
    explanation: 'Có chuỗi van_ban -> Dùng hàm len() đo độ dài -> In kết quả số ký tự.',
    takeaway: 'len(chuoi) lấy số lượng ký tự để lưu vào biến hoặc in ra.'
  },
  {
    id: 'build_021',
    game: 'builder',
    difficulty: 2,
    concept: 'minutes_to_seconds',
    conceptNameVi: 'Đổi phút sang giây',
    type: 'reorder',
    code: `# Muc tieu: Doi so phut sang so giay`,
    question: 'Sắp xếp các dòng để đổi phút sang giây:',
    options: [
      { id: 'b1', text: 'phut = 5' },
      { id: 'b2', text: 'giay = phut * 60' },
      { id: 'b3', text: 'print(phut, "phut =", giay, "giay")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [['b1', 'b2', 'b3']],
    explanation: 'Có số phút -> Nhân với 60 để đổi ra giây -> In kết quả.',
    takeaway: '1 phút = 60 giây, dịch thành code: giay = phut * 60.'
  },
  {
    id: 'build_022',
    game: 'builder',
    difficulty: 4,
    concept: 'split_digits_of_number',
    conceptNameVi: 'Tách chữ số hàng chục và hàng đơn vị',
    type: 'reorder',
    code: `# Muc tieu: Tach so 47 thanh hang chuc va hang don vi`,
    question: 'Sắp xếp các dòng lệnh thành chương trình tách chữ số của số 2 chữ số:',
    options: [
      { id: 'b1', text: 'so = 47' },
      { id: 'b2', text: 'hang_chuc = so // 10' },
      { id: 'b3', text: 'hang_dv = so % 10' },
      { id: 'b4', text: 'print("Chuc:", hang_chuc, "- Don vi:", hang_dv)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b1', 'b3', 'b2', 'b4']
    ],
    explanation: 'Có số 47 -> Chia nguyên // 10 lấy hàng chục (4) -> Chia dư % 10 lấy hàng đơn vị (7) -> In kết quả.',
    takeaway: '// 10 lấy phần đầu, % 10 lấy chữ số tận cùng.'
  },
  {
    id: 'build_023',
    game: 'builder',
    difficulty: 3,
    concept: 'list_reverse_manual',
    conceptNameVi: 'Tạo danh sách mới theo thứ tự ngược',
    type: 'reorder',
    code: `# Muc tieu: Tao danh sach dao nguoc tu danh sach 3 so`,
    question: 'Sắp xếp các dòng để đảo ngược danh sách 3 phần tử:',
    options: [
      { id: 'b1', text: 'goc = [10, 20, 30]' },
      { id: 'b2', text: 'dao_nguoc = [goc[2], goc[1], goc[0]]' },
      { id: 'b3', text: 'print("Danh sach dao nguoc:", dao_nguoc)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [['b1', 'b2', 'b3']],
    explanation: 'Có danh sách gốc -> Trích xuất từ đuôi về đầu [goc[2], goc[1], goc[0]] -> In danh sách đảo.',
    takeaway: 'Chỉ số [2], [1], [0] giúp sắp xếp các phần tử theo thứ tự mong muốn.'
  },
  {
    id: 'build_024',
    game: 'builder',
    difficulty: 3,
    concept: 'bmi_calculator_simple',
    conceptNameVi: 'Tính chỉ số BMI cơ bản',
    type: 'reorder',
    code: `# Muc tieu: Tinh BMI = can_nang / (chieu_cao ** 2)`,
    question: 'Sắp xếp các bước để tạo chương trình tính chỉ số BMI:',
    options: [
      { id: 'b1', text: 'can_nang = 50' },
      { id: 'b2', text: 'chieu_cao = 1.6' },
      { id: 'b3', text: 'bmi = can_nang / (chieu_cao ** 2)' },
      { id: 'b4', text: 'print("Chi so BMI la:", round(bmi, 2))' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b2', 'b1', 'b3', 'b4']
    ],
    explanation: 'Có cân nặng và chiều cao -> Áp dụng công thức chia cho chiều cao bình phương -> In kết quả làm tròn.',
    takeaway: 'Công thức thực tế: cân nặng / (chiều cao * chiều cao).'
  },
  {
    id: 'build_025',
    game: 'builder',
    difficulty: 4,
    concept: 'sign_checker_elif',
    conceptNameVi: 'Xét dấu một số (Dương, Âm, Bằng 0)',
    type: 'reorder',
    code: `# Muc tieu: Xet xem mot so la duong, am hay so 0`,
    question: 'Sắp xếp cấu trúc điều kiện 3 nhánh hoàn chỉnh:',
    options: [
      { id: 'b1', text: 'n = -8' },
      { id: 'b2', text: 'if n > 0:' },
      { id: 'b3', text: '    print("So duong")' },
      { id: 'b4', text: 'elif n < 0:' },
      { id: 'b5', text: '    print("So am")' },
      { id: 'b6', text: 'else:' },
      { id: 'b7', text: '    print("So khong")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
    validSequences: [['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7']],
    explanation: 'Có số n -> if n > 0 -> elif n < 0 -> else (số 0).',
    takeaway: 'Cấu trúc if - elif - else bao quát toàn bộ trục số thực.'
  },
  {
    id: 'build_026',
    game: 'builder',
    difficulty: 3,
    concept: 'print_multi_lines_poem',
    conceptNameVi: 'In bài thơ 3 câu',
    type: 'reorder',
    code: `# Muc tieu: In lan luot 3 cau tho`,
    question: 'Sắp xếp 3 câu in theo thứ tự hợp lý:',
    options: [
      { id: 'b1', text: 'print("Hoc lap trinh rat vui")' },
      { id: 'b2', text: 'print("Python that de hieu")' },
      { id: 'b3', text: 'print("Tuong lai dang cho don")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [
      ['b1', 'b2', 'b3'],
      ['b2', 'b1', 'b3'],
      ['b1', 'b3', 'b2']
    ],
    explanation: 'Các lệnh print thực thi tuần tự từ trên xuống dưới theo từng dòng.',
    takeaway: 'Chương trình máy tính chạy lần lượt từng dòng lệnh từ trên xuống dưới.'
  },
  {
    id: 'build_027',
    game: 'builder',
    difficulty: 3,
    concept: 'product_of_two_inputs',
    conceptNameVi: 'Nhập 2 số và tính tích',
    type: 'reorder',
    code: `# Muc tieu: Nhap 2 so tu ban phim roi nhan lai`,
    question: 'Sắp xếp các bước để tạo chương trình nhân 2 số nhập từ bàn phím:',
    options: [
      { id: 'b1', text: 'a = int(input("Nhap so thu nhat: "))' },
      { id: 'b2', text: 'b = int(input("Nhap so thu hai: "))' },
      { id: 'b3', text: 'tich = a * b' },
      { id: 'b4', text: 'print("Tich hai so la:", tich)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b2', 'b1', 'b3', 'b4']
    ],
    explanation: 'Nhập và ép kiểu số nguyên a, b -> Tính tich = a * b -> In kết quả.',
    takeaway: 'int(input(...)) kết hợp vừa nhập dữ liệu vừa ép kiểu số trong 1 dòng ngắn gọn.'
  },
  {
    id: 'build_028',
    game: 'builder',
    difficulty: 4,
    concept: 'list_max_search_loop',
    conceptNameVi: 'Thuật toán tìm phần tử lớn nhất trong danh sách',
    type: 'reorder',
    code: `# Muc tieu: Tim so lon nhat trong danh sach bang vong lap`,
    question: 'Sắp xếp các bước thành thuật toán tìm giá trị lớn nhất trong danh sách:',
    options: [
      { id: 'b1', text: 'nums = [14, 28, 9, 35, 21]' },
      { id: 'b2', text: 'max_val = nums[0]' },
      { id: 'b3', text: 'for x in nums:' },
      { id: 'b4', text: '    if x > max_val:' },
      { id: 'b5', text: '        max_val = x' },
      { id: 'b6', text: 'print("So lon nhat la:", max_val)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
    validSequences: [['b1', 'b2', 'b3', 'b4', 'b5', 'b6']],
    explanation: 'Gán max_val = phần tử đầu tiên -> Duyệt qua từng số x -> Nếu x lớn hơn max_val thì cập nhật max_val = x -> In kết quả.',
    takeaway: 'Thuật toán tìm max: Khởi tạo với phần tử đầu -> Duyệt và cập nhật khi gặp số lớn hơn.'
  },
  {
    id: 'build_029',
    game: 'builder',
    difficulty: 2,
    concept: 'print_border_box',
    conceptNameVi: 'In khung viền trang trí',
    type: 'reorder',
    code: `# Muc tieu: In hop thong bao co vien sao`,
    question: 'Sắp xếp các dòng để tạo hộp thông báo có viền sao bao quanh:',
    options: [
      { id: 'b1', text: 'print("**********")' },
      { id: 'b2', text: 'print("* PYTHON *")' },
      { id: 'b3', text: 'print("**********")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [['b1', 'b2', 'b3']],
    explanation: 'Viền sao trên -> Nội dung ở giữa -> Viền sao dưới.',
    takeaway: 'Tư duy bố cục: Phần mở đầu -> Nội dung chính -> Phần kết thúc.'
  },
  {
    id: 'build_030',
    game: 'builder',
    difficulty: 3,
    concept: 'convert_hours_minutes',
    conceptNameVi: 'Đổi phút sang dạng giờ và phút lẻ',
    type: 'reorder',
    code: `# Muc tieu: Doi 150 phut thanh 2 gio 30 phut`,
    question: 'Sắp xếp các dòng để đổi tổng số phút ra giờ và phút lẻ:',
    options: [
      { id: 'b1', text: 'tong_phut = 150' },
      { id: 'b2', text: 'gio = tong_phut // 60' },
      { id: 'b3', text: 'phut_le = tong_phut % 60' },
      { id: 'b4', text: 'print(tong_phut, "phut =", gio, "gio", phut_le, "phut")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b1', 'b3', 'b2', 'b4']
    ],
    explanation: 'Có 150 phút -> Chia nguyên cho 60 được 2 giờ -> Chia dư cho 60 được 30 phút -> In kết quả.',
    takeaway: '// 60 tìm số giờ nguyên, % 60 tìm số phút còn dư.'
  },
  {
    id: 'build_031',
    game: 'builder',
    difficulty: 3,
    concept: 'discount_final_price',
    conceptNameVi: 'Tính giá sau khi giảm 20%',
    type: 'reorder',
    code: `# Muc tieu: Tinh gia ban sau khi giam 20%`,
    question: 'Sắp xếp các bước để tính giá tiền sau khi được giảm giá:',
    options: [
      { id: 'b1', text: 'gia_goc = 200000' },
      { id: 'b2', text: 'tien_giam = gia_goc * 0.2' },
      { id: 'b3', text: 'gia_sau_giam = gia_goc - tien_giam' },
      { id: 'b4', text: 'print("Gia phai tra:", gia_sau_giam)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [['b1', 'b2', 'b3', 'b4']],
    explanation: 'Có giá gốc -> Tính số tiền được giảm -> Lấy giá gốc trừ số tiền giảm -> In số tiền thanh toán.',
    takeaway: 'Quy trình giải quyết vấn đề từng bước rõ ràng trên mã nguồn.'
  },
  {
    id: 'build_032',
    game: 'builder',
    difficulty: 4,
    concept: 'filter_positive_numbers',
    conceptNameVi: 'Lọc và in các số dương trong danh sách',
    type: 'reorder',
    code: `# Muc tieu: In cac so duong trong danh sach`,
    question: 'Sắp xếp các dòng thành chương trình lọc các số lớn hơn 0:',
    options: [
      { id: 'b1', text: 'ds_so = [-3, 5, -1, 8, 0, 12]' },
      { id: 'b2', text: 'for x in ds_so:' },
      { id: 'b3', text: '    if x > 0:' },
      { id: 'b4', text: '        print("So duong:", x)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [['b1', 'b2', 'b3', 'b4']],
    explanation: 'Có danh sách số -> Dùng for duyệt từng số -> Dùng if kiểm tra số > 0 -> In các số thỏa mãn.',
    takeaway: 'Vòng lặp for kết hợp với if bên trong là cấu trúc cơ bản để lọc dữ liệu.'
  },
  {
    id: 'build_033',
    game: 'builder',
    difficulty: 3,
    concept: 'calculate_speed',
    conceptNameVi: 'Tính vận tốc v = s / t',
    type: 'reorder',
    code: `# Muc tieu: Tinh van toc tu quang duong va thoi gian`,
    question: 'Sắp xếp các dòng lệnh thành chương trình tính vận tốc ô tô:',
    options: [
      { id: 'b1', text: 'quang_duong = 120' },
      { id: 'b2', text: 'thoi_gian = 2.5' },
      { id: 'b3', text: 'van_toc = quang_duong / thoi_gian' },
      { id: 'b4', text: 'print("Van toc la:", van_toc, "km/h")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b2', 'b1', 'b3', 'b4']
    ],
    explanation: 'Có quãng đường và thời gian -> Áp dụng công thức v = s / t -> In kết quả kèm km/h.',
    takeaway: 'Toán tử chia / cho ra kết quả vận tốc chính xác dưới dạng số thực.'
  },
  {
    id: 'build_034',
    game: 'builder',
    difficulty: 4,
    concept: 'sum_and_average_list',
    conceptNameVi: 'Tính tổng và trung bình cộng của danh sách',
    type: 'reorder',
    code: `# Muc tieu: Tinh tong va trung binh cong cac so trong list`,
    question: 'Sắp xếp các bước để tính giá trị trung bình của danh sách số:',
    options: [
      { id: 'b1', text: 'ds = [10, 20, 30, 40]' },
      { id: 'b2', text: 'tong = sum(ds)' },
      { id: 'b3', text: 'so_luong = len(ds)' },
      { id: 'b4', text: 'trung_binh = tong / so_luong' },
      { id: 'b5', text: 'print("Gia tri trung binh:", trung_binh)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4', 'b5'],
      ['b1', 'b3', 'b2', 'b4', 'b5']
    ],
    explanation: 'Có danh sách ds -> Dùng hàm sum() tính tổng -> Dùng hàm len() đếm số lượng -> Lấy tổng chia số lượng -> In kết quả.',
    takeaway: 'Công thức trung bình cộng: sum(ds) / len(ds).'
  },
  {
    id: 'build_035',
    game: 'builder',
    difficulty: 3,
    concept: 'print_multiplication_table_row',
    conceptNameVi: 'In một dòng trong bảng cửu chương 5',
    type: 'reorder',
    code: `# Muc tieu: In phep tinh 5 x 7 = 35`,
    question: 'Sắp xếp các dòng để tạo dòng tính toán bảng nhân 5:',
    options: [
      { id: 'b1', text: 'so1 = 5' },
      { id: 'b2', text: 'so2 = 7' },
      { id: 'b3', text: 'tich = so1 * so2' },
      { id: 'b4', text: 'print(so1, "x", so2, "=", tich)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4'],
      ['b2', 'b1', 'b3', 'b4']
    ],
    explanation: 'Có 2 thừa số -> Tính tích -> In ra định dạng bảng cửu chương "5 x 7 = 35".',
    takeaway: 'print() có thể in xen kẽ các biến và các ký tự toán học để tạo giao diện đẹp mắt.'
  },
  {
    id: 'build_036',
    game: 'builder',
    difficulty: 4,
    concept: 'score_grading_tiered',
    conceptNameVi: 'Xếp loại học sinh 4 mức',
    type: 'reorder',
    code: `# Muc tieu: Xep loai hoc sinh theo thang diem`,
    question: 'Sắp xếp thang xếp loại if-elif-else theo đúng thứ tự logic chuẩn:',
    options: [
      { id: 'b1', text: 'diem = 8.8' },
      { id: 'b2', text: 'if diem >= 9.0:' },
      { id: 'b3', text: '    print("Xuat sac")' },
      { id: 'b4', text: 'elif diem >= 8.0:' },
      { id: 'b5', text: '    print("Gioi")' },
      { id: 'b6', text: 'else:' },
      { id: 'b7', text: '    print("Co gang hon")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
    validSequences: [['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7']],
    explanation: 'Có điểm -> Kiểm tra >= 9.0 trước -> elif >= 8.0 -> else còn lại.',
    takeaway: 'Thang xếp loại nhiều mức bắt buộc phải xếp từ điều kiện cao nhất xuống thấp dần.'
  },
  {
    id: 'build_037',
    game: 'builder',
    difficulty: 2,
    concept: 'power_calculation',
    conceptNameVi: 'Tính lũy thừa bậc 3',
    type: 'reorder',
    code: `# Muc tieu: Tinh the tich hinh lap phuong V = a ** 3`,
    question: 'Sắp xếp các dòng để tính thể tích hình lập phương:',
    options: [
      { id: 'b1', text: 'canh = 4' },
      { id: 'b2', text: 'the_tich = canh ** 3' },
      { id: 'b3', text: 'print("The tich hinh lap phuong:", the_tich)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [['b1', 'b2', 'b3']],
    explanation: 'Có cạnh a = 4 -> Tính thể tích = a ** 3 = 64 -> In kết quả.',
    takeaway: '** 3 là phép nâng lên lũy thừa bậc 3.'
  },
  {
    id: 'build_038',
    game: 'builder',
    difficulty: 3,
    concept: 'list_replace_item_flow',
    conceptNameVi: 'Cập nhật và in danh sách',
    type: 'reorder',
    code: `# Muc tieu: Sua phan tu thu hai cua danh sach`,
    question: 'Sắp xếp các bước để thay thế phần tử trong danh sách:',
    options: [
      { id: 'b1', text: 'trai_cay = ["Tao", "Chuoi", "Cam"]' },
      { id: 'b2', text: 'trai_cay[1] = "Dua hau"' },
      { id: 'b3', text: 'print("Danh sach sau khi sua:", trai_cay)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3'],
    validSequences: [['b1', 'b2', 'b3']],
    explanation: 'Khai báo danh sách -> Gán thay thế tại chỉ số [1] -> In danh sách đã cập nhật.',
    takeaway: 'danh_sach[i] = gia_tri_moi để cập nhật phần tử.'
  },
  {
    id: 'build_039',
    game: 'builder',
    difficulty: 4,
    concept: 'while_loop_countdown',
    conceptNameVi: 'Vòng lặp đếm ngược xuất phát (3, 2, 1, GO!)',
    type: 'reorder',
    code: `# Muc tieu: Dem nguoc tu 3 ve 1 roi in XUAT PHAT`,
    question: 'Sắp xếp các dòng để hoàn thiện đồng hồ đếm ngược:',
    options: [
      { id: 'b1', text: 'dem = 3' },
      { id: 'b2', text: 'while dem > 0:' },
      { id: 'b3', text: '    print(dem)' },
      { id: 'b4', text: '    dem -= 1' },
      { id: 'b5', text: 'print("XUAT PHAT!")' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5'],
    validSequences: [['b1', 'b2', 'b3', 'b4', 'b5']],
    explanation: 'dem = 3 -> while dem > 0: -> in số dem -> giảm dem -= 1 -> Sau khi vòng lặp dừng thì in "XUAT PHAT!".',
    takeaway: 'Lệnh sau vòng lặp (không thụt lề) chỉ chạy sau khi vòng lặp kết thúc hoàn toàn.'
  },
  {
    id: 'build_040',
    game: 'builder',
    difficulty: 4,
    concept: 'grand_program_builder',
    conceptNameVi: 'Chương trình Mini: Máy tính giảm giá thành viên',
    type: 'reorder',
    code: `# Muc tieu: Nhap tien, kiem tra the VIP, tinh tien phai tra`,
    question: 'Sắp xếp hoàn chỉnh chương trình tính tiền thẻ thành viên VIP (giảm 10%):',
    options: [
      { id: 'b1', text: 'tong_tien = 300000' },
      { id: 'b2', text: 'la_vip = True' },
      { id: 'b3', text: 'if la_vip:' },
      { id: 'b4', text: '    thanh_toan = tong_tien * 0.9' },
      { id: 'b5', text: 'else:' },
      { id: 'b6', text: '    thanh_toan = tong_tien' },
      { id: 'b7', text: 'print("So tien phai tra:", thanh_toan)' }
    ],
    correctAnswers: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
    validSequences: [
      ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
      ['b2', 'b1', 'b3', 'b4', 'b5', 'b6', 'b7']
    ],
    explanation: 'Có tổng tiền và trạng thái VIP -> if la_vip tính giảm 10% (* 0.9), else giữ nguyên -> In số tiền thanh toán.',
    takeaway: 'Quy trình xây dựng chương trình hoàn chỉnh: Khởi tạo biến -> Rẽ nhánh điều kiện -> Xuất kết quả cuối cùng.'
  }
];
