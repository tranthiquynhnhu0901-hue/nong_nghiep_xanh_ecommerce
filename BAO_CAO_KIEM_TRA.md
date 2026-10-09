# Báo cáo rà soát mã nguồn — 09/10/2026

## Bổ sung sửa lỗi giao diện trang con

- Phát hiện lỗi CSS không tải khi người dùng mở một trang HTML riêng bằng `file:///` hoặc thiếu thư mục `public`.
- Đã nhúng CSS và JavaScript vào từng HTML của **119 trang**, giữ nguyên các file gốc để có thể bảo trì.
- Đã làm nội dung **riêng** cho 6 trang tiếp nhận yêu cầu, 7 trang chính sách, đăng nhập, đăng ký, tài khoản, thanh toán, trang quản trị, Xưởng AI, giới thiệu và FAQ.
- Đã sửa liên kết điều hướng khi mở file trực tiếp trên máy tính (trỏ đến `index.html` thay vì thư mục).
- Đã bổ sung kiểm thử trang báo giá và tư vấn không còn dùng chung một mẫu, và sửa bộ kiểm tra để không quét nhầm chuỗi URL bên trong JavaScript nhúng.
- Đã đạt `npm test`: 6/6; `npm run test:static`: đạt trên 119 trang. **Chưa có xác nhận trực quan trên Chrome** vì môi trường Chromium không chụp được ảnh; các thiết bị thực và Lighthouse vẫn chưa được kiểm tra.

## Kết luận

**CHƯA đạt điều kiện mở website thương mại điện tử đầy đủ chỉ bằng GitHub Pages.** Mã nguồn gồm (A) bản dựng HTML tĩnh để xem giao diện và (B) server Node.js/SQLite để thử các chức năng động. Kinh doanh thật cần triển khai backend riêng, thêm dịch vụ và nội dung đã xác minh.

## 1. Đã có và đã kiểm tra

- `index.html` ở gốc và 119 trang `index.html` tĩnh; nội dung hiển thị tiếng Việt. HTML tương đối để dùng với URL repository GitHub Pages, có `.nojekyll` và trang `404.html`.
- 74 sản phẩm mẫu, 8 nhóm danh mục cấp 1, 12 bài viết mẫu. Các trang chi tiết sản phẩm và bài viết có đường dẫn riêng.
- CSS responsive, đã sửa điều hướng mở danh mục ở độ rộng điện thoại 620px trở xuống (menu bị ẩn trong bản trước).
- Bản xem trước có tìm kiếm/lọc, giỏ hàng lưu trong trình duyệt; **không thanh toán thật**.
- Backend Node.js tạo/nhận đơn thử nghiệm, SQLite, đăng ký/đăng nhập, phân quyền quản trị, trang sản phẩm/bài viết/cài đặt và thư viện hình ảnh.
- Xưởng AI có mã gọi OpenAI Images API để tạo mới và chỉnh sửa qua máy chủ, lưu ảnh về `storage/uploads/`; không trả ảnh cố định khi chưa có key.
- Kiểm thử tích hợp bằng `npm test`; kiểm tra liên kết trang tĩnh bằng `npm run test:static`.

## 2. Thiếu hoặc chưa đủ để kinh doanh thực tế

| Mảng | Tình trạng hiện nay | Cần bổ sung |
|---|---|---|
| Nền tảng GitHub Pages | Chỉ lưu HTML/CSS/JS tĩnh | Triển khai backend Node.js ngoài GitHub Pages để có đơn hàng, tài khoản, AI |
| Hình ảnh sản phẩm | 74 sản phẩm mẫu chưa có ảnh chụp xác thực, hiển thị placeholder | Tải ảnh chụp thật, xác minh nguồn gốc, tối ưu và đồng bộ hình ảnh |
| Banner và hình bài viết | Dùng các URL Unsplash bên ngoài, phụ thuộc mạng và nguồn bên thứ ba | Thay bằng ảnh có quyền sử dụng, lưu tại hosting/CDN của bạn |
| Thanh toán | COD và chuyển khoản chỉ chọn phương thức; chưa có QR ngân hàng thật, webhook, đối soát, hoàn tiền | Cấu hình tài khoản thật và tích hợp cổng thanh toán/đối soát an toàn |
| Vận chuyển | Phí vận chuyển 0 đồng trong mã nguồn, ghi chờ xác nhận | Bảng phí thực, đối tác vận chuyển, giao hàng cây sống và hàng nặng, mã vận đơn |
| Xưởng AI | Có API call thật nhưng **chưa kiểm tra tạo ảnh thành công bằng API key có phí** | OPENAI_API_KEY, quyền dùng mô hình, tài khoản thanh toán API, kiểm thử thật và ngân sách |
| Chỉnh sửa ảnh | Có chỉnh bằng mô tả; chưa có bộ công cụ cắt/xóa nền/chèn giá/nhãn và xử lý batch | Xây công cụ biên tập ảnh nâng cao nếu cần |
| Sản phẩm | Có tên, mã, giá mẫu, mô tả, hướng dẫn; chưa có thư viện ảnh/biến thể/thuộc tính đủ cho mọi ngành | Bổ sung dữ liệu thật, nhóm con, ảnh nhiều góc, nhà cung cấp, thông số, hồ sơ ngành hàng |
| Khách hàng | Đăng ký, đăng nhập, xem đơn; chưa có khôi phục mật khẩu bằng email, địa chỉ lưu, wishlist, so sánh, đánh giá thật | Bổ sung luồng email, hồ sơ khách và các module bổ sung |
| Quản trị | Có sản phẩm, đơn, bài viết, ảnh, yêu cầu và branding cơ bản | Quyền nhiều cấp, xóa/khôi phục, quản lý coupon, tồn kho nâng cao, lịch sử thao tác, đối tác |
| Nội dung pháp lý | Là hướng dẫn/điều khoản mẫu, chưa đủ nội dung chính thức | Tên đơn vị, MST, địa chỉ, hotline, chính sách có hiệu lực và thủ tục pháp lý liên quan |
| SEO | Backend có metadata, sitemap, robots; GitHub Pages đang noindex vì dữ liệu mẫu | Chỉ bật index sau khi có site chính thức, cập nhật SEO nội dung, đo Search Console/Lighthouse |
| Hiệu năng & QA | Kiểm thử API cơ bản và kiểm tra liên kết tĩnh | Chạy Lighthouse, test thiết bị thật, theo dõi tốc độ ảnh, bảo mật và tải cao |
| Triển khai bền vững | Có Dockerfile, Compose và hướng dẫn | HTTPS, domain, đĩa lưu bền vững, backup SQLite, giám sát và cảnh báo |

## 3. Kiểm thử chưa thể thực hiện trong môi trường bàn giao

- Không có API key người sử dụng nên không test tạo/chỉnh ảnh AI có phí.
- Không có tài khoản dịch vụ vận chuyển, thanh toán hoặc ngân hàng thật.
- Không kết nối được dịch vụ tải ảnh ngoài để xác minh các URL Unsplash trong môi trường này.
- Trình duyệt Chromium tại môi trường chạy thử không tạo được screenshot, vì vậy **chưa thể công bố đã kiểm tra hình ảnh thủ công cho 320/360/390/430/768/1024/1440px**, cũng chưa có điểm Lighthouse.

## 4. Mức độ sẵn sàng

**Sẵn sàng để:** tải lên repository và bật GitHub Pages **bản xem trước**; chạy thử backend cục bộ khi có Node.js.

**Chưa sẵn sàng để:** chỉ tải lên GitHub rồi bán hàng thật, tạo ảnh AI không cần cấu hình, thu tiền tự động hoặc công bố thông tin sản phẩm chưa được xác minh.

Mọi phần còn thiếu phải được triển khai và kiểm thử trước khi đưa vào vận hành thương mại thực tế. Không đánh dấu thành công chỉ nhờ có giao diện nút bấm.

---

## Cập nhật mới: Tự tạo ảnh AI dựa trên sản phẩm (bản sau)

- Đã bổ sung `src/auto-ai.js`: lập mô tả ảnh dựa trên tên, danh mục và mô tả có sẵn của 74 sản phẩm, 8 danh mục, 12 bài viết, 1 banner.
- Đã bổ sung các lựa chọn tạo ảnh riêng hoặc hàng loạt trong `/quan-tri/anh-ai`; cần quản trị đăng nhập, xác nhận số lượt và phí API.
- Hàng đợi SQLite xử lý tuần tự, trả tiến độ qua API, tự dừng ở hạn mức; máy chủ khởi động lại cần tiếp tục bằng tay.
- Ảnh mới để chờ duyệt ở thư viện, đề xuất vị trí gán; không tự đăng. Ảnh AI bị cấm dùng làm ảnh đại diện nhóm hàng có yêu cầu xác minh đặc biệt và sản phẩm đã xác thực.
- Bài kiểm thử sử dụng mock API, KHÔNG tạo ảnh thật trên dịch vụ tính phí. Kết quả kiểm thử tính năng mới: **10/10 bài backend** và **119/119 trang tĩnh** vượt qua kiểm tra đường dẫn. Chưa thực hiện kiểm thử chụp màn hình Chrome thành công trong môi trường này.
- **GitHub Pages không chạy được tính năng này**. Cần deploy Node.js, cấu hình API key và persistent disk. Xem `HUONG_DAN_TAO_ANH_TU_DONG.md`.
