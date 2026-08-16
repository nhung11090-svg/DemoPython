# HƯỚNG DẪN KẾT NỐI GOOGLE SHEETS CHO GIÁO VIÊN

Hệ thống **Hành Trình Python** sử dụng **Google Sheets** làm **Source of Truth (Nguồn dữ liệu bền vững duy nhất)** để lưu trữ và đọc dữ liệu giữa học sinh và giáo viên.

---

## 4 Bước Thiết Lập Google Apps Script:

### Bước 1: Tạo Google Sheet mới
1. Truy cập [Google Sheets](https://sheets.new) và tạo một bảng tính mới (Đặt tên ví dụ: `Hành Trình Python - Dữ Liệu Học Sinh`).
2. Vào menu **Tiện ích mở rộng** (Extensions) -> Chọn **Apps Script**.

### Bước 2: Dán mã Script
1. Xóa toàn bộ nội dung mặc định trong trình biên tập Apps Script.
2. Sao chép và dán toàn bộ nội dung từ file `apps-script/Code.gs` vào.
3. Nhấn nút **Lưu** (Biểu tượng đĩa mềm 💾).

### Bước 3: Triển khai Web App (Deploy)
1. Bấm nút **Triển khai** (Deploy) màu xanh ở góc trên bên phải -> Chọn **Tùy chọn triển khai mới** (New deployment).
2. Nhấn vào biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại" -> Chọn **Ứng dụng web** (Web app).
3. Cấu hình triển khai:
   - **Mô tả**: `Hành Trình Python Webhook v2`
   - **Thực thi với tư cách**: **Tôi** (`Me`)
   - **Ai có quyền truy cập**: **Bất kỳ ai** (`Anyone`) *(Bắt buộc chọn Anyone để backend server có thể gọi ghi/đọc dữ liệu)*.
4. Bấm **Triển khai** (Deploy) -> Nhấn **Ủy quyền truy cập** (Authorize access) -> Chọn tài khoản Google của bạn -> Bấm Advanced/Nâng cao -> Chọn *Go to Untitled project (unsafe)* -> Nhấn Allow.
5. Sao chép đường link **URL của ứng dụng web** (có dạng `https://script.google.com/macros/s/.../exec`).

---

### Bước 4: Cấu hình biến môi trường trên Vercel / Server
Thêm các biến môi trường sau vào Settings -> Environment Variables trên Vercel:

1. **`GOOGLE_SHEETS_WEBHOOK_URL`**: Dán URL Web App vừa sao chép ở Bước 3 (ví dụ: `https://script.google.com/macros/s/.../exec`).
2. **`GOOGLE_SHEET_URL`** (Tùy chọn): Dán link xem trực tiếp bảng tính Google Sheet để giáo viên có nút bấm mở nhanh.
3. **`GOOGLE_SHEETS_WEBHOOK_SECRET`** (Tùy chọn): Khóa bí mật nếu muốn tăng cường bảo mật.

---

## Cấu trúc dữ liệu tự động tạo trong Google Sheet:
Hệ thống sẽ tự động tạo 2 sheet khi có dữ liệu đầu tiên:

1. **Sheet `SESSIONS`**:
   - `Timestamp`, `SessionID`, `StudentName`, `Class`, `StartTime`, `EndTime`, `DurationSeconds`
   - `PredictScore`, `VariableScore`, `BugScore`, `IfScore`, `BuilderScore`, `BossScore`
   - `CorrectAnswers`, `TotalQuestions`, `AccuracyPercent`, `TotalXP`, `Badge`, `Completed`

2. **Sheet `ANSWERS`**:
   - `Timestamp`, `EventID`, `SessionID`, `StudentName`, `Class`, `Game`
   - `QuestionID`, `Difficulty`, `Concept`, `SelectedAnswer`, `CorrectAnswer`
   - `IsCorrect`, `TimeSpentSeconds`
