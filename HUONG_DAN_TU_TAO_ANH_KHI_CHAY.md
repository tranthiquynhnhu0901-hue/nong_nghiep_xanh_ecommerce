# Tạo ảnh chân thực tự động khi chạy website — không nhập từng mô tả

## Hai môi trường KHÁC NHAU

- **GitHub Pages** (`https://tranthiquynhnhu0901-hue.github.io/nong_nghiep_xanh_ecommerce/`): bản HTML tĩnh có trang chủ, 74 sản phẩm mẫu, 12 bài hướng dẫn, ảnh chụp minh họa *từ liên kết ảnh bên ngoài*. **Không thể gọi API tạo ảnh mới**, không có đăng nhập/đơn hàng thật hoặc cơ sở dữ liệu. Tệp `index.html` nằm ở thư mục gốc gói GitHub Pages.
- **Node.js 22.13+ với hosting backend và bộ nhớ bền vững**: website động có quản trị riêng, hàng đợi ảnh, API tạo/chỉnh ảnh; có thể tự khởi tạo tạo ảnh khi máy chủ chạy. Chỉ chạy khi đã thiết lập tài khoản quản trị và khóa API thật.

## Bật một lần rồi hệ thống tự chạy khi khởi động

1. Dùng bản mã nguồn Node.js. Tạo `.env` theo `.env.example` (đừng commit `.env` lên GitHub).
2. Tạo tài khoản API có thanh toán/đủ hạn mức; điền `OPENAI_API_KEY=...` trên máy chủ, KHÔNG điền vào JavaScript phía khách.
3. Đặt các biến dưới đây trong `.env`:

```
OPENAI_IMAGE_MODEL=gpt-image-1.5
AI_AUTO_ON_START=1
AI_AUTO_TARGETS=all
AI_AUTO_DAILY_LIMIT=5
AI_AUTO_BATCH_SIZE=3
AI_MAX_PER_HOUR=10
AI_MAX_PER_DAY=30
```

4. Bật website bằng `npm start`. Sau khi backend khởi động, chương trình **tự đọc dữ liệu** banner, danh mục, 74 sản phẩm và 12 bài viết; chỉ yêu cầu những mục chưa có ảnh và chưa từng được đưa vào hàng đợi. Không cần bấm nút tạo từng ảnh, không cần nhập mô tả thủ công.
5. Hệ thống gọi API ảnh thật qua backend, lưu ảnh sinh được vào `DATA_DIR/uploads`, tạo tiến độ tại `Quản trị → Xưởng tạo ảnh AI`, và kiểm soát giới hạn chi phí bằng hạn mức lượt gọi. Mỗi ảnh mới **chờ quản trị viên duyệt** tại `Quản trị → Thư viện hình ảnh` trước khi được gắn vào banner/danh mục/bài viết/sản phẩm.

**Quan trọng:** Không thể có ảnh vừa tạo hiển thị lập tức khi mở trang lần đầu; API cần thời gian tạo. Để tránh sai hàng hóa, ảnh AI sản phẩm không được tự dùng làm ảnh chụp sản phẩm thật. Nếu không có khóa API hay chưa bật biến cấu hình, chức năng tự tạo ảnh không chạy và sẽ hiện trạng thái chưa kết nối, KHÔNG trả ảnh giả.

Chỉ bật `AI_AUTO_ON_START=1` sau khi bạn đồng ý có thể phát sinh **chi phí thực tế cho mỗi ảnh**. Mặc định là `0` để tránh trả phí ngoài ý muốn. Nếu máy chủ bị gián đoạn khi tạo, hệ thống không tự gọi lại ngay ảnh đang chạy dở để tránh phát sinh phí trùng. Ảnh đã tạo sẽ không tự bị tạo lại sau khi khởi động website nhiều lần.

## Xuất ảnh đã duyệt lên GitHub Pages

Ảnh được tạo trên **backend** không tự xuất hiện trong GitHub Pages vì hai dịch vụ là hai môi trường khác nhau. Sau khi duyệt và gán ảnh trên backend, hãy dùng chính dữ liệu `storage/` của backend, chạy:

```
npm run export:pages:public
npm run test:static
```

Công cụ xuất sẽ cập nhật HTML theo URL repo GitHub và sao chép các ảnh đang được gán vào thư mục `uploads/`. Sau đó, chỉ tải các tệp **HTML/CSS/JS/ảnh tĩnh** lên nhánh `main` (không tải khóa API, SQLite, storage hay file cấu hình riêng tư). Cập nhật GitHub Pages vẫn cần commit và push; đây không phải cơ chế đồng bộ theo thời gian thực.

## Tình trạng thực tế

- Đã có mã gọi API tạo/chỉnh ảnh, lưu thư viện, xếp hàng có giới hạn, giao diện xem tiến độ, kiểm duyệt ảnh, áp dụng ảnh vào nội dung.
- Đã có kiểm thử bằng API **mô phỏng**, xác nhận hệ thống tự gọi API sau khi khởi động, không cần người dùng nhấn tạo, và giữ ảnh chờ duyệt.
- **Chưa thử bằng khóa API có tính phí thực**, chưa kiểm chứng ảnh có phản ánh đúng cây giống hoặc hàng được bán, chưa đo Lighthouse thực tế.
- **Không có 74 ảnh chụp sản phẩm đã xác minh đóng sẵn trong ZIP**; ảnh chụp mẫu chung từ nguồn bên ngoài được gắn nhãn minh họa. Trước khi bán hàng phải thay bằng ảnh thật đúng sản phẩm hoặc duyệt rõ ràng.
