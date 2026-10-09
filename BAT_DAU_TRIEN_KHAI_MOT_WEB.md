# ĐƯA CẢ WEBSITE LÊN MỘT LINK — HƯỚNG DẪN NGẮN

**Đọc kỹ:** GitHub là nơi lưu mã nguồn. GitHub Pages **KHÔNG** chạy được Node.js, tài khoản, giỏ đặt hàng trong cơ sở dữ liệu hoặc API AI. Muốn mọi tính năng backend chạy trên một website, bạn cần hosting Node.js (ví dụ Render) + ổ lưu trữ lâu dài. Bản ZIP này **không tự xuất bản lên tài khoản GitHub/Render của bạn**.

## Một lần thiết lập, không cần tách hai bản ZIP

1. Giải nén ZIP này, tải **toàn bộ file và thư mục** lên repository `tranthiquynhnhu0901-hue/nong_nghiep_xanh_ecommerce`, để `render.yaml`, `package.json`, `src/`, `public/` ở gốc. Không đưa file `.env` và thư mục `storage/` có dữ liệu thật lên GitHub.
2. Mở https://dashboard.render.com/ và đăng nhập. Chọn **New → Blueprint**, kết nối repository GitHub nêu trên, chọn `render.yaml`. Blueprint dùng gói trả phí có **persistent disk**; xem chi phí trước khi đồng ý.
3. Trong màn hình thiết lập, điền **ADMIN_EMAIL**, **ADMIN_PASSWORD** (mật khẩu mạnh, riêng) và **OPENAI_API_KEY** nếu muốn tạo ảnh AI thật. Không gửi API key trong chat, không đưa vào mã nguồn công khai. Nếu chưa có API key, để trống rồi thêm trong Render Environment sau.
4. Chọn Deploy. Sau khi thành công, Render sẽ cấp một địa chỉ HTTPS như `https://nong-nghiep-xanh-xxx.onrender.com`. Vào địa chỉ **thực tế Render cấp**, không phải URL ví dụ này.
5. Đăng nhập `https://<ten-mien-render>/dang-nhap`, chọn **Quản trị → Xưởng tạo ảnh AI**. Khi `AI_AUTO_ON_START=1` và đã có khóa API, server tự xếp lịch tạo ảnh mới dựa trên dữ liệu 74 sản phẩm, 8 danh mục, 12 bài viết và banner, tối đa 3 ảnh/ngày ở cấu hình bàn giao. Ảnh nằm trong thư viện ở trạng thái **chờ duyệt**, không tự công bố vào trang sản phẩm vì có nguy cơ sai giống cây hay bao bì.
6. Kiểm tra đơn mẫu bằng giỏ hàng và mục quản trị. Mặc định `DEMO_MODE=1`, nên **chưa thu tiền, chưa gửi hãng vận chuyển**. Chỉ sau khi có sản phẩm/giá/tồn kho/thông tin doanh nghiệp và vận chuyển thật, kiểm tra kỹ rồi mới chuyển `DEMO_MODE=0`.

## Giữ lại link GitHub Pages cũ được không?

Có thể giữ link GitHub Pages như nơi giới thiệu/đặt liên kết sang website thực tế, nhưng **không thể biến link github.io thành máy chủ Node.js**. Để khách mua sắm dùng một địa chỉ duy nhất và SEO hiệu quả, hãy dùng **link do Render cấp** hoặc trỏ **tên miền riêng** về Render. Các slug URL `/san-pham/ten-san-pham`, `/kien-thuc-nong-nghiep/...` được giữ như trước; `SITE_URL` tự nhận từ hostname Render hoặc có thể thiết lập thủ công nếu dùng domain riêng.

## Những mục chưa phải kết nối thực tế

- API AI sẽ tốn phí riêng, cần quyền và hạn mức API thật. Test dùng API mô phỏng không bảo đảm dịch vụ trả phí đã được kết nối thành công.
- Chưa có ảnh chụp thật đã xác minh cho đủ 74 mặt hàng. Ảnh AI chỉ để minh họa và phải được kiểm duyệt, không bịa nhãn hiệu/chứng nhận.
- Chưa tích hợp đối soát thanh toán QR/ngân hàng, cước vận chuyển, hãng giao nhận, gửi email xác nhận/reset mật khẩu, biến thể, mã giảm giá và một số chức năng khác trong yêu cầu gốc.
- Kiểm thử không thay thế kiểm tra pháp lý, bảo mật độc lập và Lighthouse trên website triển khai thực tế.

Đây là **mã nguồn ứng dụng đã có luồng đăng nhập, giỏ hàng, đơn hàng mẫu, quản trị và API AI**; không phải lời cam kết rằng chỉ tải ZIP lên GitHub là mọi dịch vụ bên ngoài tự hoạt động.
