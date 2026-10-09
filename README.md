# HƯỚNG DẪN TRIỂN KHAI TOÀN BỘ WEBSITE

**Trước tiên đọc [`BAT_DAU_TRIEN_KHAI_MOT_WEB.md`](BAT_DAU_TRIEN_KHAI_MOT_WEB.md).** Có `render.yaml` cho ứng dụng Node.js + cơ sở dữ liệu và ảnh trên persistent disk. GitHub Pages chỉ xem bản tĩnh.

---

# Nông Nghiệp Xanh — Website bán hàng nông nghiệp tiếng Việt

**SỬA LỖI GIAO DIỆN:** HTML tĩnh đã có CSS/JS nhúng để mở trực tiếp `file:///` sau khi giải nén, và các trang báo giá, liên hệ, tư vấn, chính sách có bố cục/nội dung riêng. Các biểu mẫu của GitHub Pages vẫn **không gửi dữ liệu**.

**BẮT ĐẦU TẠI [`BAT_DAU_O_DAY.md`](BAT_DAU_O_DAY.md)** để đưa lên GitHub. **XEM [`BAO_CAO_KIEM_TRA.md`](BAO_CAO_KIEM_TRA.md)** trước khi xem bản tĩnh là website kinh doanh hoàn chỉnh. Bản ZIP rà soát đã đặt `index.html` ở cấp đầu của ZIP (không lồng thư mục).

**Bộ mã nguồn Node.js/SQLite có thể chạy trực tiếp**, cung cấp giao diện người mua, trang quản trị và Xưởng tạo ảnh AI ở cùng một ứng dụng. Nền tảng đầy đủ không phải website tĩnh và **backend không chạy trên GitHub Pages**. Tuy nhiên bản bàn giao **đã bổ sung `index.html` ngay ở thư mục gốc và 119 trang HTML tĩnh** để xem giao diện trên GitHub Pages. Xem hướng dẫn tại [`GITHUB_PAGES.md`](GITHUB_PAGES.md). Các chức năng đặt đơn, tài khoản, quản trị và AI chỉ hoạt động với máy chủ Node.js.

> **Trạng thái bàn giao:** đây là phiên bản vận hành thử có backend và cơ sở dữ liệu thực, không phải một thiết kế HTML giả. Mặc định `DEMO_MODE=1`: dữ liệu sản phẩm, mức giá, tồn kho và điều khoản đang là **dữ liệu minh họa**; không thu tiền hoặc tự động gọi hãng vận chuyển. Trước khi bán hàng cần khai báo đúng thông tin doanh nghiệp, giấy tờ ngành hàng, ảnh và tồn kho thật; tích hợp các dịch vụ thanh toán/vận chuyển nếu cần và kiểm định bảo mật, vận hành.

## 1. Chạy ngay trên máy tính

Yêu cầu: **Node.js 22.13 trở lên** (sử dụng SQLite tích hợp, không cần npm install hay PostgreSQL).

```bash
# Giải nén ZIP, vào thư mục dự án
cd nong-nghiep-xanh
cp .env.example .env
```

Sửa `.env` và đổi ít nhất:

```env
PORT=3000
SITE_URL=http://localhost:3000
ADMIN_EMAIL=quantri@example.vn
ADMIN_PASSWORD=MAT_KHAU_MANH_RIENG_CUA_BAN
DEMO_MODE=1
OPENAI_API_KEY=
```

Chạy:

```bash
npm start
```

Mở `http://localhost:3000` để xem cửa hàng. Đăng nhập tại `/dang-nhap` bằng `ADMIN_EMAIL` và `ADMIN_PASSWORD`, sau đó vào `/quan-tri`.

**Lưu ý:** quản trị viên được tạo vào lần khởi động đầu tiên khi email chưa tồn tại. Đừng đổi biến môi trường mà nghĩ mật khẩu quản trị đã tự cập nhật; việc đổi tài khoản đã có cần quy trình riêng. Không đưa `.env` lên GitHub.

## 2. Những phần có mã nguồn hoạt động

| Khu vực | Khả năng |
|---|---|
| Trang chủ | Hero, danh mục, sản phẩm nổi bật, bài viết, giải pháp và lời mời liên hệ |
| Cửa hàng | 74 sản phẩm mẫu khác nhau, 8 danh mục, tìm kiếm, phân trang, sắp xếp giá/tên, URL riêng |
| Trang sản phẩm | Thông tin, giá tham khảo, số lượng, thêm giỏ, mua ngay, hàng liên quan |
| Giỏ hàng | LocalStorage, đổi số lượng, xóa sản phẩm, tổng tạm tính |
| Đặt đơn | Máy chủ xác thực giá/tồn kho/số lượng, giao dịch SQLite, mã đơn và link theo dõi có mã bí mật |
| Tài khoản | Đăng ký, đăng nhập, đăng xuất, mật khẩu dùng `scrypt`, phiên HttpOnly, lịch sử đơn nếu mua khi đăng nhập |
| Nội dung | 12 bài hướng dẫn, trang bài viết, giới thiệu, liên hệ, mẫu tiếp nhận đối tác/tư vấn/báo giá |
| Quản trị | Thống kê cơ bản, chỉnh sửa/thêm sản phẩm, cập nhật đơn, bài viết, danh sách yêu cầu, thông tin thương hiệu |
| Hình ảnh | Tải JPG/PNG/WebP từ máy, lưu tệp, lưu metadata, duyệt hình và gán vào sản phẩm, banner, bài viết |
| **Xưởng tạo ảnh AI** | Tạo thủ công hoặc **tự tạo ảnh từng sản phẩm / hàng loạt** từ dữ liệu 74 sản phẩm, 8 danh mục, 12 bài viết và banner; hàng đợi hiển thị tiến độ, áp dụng hạn mức, lưu ảnh chờ duyệt và đề xuất vị trí gán. Tạo/sửa ảnh qua API server |
| SEO | URL thân thiện, tiêu đề và mô tả riêng, canonical, Open Graph, sitemap.xml, robots.txt, JSON-LD có kiểm soát |
| Di động | CSS responsive từ màn hình điện thoại đến máy tính, thanh điều hướng đáy trên điện thoại |
| Kiểm thử | `npm test` với luồng truy cập, đăng nhập, phân quyền, đặt đơn, quản trị, ảnh, bảo vệ origin và chế độ AI chưa kết nối |

**Những việc không được giả là đã hoàn thiện:** tích hợp trực tiếp cổng thanh toán và vận chuyển, tính cước thật, đối soát giao dịch tự động, khôi phục mật khẩu qua email, biến thể sản phẩm, mã giảm giá, wishlist, quản lý đối tác đa tài khoản, xác thực doanh nghiệp/giấy phép, xử lý trả hàng tự động, tối ưu ảnh qua CDN, chất lượng Core Web Vitals/Lighthouse trên hosting thực và kiểm thử thanh toán/AI bằng khóa thật. Những phần này là hạng mục mở rộng hoặc cần dịch vụ/điều kiện thực tế; không có nút giả cho các chức năng này.

## 3. Cách dùng Xưởng tạo ảnh AI ngay trong website

1. Đăng ký API key và quyền sử dụng mô hình ảnh từ nhà cung cấp OpenAI. API thường tính tiền riêng theo lượt tạo ảnh; gói ChatGPT không thay thế API key.
2. Trong file `.env`, cấu hình `OPENAI_API_KEY=...` và `OPENAI_IMAGE_MODEL=gpt-image-1` (có thể đổi khi tài khoản hỗ trợ mô hình tương thích với Images API).
3. Khởi động lại server. Đăng nhập `/quan-tri` → chọn **Xưởng tạo ảnh AI**.
4. **Tạo thủ công:** nhập mô tả ảnh bằng tiếng Việt, chọn **banner / minh họa sản phẩm / danh mục / bài viết / truyền thông**, chọn phong cách và kích thước; bấm **Tạo hình ảnh thật bằng AI**.
5. **Tạo tự động:** trên cùng trang, chọn **một sản phẩm**, **sản phẩm thiếu ảnh**, **toàn bộ sản phẩm**, **toàn bộ danh mục**, **toàn bộ bài viết**, **banner**, hoặc **tất cả**. Xem số lượt AI dự kiến, tích ô xác nhận chi phí và nhấn bắt đầu. Hệ thống lập prompt từ tên/mô tả đã lưu và xử lý tuần tự, không tự xuất bản. Có thể xem tiến độ, tạm dừng, tiếp tục khi hết hạn mức.
6. **Kiểm duyệt và gán ảnh:** vào **Thư viện hình ảnh**, mở ảnh AI chờ duyệt, duyệt rồi chọn **vị trí AI đề xuất** hoặc chọn vị trí khác; sau đó nhấn **Sử dụng**.
7. Backend sẽ gọi `POST https://api.openai.com/v1/images/generations` qua HTTPS và lấy ảnh base64 trong phản hồi để ghi thành tệp. Để chỉnh sửa ảnh đã có, chọn ảnh nguồn trong danh sách và backend dùng `POST /v1/images/edits`.
8. Sau khi thành công, ảnh lưu trong `storage/uploads/`, metadata trong SQLite. Vào **Thư viện hình ảnh** để duyệt và chọn vị trí sử dụng.

API key **không nằm trong JS tải xuống trình duyệt**. Nếu chưa cấu hình API, giao diện báo rõ **Chưa kết nối** và nút bị vô hiệu, không dùng ảnh mẫu giả làm ảnh AI. Có giới hạn lượt theo giờ/ngày và hạn chế quyền quản trị. **Mặc định 10 lượt/giờ, 30 lượt/24 giờ**: không thể tạo xong 95 ảnh cùng lúc với giới hạn mặc định. Khi đạt giới hạn, hàng đợi tạm dừng và cần người quản trị quay lại tiếp tục; để tăng, cấu hình `AI_MAX_PER_HOUR`, `AI_MAX_PER_DAY` một cách có trách nhiệm. Mỗi lượt có thể phát sinh phí OpenAI API riêng; hệ thống chưa ước tính chính xác tiền tại thời điểm tạo. Không tự động duyệt hay tự gắn ảnh khi chưa có người kiểm duyệt. Khi máy chủ khởi động lại, hàng đợi tạm dừng để tránh ngoài ý muốn; tác vụ đang gọi API sẽ chuyển trạng thái lỗi để bạn kiểm tra hóa đơn tránh tạo trùng.

**Tính xác thực:** ảnh AI dùng cho truyền thông hoặc minh họa. Với sản phẩm có thương hiệu, nhãn, thành phần, giấy phép hay đặc tính kỹ thuật, phải tải **ảnh thật được xác thực**. Mã nguồn chặn việc gán ảnh AI thành ảnh đại diện của nhóm phân bón, bảo vệ cây trồng, chế phẩm sinh học và sản phẩm đã đánh dấu xác minh. Với các sản phẩm khác, ảnh AI hiển thị nhãn **Ảnh AI minh họa**. Trong mọi trường hợp nên ưu tiên ảnh chụp thật để bán hàng. Quản trị viên chịu trách nhiệm kiểm duyệt mọi ảnh trước khi công bố. Chưa có AI tự động kiểm duyệt nội dung hoặc tự tính giá API bằng tiền thực; hiện lưu metadata lượt gọi và dữ liệu sử dụng nếu nhà cung cấp trả về.

## 4. Thư mục

```text
nong-nghiep-xanh/
├── src/
│   ├── server.js        # Server HTTP, routing, REST API
│   ├── db.js            # Schema SQLite, lưu dữ liệu, seed khởi tạo
│   ├── seeds.js         # 74 sản phẩm, 8 danh mục, 12 bài viết
│   ├── views.js         # Website người mua, giao diện HTML
│   ├── admin-views.js   # Trang quản trị, xưởng AI
│   ├── ai.js            # OpenAI Images API (tạo/sửa, lưu tệp)
│   ├── auto-ai.js       # Lập prompt từ dữ liệu, hàng đợi, hạn mức, tiến độ
│   ├── security.js      # Hash mật khẩu, escape, tiện ích
│   └── config.js        # Biến môi trường
├── public/
│   ├── style.css        # Design system & responsive
│   ├── app.js           # Giỏ hàng, đăng nhập, thanh toán, biểu mẫu
│   └── admin.js         # Các thao tác quản trị và ảnh AI
├── tests/
│   ├── website.test.js  # Kiểm thử tích hợp tự động
│   └── auto-ai.test.js  # Kiểm thử hàng đợi ảnh AI với dịch vụ mô phỏng
├── storage/             # Tự sinh khi chạy; KHÔNG commit
├── .env.example
├── Dockerfile
├── compose.yaml
└── package.json
```

- SQLite tự tạo `storage/website.sqlite` lúc chạy. Đừng xóa file này sau khi có dữ liệu thật.
- Hình ảnh tải lên và ảnh AI được lưu `storage/uploads/` để có thể gắn đĩa lâu dài.
- Mặc định homepage dùng vài URL ảnh phong cảnh từ Unsplash làm **ảnh minh họa trực tuyến**, cần mạng khi xem và nên thay bằng ảnh sở hữu/được phép dùng trước khi kinh doanh. 74 sản phẩm mẫu chưa có ảnh chụp sản phẩm xác thực nên hiển thị placeholder trung thực thay vì nhãn/bao bì AI bịa ra.

## 5. Triển khai bằng Docker

```bash
cp .env.example .env
# Sửa ADMIN_EMAIL, ADMIN_PASSWORD, SITE_URL thành tên miền https://... của bạn
# Đảm bảo máy đã có Docker Engine và Docker Compose

docker compose up -d --build
```

Cấu hình HTTPS reverse proxy (Nginx, Caddy, Traefik, dịch vụ của hosting), trỏ domain về cổng được ánh xạ. Docker Compose lưu dữ liệu qua named volume; cần backup volume định kỳ. **Không** gắn database SQLite vào filesystem không hỗ trợ cơ chế locking, không để nhiều container ghi đồng thời chung một database.

Máy chủ Node.js thông thường (Render/Railway/VPS/Node hosting) cũng chạy bằng `npm start`, cần persistent disk cho `DATA_DIR` và cấu hình HTTPS. **GitHub Pages không chạy được database, đăng nhập, đơn hàng và API ảnh**; chỉ dùng GitHub để lưu mã nguồn. Không triển khai vào shared hosting chỉ chạy PHP hoặc chỉ hỗ trợ website tĩnh.

## 6. Bật vận hành thương mại thật

Chỉ chuyển `DEMO_MODE=0` sau khi hoàn thành từng công việc:

1. Thay giá mẫu/tồn kho bằng dữ liệu thực, xác thực tất cả sản phẩm muốn bán trong quản trị. Hàng chưa được xác thực sẽ bị API tạo đơn chặn.
2. Thay toàn bộ chính sách, tên pháp nhân, địa chỉ, liên hệ, chứng nhận/hồ sơ bắt buộc bằng thông tin được xác nhận hợp pháp. Kiểm tra những nhóm sản phẩm đặc biệt.
3. Lấy ảnh chụp thật từng sản phẩm. Hình ảnh sản phẩm AI không được mô tả như ảnh chụp chính hãng.
4. Định nghĩa giá giao hàng, địa bàn giao hàng, quy trình COD, đơn vị vận chuyển, đối soát chuyển khoản/hoàn tiền; **mã nguồn hiện chưa tự đối soát thanh toán hoặc lấy phí vận chuyển thực**. Khi nhận đơn, quản trị viên cần xác nhận thủ công.
5. Thiết lập backup SQLite, giám sát log, firewall, rate limiting ở reverse proxy, HTTPS, quyền ghi trên filesystem; bổ sung gửi email xác nhận và reset mật khẩu nếu cần.
6. Kiểm thử checkout, ảnh AI bằng khóa của chính bạn, chuyển đổi trạng thái đơn, bảo mật, pháp lý và tốc độ trên hạ tầng thật. Sau đó mới mở máy tìm kiếm index bằng cách tắt DEMO_MODE.

## 7. Kiểm thử

```bash
npm test
```

Chạy thêm `npm run test:static` để rà soát 119 trang HTML xuất sẵn và liên kết nội bộ. Kiểm thử chạy server độc lập với thư mục dữ liệu tạm, không đụng tới dữ liệu trong `storage/`. **Kiểm thử tạo ảnh hàng loạt sử dụng máy chủ API mô phỏng, không phát sinh giao dịch tiền hoặc sử dụng API tạo ảnh tính phí**, vì không có quyền truy cập vào khóa/dịch vụ của người triển khai. Kết quả sau cùng cần được xác minh trên môi trường riêng của bạn.

## 8. Vấn đề bảo mật

- Không commit `.env`, `storage/` hoặc tệp sao lưu lên GitHub.
- Mật khẩu được hash bằng scrypt + salt ngẫu nhiên; cookie chỉ chứa phiên ngẫu nhiên, bản hash của phiên nằm ở SQLite.
- API admin phải đăng nhập, kiểm tra role phía server; nội dung nhập được kiểm tra và escape ở HTML.
- API tạo ảnh giới hạn theo tài khoản, khóa chỉ đọc server. File upload kiểm tra đuôi/magic bytes/kích thước.
- Dữ liệu đơn tính lại dựa trên database, không tin giá của LocalStorage.
- Đây không thay thế đánh giá an ninh độc lập (penetration test), kiểm toán quy trình xử lý dữ liệu cá nhân hoặc trách nhiệm tuân thủ pháp luật.

Tác giả có thể tiếp tục mở rộng modules nhờ source code không phụ thuộc framework hay package ngoài. Đổi sang PostgreSQL, Redis, S3/CDN và queue async khi lượng truy cập lớn.

## 9. Cần hiểu rõ khi sử dụng AI tự động

- Tính năng ở `src/auto-ai.js` **chạy trên máy chủ Node.js**, không hoạt động trên GitHub Pages. Bản HTML xuất sẵn chỉ để xem giao diện và sản phẩm mẫu, không có chức năng tạo ảnh thật.
- `OPENAI_API_KEY` phải do chủ website cấu hình trên **máy chủ riêng**, không đăng lên GitHub. Các lượt tạo tốn phí theo bảng giá nhà cung cấp tại thời điểm sử dụng.
- Đợt tạo toàn bộ bao gồm 74 sản phẩm, 8 danh mục, 12 bài viết và 1 banner (95 ảnh theo dữ liệu ban đầu). Ảnh mới ở trạng thái **chờ duyệt**, không tự gắn vào trang bán hàng; vị trí dự kiến được lưu theo từng ảnh.
- Đối với cây giống và sản phẩm thực tế, tạo ảnh AI từ tên **không đảm bảo đúng hình dáng/giống cây**; bắt buộc so sánh ảnh với hàng thật. Với phân bón, thuốc bảo vệ cây và vật tư đóng gói, hãy dùng ảnh chụp nhãn/bao bì do nhà cung cấp xác minh.
- Hàng đợi lưu trong SQLite và chạy tuần tự trên **một tiến trình Node.js duy nhất**, phù hợp dự án nhỏ. Nếu triển khai nhiều máy chủ, nên chuyển sang Redis/PostgreSQL và worker queue để tránh trùng. Cần persistent disk và sao lưu database/ảnh.
- Đối với dịch vụ OpenAI Images API tiêu chuẩn, để trống `OPENAI_IMAGES_ENDPOINT` (mặc định `https://api.openai.com/v1`). Chỉ thay đổi khi chủ website tự quản lý nhà cung cấp tương thích và đáng tin cậy.
