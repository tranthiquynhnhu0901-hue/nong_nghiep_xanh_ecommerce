# BẮT ĐẦU Ở ĐÂY

## 0. Nếu bạn mở `index.html` trên máy tính

**Hãy giải nén ZIP hoàn toàn trước**, không mở HTML ngay bên trong cửa sổ ZIP. Mở `index.html` ở thư mục gốc đã giải nén. Giao diện CSS và mã tương tác cơ bản đã được nhúng vào từng HTML, nên không còn phụ thuộc việc trình duyệt tìm thấy `public/style.css` khi mở bằng `file:///`. Các liên kết thư mục cũng được chuyển về `index.html` khi mở nội bộ trên ổ đĩa.

Các biểu mẫu đăng ký, thanh toán, báo giá và Xưởng tạo ảnh AI ở bản **HTML tĩnh** có thiết kế giao diện riêng nhưng không thể gửi dữ liệu. Chúng được khóa và ghi nhãn rõ để tránh hiểu nhầm là đã giao dịch. Chỉ bản Node.js mới có backend tiếp nhận dữ liệu và tích hợp AI qua API.

## 1. Muốn mở ngay giao diện bằng GitHub Pages

1. Giải nén ZIP, **tải toàn bộ file và thư mục bên trong ZIP** lên **gốc** repository GitHub. Bạn phải thấy `index.html` bên cạnh `package.json`. **Không tải nguyên ZIP lên repository để mong GitHub tự giải nén.**
2. Tại GitHub: `Settings` → `Pages` → `Deploy from a branch` → `main` và `/(root)` → `Save`.
3. Mở địa chỉ GitHub Pages mà GitHub cung cấp. Các đường dẫn sản phẩm và danh mục được xuất tương đối, phù hợp địa chỉ `/TEN-REPO/`.

Đây là **bản xem trước giao diện**: 119 trang HTML, 74 sản phẩm mẫu, 12 bài viết, tìm kiếm/lọc và giỏ hàng lưu trên trình duyệt. Không có đăng nhập, thu tiền, ghi đơn hoặc AI ngay trên GitHub Pages. Các nút dẫn đến trang cần backend hiển thị giải thích, không thực hiện giao dịch giả.

## 2. Muốn website có backend chạy thật

Cần thêm dịch vụ hỗ trợ **Node.js 22.13+** (VPS, Render, Railway hoặc hosting Node.js), URL HTTPS, đĩa lưu trữ bền vững, và biến môi trường theo `.env.example`. Xem `README.md` để chạy `npm start` và dùng trang `/quan-tri/anh-ai`.

**Không** đẩy `.env`, `storage/`, khóa API hoặc mật khẩu lên GitHub. Không bật giao dịch thương mại khi chưa xác minh sản phẩm, ảnh thật, tồn kho, thông tin pháp lý, thanh toán và giao hàng.

## 3. Kiểm tra mã nguồn

- `npm test`: kiểm thử chức năng Node.js.
- `npm run test:static`: kiểm tra toàn bộ HTML và đường dẫn trên bản GitHub Pages.
- `npm run export:pages`: xuất lại các trang HTML sau khi thay đổi dữ liệu mẫu trong mã nguồn. Các trang tĩnh không tự thay đổi khi sửa dữ liệu quản trị trên server.

**Đọc `BAO_CAO_KIEM_TRA.md` để biết phần đã có, phần còn thiếu và giới hạn kiểm thử.**


## MỚI: Xưởng AI tự tạo ảnh theo sản phẩm

Hướng dẫn đầy đủ tại [`HUONG_DAN_TAO_ANH_TU_DONG.md`](HUONG_DAN_TAO_ANH_TU_DONG.md). Đây là chức năng máy chủ Node.js, không hoạt động trên GitHub Pages. Có thể lập đợt 74 sản phẩm, 8 danh mục, 12 bài và banner, nhưng phải tự xác nhận chi phí, chờ hạn mức và duyệt ảnh.
