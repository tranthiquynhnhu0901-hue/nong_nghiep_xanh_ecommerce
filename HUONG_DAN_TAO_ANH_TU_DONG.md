# XƯỞNG TẠO ẢNH AI TỰ ĐỘNG — HƯỚNG DẪN TIẾNG VIỆT

## Cách kích hoạt

1. Cần hosting Node.js 22.13+ (hoặc Docker), có ổ đĩa lưu dữ liệu lâu dài. GitHub dùng lưu mã nguồn; **GitHub Pages không thể chạy AI/backend**.
2. Chép `.env.example` thành `.env`, đặt `ADMIN_EMAIL`, `ADMIN_PASSWORD` và `OPENAI_API_KEY` của tài khoản sử dụng Images API có quyền và hạn mức phù hợp. Mô hình mẫu: `OPENAI_IMAGE_MODEL=gpt-image-1` (chỉ sử dụng nếu còn được nhà cung cấp hỗ trợ trên tài khoản). Không gửi khóa qua trình duyệt hay commit lên GitHub.
3. Chạy `npm start`. Đăng nhập tài khoản quản trị tại `/dang-nhap` → vào `/quan-tri/anh-ai`.
4. Trong mục **Tự tạo ảnh phù hợp nội dung website**, chọn:
   - **Một sản phẩm**: chọn tên sản phẩm trong danh sách.
   - **Sản phẩm thiếu ảnh/chưa có đề xuất**: chỉ chọn sản phẩm chưa có ảnh và không có tác vụ AI chờ xử lý/chờ duyệt.
   - **Tất cả sản phẩm**: tạo ảnh minh họa gắn tên từng mặt hàng trong cơ sở dữ liệu.
   - **Tất cả danh mục**, **Tất cả bài viết**, **Banner trang chủ**, hoặc **Toàn bộ**.
5. Xem số lượt API dự kiến và hạn mức còn lại. Tích xác nhận chi phí, nhấn **Bắt đầu tạo ảnh tự động** và xác nhận thêm một lần.
6. Theo dõi tiến độ và trạng thái. Ảnh tạo xong vẫn ở trạng thái **chờ duyệt**; có thể tạm dừng hoặc tiếp tục sau khi hạn mức được làm mới.
7. Vào **Thư viện hình ảnh**, xem từng ảnh → **Duyệt hình ảnh** → dùng vị trí **★ Vị trí AI đề xuất** hoặc chọn nơi khác → **Sử dụng**. Chỉ sau bước này mới gắn ảnh lên website.

## Giới hạn & chi phí

- Dữ liệu mẫu ban đầu: **74 sản phẩm + 8 danh mục + 12 bài viết + 1 banner = 95 ảnh** nếu chọn Toàn bộ. Mỗi ảnh tương ứng một lượt gọi dịch vụ có thể tính phí; không có giá cố định trong mã nguồn.
- Mặc định `AI_MAX_PER_HOUR=10`, `AI_MAX_PER_DAY=30` tính trên cùng tài khoản quản trị (bao gồm tạo thủ công); một đợt 95 ảnh **không thể hoàn tất trong ngày** với cấu hình này. Bạn phải quay lại **Tiếp tục** sau khi hạn mức được làm mới. Có thể thay giới hạn trong `.env` sau khi cân nhắc ngân sách của mình.
- Nếu API chưa cấu hình hoặc hết quyền sử dụng, hệ thống hiển thị lỗi rõ ràng, **không trả ảnh giả**.
- Sau khi khởi động lại máy chủ, đợt tạo cần tiếp tục thủ công. Ảnh đang được API xử lý lúc mất điện/mất kết nối có thể đã bị tính phí; phải kiểm tra hóa đơn trước khi thử lại.
- Hàng đợi trong SQLite chỉ an toàn khi chạy một tiến trình Node.js ghi vào ổ đĩa bền vững; nếu muốn scale nhiều phiên bản, phải xây dựng hàng đợi phân tán.

## Lưu ý an toàn, tính xác thực

- Ảnh AI được tạo từ **tên và mô tả**, không phải ảnh chụp sản phẩm thật; kết quả có thể không đúng giống cây hay kích thước sản phẩm. Không dùng ảnh minh họa làm bằng chứng về hàng hóa.
- Hệ thống **không cho dùng ảnh AI làm ảnh đại diện** đối với nhóm phân bón, chế phẩm sinh học, sản phẩm bảo vệ cây trồng hoặc sản phẩm được đánh dấu đã xác minh. Các mặt hàng này nên dùng ảnh thật có hồ sơ.
- Ảnh AI ở những sản phẩm minh họa khác sẽ có nhãn **Ảnh AI minh họa — chưa xác thực sản phẩm** khi được quản trị viên duyệt và áp dụng.
- Không tạo thông tin chứng nhận, thuốc, thành phần, nhãn hàng hay công dụng giả. Người quản trị phải kiểm tra thủ công trước khi đưa lên website.

## Những thứ KHÔNG được hiểu là đã hoàn thiện

- Chưa tích hợp khóa OpenAI của bạn nên **chưa thử tạo ảnh có tính phí thực tế**; bài kiểm thử sử dụng API mô phỏng và ảnh PNG thử nghiệm.
- Chưa có kiểm duyệt thị giác bằng mô hình riêng, chưa tự dự đoán chi phí thành tiền, chưa có hàng đợi đa máy chủ, và không bảo đảm tính đúng đắn sinh học của ảnh.
- GitHub Pages chỉ hiển thị trang tĩnh xem trước; muốn sử dụng Xưởng AI phải đưa ứng dụng Node.js lên hosting.
