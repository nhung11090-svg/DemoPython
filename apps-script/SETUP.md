# HƯỚNG DẪN KẾT NỐI GOOGLE SHEETS CHO GIÁO VIÊN (v3.0)

Hệ thống **Hành Trình Python** sử dụng **Google Sheets** làm **Source of Truth (Nguồn dữ liệu duy nhất)** để lưu trữ và đồng bộ dữ liệu giữa học sinh và giáo viên.

---

## 4 Bước Thiết Lập Google Apps Script:

### Bước 1: Mở Google Sheet
1. Mở file [Google Sheets](https://sheets.new) của bạn (ví dụ: `Hành Trình Python - Dữ Liệu Học Sinh`).
2. Vào menu **Tiện ích mở rộng** (Extensions) -> Chọn **Apps Script**.

### Bước 2: Dán mã Script và Khởi tạo Bảng tính
1. Xóa toàn bộ nội dung trong trình soạn thảo Apps Script.
2. Sao chép và dán toàn bộ nội dung từ file `apps-script/Code.gs`.
3. Nhấn nút **Lưu** (Biểu tượng đĩa mềm 💾).
4. *(Tùy chọn)* Chọn hàm `setupSpreadsheet` ở thanh công cụ và bấm **Chạy** (Run) để tự động tạo sẵn 2 sheet `SESSIONS` và `ANSWERS` với tiêu đề đẹp mắt.

### Bước 3: Triển khai Web App (Deploy)
1. Bấm nút **Triển khai** (Deploy) màu xanh ở góc trên bên phải -> Chọn **Tùy chọn triển khai mới** (New deployment).
2. Bấm vào biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại" -> Chọn **Ứng dụng web** (Web app).
3. Cấu hình triển khai:
   - **Mô tả**: `Hành Trình Python Webhook v3`
   - **Thực thi với tư cách**: **Tôi** (`Me`)
   - **Ai có quyền truy cập**: **Bất kỳ ai** (`Anyone`) *(Bắt buộc chọn Anyone để server backend có thể gửi và đọc dữ liệu)*.
4. Bấm **Triển khai** (Deploy) -> Bấm **Ủy quyền truy cập** (Authorize access) -> Đăng nhập tài khoản Google -> Chọn **Advanced (Nâng cao)** -> Chọn **Go to ... (unsafe)** -> Bấm **Allow (Cho phép)**.
5. Sao chép đường link **URL của ứng dụng web** (có dạng `https://script.google.com/macros/s/.../exec`).

---

### Bước 4: Cấu hình biến môi trường trên Vercel
Vào **Project Settings -> Environment Variables** trên Vercel và cấu hình:

1. **`GOOGLE_SHEETS_WEBHOOK_URL`**: Dán URL Web App ở Bước 3 (dạng `https://script.google.com/macros/s/.../exec`).
2. **`GOOGLE_SHEET_URL`**: Dán link bảng tính Google Sheet (dạng `https://docs.google.com/spreadsheets/d/.../edit`) để nút "MỞ GOOGLE SHEET" trong trang giáo viên hoạt động.
3. **`GOOGLE_SHEETS_WEBHOOK_SECRET`** (Tùy chọn): Khóa bí mật nếu bạn có đặt `WEBHOOK_SECRET` trong Apps Script Properties.

---

## 5 Thông số Kỹ thuật Quan trọng:

1. **Tên 2 sheet bắt buộc:**
   - `SESSIONS`: Lưu tổng hợp kết quả từng lượt chơi của học sinh (chống trùng theo `SessionID`).
   - `ANSWERS`: Lưu chi tiết từng câu hỏi học sinh đã trả lời (batch insert & chống trùng theo `EventID`).

2. **Các Script Properties hỗ trợ:**
   - `SPREADSHEET_ID`: (Chỉ cần nếu bạn tạo Script rời không liên kết trực tiếp với Sheet).
   - `WEBHOOK_SECRET` / `SECRET`: Khóa bí mật để xác thực webhook (tùy chọn).

3. **Field Secret trong JSON Payload:**
   - Backend gửi các trường: `secret`, `webhookSecret`, `key`.

4. **Response từ Apps Script:**
   - Khi ghi thành công: `{"status":"success", "success":true, "persisted":true, "sessionId":"...", "eventId":"...", "answersSaved":N}`
   - Khi đọc dữ liệu: `{"status":"success", "success":true, "totalSessions":N, "totalAnswers":N, "sessions":[...], "answers":[...], "fetchedAt":"..."}`
   - Khi có lỗi: `{"status":"error", "success":false, "persisted":false, "message":"<chi tiết lỗi>"}`

5. **Log Telemetry tại Server Backend:**
   - `[SHEETS_REQUEST_START]`
   - `[SHEETS_RESPONSE_STATUS]`
   - `[SHEETS_RESPONSE_BODY]`
   - `[SHEETS_WRITE_SUCCESS]`
   - `[SHEETS_WRITE_FAILED]`
