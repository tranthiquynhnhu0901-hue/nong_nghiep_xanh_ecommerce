# Những điều phải hoàn thiện trước khi thu tiền thật

Mã nguồn này đã có website, quản trị và luồng tạo đơn thực, nhưng dữ liệu giao dịch khởi tạo **là minh họa**. Không dùng ngay để thu tiền khi chưa hoàn tất các bước dưới đây.

- [ ] Cung cấp thông tin pháp nhân, giấy tờ, địa chỉ và kênh chăm sóc khách hàng chính xác.
- [ ] Thay thông số/giá/ảnh/tồn kho của **74 sản phẩm mẫu** bằng dữ liệu xác thực; ẩn sản phẩm chưa đủ hồ sơ.
- [ ] Kiểm tra điều kiện pháp lý của từng nhóm vật tư, thuốc/chế phẩm, quy định quảng cáo và vận chuyển.
- [ ] Duyệt lại **12 bài viết** để phù hợp vùng trồng, thời vụ và phương pháp canh tác được khuyến cáo.
- [ ] Thêm ảnh chụp thật, ảnh banner đã mua quyền sử dụng hoặc do bạn sở hữu; không dùng ảnh AI giả làm ảnh sản phẩm thật.
- [ ] Thiết lập phương thức nhận/chuyển tiền có đối soát, phí vận chuyển chuẩn, thông báo đơn hàng và xử lý hoàn tiền.
- [ ] Thêm trang/thao tác khôi phục mật khẩu qua email và chính sách dữ liệu cá nhân thực tế.
- [ ] Cấu hình HTTPS, backup, giám sát, phòng chống spam ở reverse proxy; kiểm thử trên thiết bị và hosting thật.
- [ ] Nhập `OPENAI_API_KEY` hợp lệ và kiểm thử tạo/sửa một ảnh thật trong Xưởng AI trước khi công bố công cụ.
- [ ] Kiểm định pháp lý, bảo mật, hiệu năng, quy trình xử lý đơn hàng với dữ liệu thực.
- [ ] Sau khi hoàn tất mới chủ động chuyển `DEMO_MODE=0`.

> Lưu ý: `DEMO_MODE=0` **không** tự kích hoạt cổng thanh toán, hãng giao hàng hay biến mẫu dữ liệu thành thông tin xác thực. Nó chỉ cho phép API đặt đơn không đánh dấu "thử nghiệm", trong khi chỉ chấp nhận sản phẩm đã được đánh dấu xác minh.
