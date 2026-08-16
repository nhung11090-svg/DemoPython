# HƯỚNG DẪN KẾT NỐI GOOGLE SHEETS CHO GIÁO VIÊN

Hệ thống **Hành Trình Python** hỗ trợ tự động lưu trữ toàn bộ điểm số, tiến độ và từng câu trả lời chi tiết của học sinh vào Google Sheets.

---

## 3 Bước Cài Đặt Đơn Giản:

### Bước 1: Tạo Google Sheet mới
1. Truy cập [Google Sheets](https://sheets.new) và tạo một bảng tính mới (Đặt tên: `Dữ Liệu Học Python Lớp 8`).
2. Vào menu **Tiện ích mở rộng** (Extensions) -> Chọn **Apps Script**.

### Bước 2: Dán mã Script
1. Xóa toàn bộ nội dung mặc định trong trình biên tập Apps Script.
2. Sao chép và dán toàn bộ nội dung từ file `apps-script/Code.gs` vào.
3. Nhấn nút **Lưu** (Biểu tượng đĩa mềm 💾).

### Bước 3: Triển khai Web App (Deploy)
1. Bấm nút **Triển khai** (Deploy) màu xanh ở góc trên bên phải -> Chọn **Tùy chọn triển khai mới** (New deployment).
2. Chọn loại: **Ứng dụng web** (Web app).
3. Cấu hình:
   - Mô tả: `PyQuest Receiver v1`
   - Thực thi với tư cách: **Tôi** (`Me`)
   - Ai có quyền truy cập: **Bất kỳ ai** (`Anyone`)
4. Bấm **Triển khai** (Deploy) và cấp quyền truy cập khi Google hỏi.
5. Sao chép đường link **URL của ứng dụng web** (có dạng `https://script.google.com/macros/s/.../exec`).

---

### Bước 4: Nhập link vào Web App
- Khai báo biến `GOOGLE_SHEET_MACRO_URL` trong file `.env` hoặc cấu hình Settings của ứng dụng.
- Dữ liệu học sinh sẽ được cập nhật thời gian thực vào 2 sheet:
  1. `TongHop_HocSinh`: Điểm tổng, % đúng, danh hiệu.
  2. `NhatKy_ChiTiet`: Từng câu hỏi đúng/sai và thời gian làm bài.
