# Xem giao diện trên GitHub Pages

**Cập nhật sửa lỗi hiển thị:** Nếu trước đây một số trang chỉ hiện chữ đen, liên kết xanh và không có bố cục khi mở qua `file:///`, đó là vì đường dẫn đến CSS không được nạp. Bản xuất mới nhúng trực tiếp CSS và JavaScript vào toàn bộ 119 trang HTML. Mở `index.html` sau khi **giải nén toàn bộ ZIP**. Các trang liên hệ, báo giá, đăng ký đại lý, tư vấn và chính sách đã có nội dung riêng thay vì chỉ lặp một thông báo.

**Lưu ý:** Đây là giao diện xem trước, các biểu mẫu cần backend được vô hiệu hóa minh bạch; không được hiểu là đã gửi yêu cầu, tạo tài khoản, thu tiền hoặc tạo ảnh AI trên GitHub Pages.


Thư mục gốc đã có `index.html`, `san-pham/index.html`, `danh-muc/.../index.html`, `kien-thuc-nong-nghiep/.../index.html`, v.v. Đây là **bản dựng tĩnh xem giao diện**, đi kèm dự án Node.js đầy đủ.

## Cách đưa lên GitHub

1. Giải nén ZIP bản đã rà soát. **Tải các file và thư mục nằm ngay bên trong ZIP** lên thư mục gốc repository GitHub (đặc biệt phải thấy `index.html` ngay bên cạnh `package.json`). **Không chỉ tải một file ZIP lên GitHub** rồi mong nó tự chạy. Không đưa `.env` hoặc `storage/` lên GitHub.
2. Vào GitHub → `Settings` → `Pages` → `Build and deployment` → chọn `Deploy from a branch`.
3. Chọn branch `main`, thư mục `/ (root)`, nhấn `Save`.
4. Xem website tại `https://TEN-TAI-KHOAN.github.io/TEN-REPOSITORY/` sau khi Pages báo triển khai xong.

Các đường dẫn được dựng tương đối nên chạy được khi repo không đặt ở root tên miền.

## Phân biệt hai chế độ

- **GitHub Pages:** chỉ xem giao diện, tìm kiếm/lọc sản phẩm phía trình duyệt, đọc bài viết, thử giỏ hàng lưu trên thiết bị. Không nhận đơn, không gửi liên hệ, không có đăng nhập, quản trị hoặc AI trên Pages. Có nhãn thông báo bản xem trước ở đầu mỗi trang.
- **Node.js hosting:** chạy `npm start` để có website thương mại điện tử với tài khoản, đơn hàng, trang quản trị và Xưởng tạo ảnh AI cần API key. Xem `README.md` để thiết lập an toàn trước khi bán hàng.

## Khi sửa giao diện/dữ liệu trong mã nguồn

Bản HTML trên GitHub Pages được xuất sẵn tại thời điểm đóng gói, không tự cập nhật theo cơ sở dữ liệu. Muốn dựng lại bản xem trước, cần Node.js 22.13+ và chạy:

```bash
node --experimental-sqlite tools/export-pages.mjs
```

Những trang tĩnh không sử dụng tài khoản/đơn hàng thật. Nếu muốn website **bán hàng thật** không cần chạy máy tính của bạn, dùng Render, Railway, VPS hoặc hosting Node.js có ổ lưu trữ bền vững, thêm HTTPS và cấu hình dịch vụ.
