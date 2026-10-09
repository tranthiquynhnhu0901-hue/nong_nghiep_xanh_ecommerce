# Biên bản bàn giao — ngày 09/10/2026

## Những phần có mã nguồn và được kiểm thử tự động

- 74 mặt hàng mẫu, 8 danh mục, 12 bài viết mẫu; giao diện khách và trang quản trị bằng tiếng Việt.
- Website tĩnh 119 trang HTML, `index.html` ở gốc, URL chuẩn GitHub Pages `/nong_nghiep_xanh_ecommerce/`, canonical 119 URL và sitemap chỉ chứa trang đã được phép index.
- Thanh điều hướng, giỏ hàng xem thử, các trang tài khoản, đơn hàng, chính sách; backend Node.js + SQLite khi triển khai ngoài GitHub Pages.
- Hàng đợi ảnh AI từ dữ liệu sản phẩm/banner/danh mục/bài viết, tự chạy trên backend khi chủ site bật `AI_AUTO_ON_START=1` và đặt API key. Có giới hạn số lượt, không lộ khóa phía client, ảnh chờ duyệt.
- Bộ thử backend gồm 11 ca (`npm test`), kiểm tra tĩnh `npm run test:static`.

## CHƯA được chứng nhận "hoàn thiện để kinh doanh thực tế"

1. Ảnh mẫu hiện có là hình *minh họa chung*, **không phải 74 ảnh chụp đúng mặt hàng**; chưa đóng bộ ảnh địa phương vào ZIP. Các ảnh minh họa dùng nguồn ảnh ngoài cần Internet.
2. GitHub Pages không tự tạo ảnh AI. Node.js và API key vẫn bắt buộc; AI tạo ảnh **khi backend hoạt động**, không phải khi mở tệp HTML trên máy.
3. Chưa tích hợp cổng thanh toán ngân hàng/QR xác nhận được, vận chuyển và đối soát thật; đang có chế độ đơn thử nghiệm.
4. Chưa xác minh pháp lý/giá/tồn kho/giấy phép/nguồn cung sản phẩm hoặc chính sách doanh nghiệp.
5. Chưa thử tạo ảnh trả phí thực tế, chưa kiểm duyệt chất lượng 74 ảnh thành phẩm, chưa kiểm tra giao diện thực tế trên nhiều thiết bị và Lighthouse. Chromium trong môi trường kiểm thử không chụp được ảnh vì lỗi khởi chạy.
6. Chưa có quyền để tự commit/push lên repository GitHub của chủ sở hữu; ZIP chỉ là gói bàn giao mã nguồn.
7. Website chưa có các tính năng mở rộng hoàn chỉnh như thanh toán ví điện tử, đăng nhập khôi phục mật khẩu bằng email, tích hợp nhiều đơn vị vận chuyển.

### Các bước cần thực hiện trước khi gọi là bản hoàn thiện

- Cấu hình tên thương hiệu, địa chỉ, hotline, thông tin đăng ký kinh doanh và chính sách được duyệt.
- Cung cấp danh sách SKU/chứng nhận/hình ảnh sản phẩm thực, xác minh từng sản phẩm.
- Chọn dịch vụ lưu trữ backend và ổ đĩa bền vững, khóa API AI, giới hạn chi phí.
- Kiểm thử thanh toán, đơn hàng thực, vận chuyển; kiểm duyệt toàn bộ ảnh AI.
- Chạy thử thực tế trên Chrome/Safari/Firefox, trên màn hình điện thoại và kiểm tra Google Search Console/Lighthouse.

**Không đặt API key vào GitHub repo công khai.**
