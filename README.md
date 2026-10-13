# Ở đây một lát.

**Bản thử v0.1.1 · 13/10/2026**  
Một game khám phá chậm, kết hợp **phong cảnh 2.5D và tương tác 3D**, dành cho những lúc muốn có một khoảng riêng.

> Giữa những ngày lòng nhiều gió, có một căn nhà vẫn chờ bạn thắp đèn.

## Cập nhật font tiếng Việt — v0.1.1

- Newsreader Regular / Italic cho tên game, tiêu đề, lời dẫn, thư.
- Be Vietnam Pro 400 / 500 / 600 cho nút bấm, menu và hướng dẫn.
- Font WOFF2 nằm sẵn trong `assets/fonts/`; không phụ thuộc Google Fonts/CDN khi chơi.
- Đã đối chiếu bảng ký tự của cả 5 file font: đầy đủ nhóm chữ tiếng Việt, gồm Ă Â Đ Ê Ô Ơ Ư và U+1EA0–U+1EF9.
- Tăng khoảng cách dòng và giảm ép khoảng cách chữ ở tiêu đề để dấu có khoảng trống.
- Mã nguồn giữ UTF-8. Nội dung nhiệm vụ, cơ chế chơi và chia chặng giữ như bản 0.1.0.
- Khi thay file trên website cũ, tải lại bằng Ctrl+F5 để tránh CSS được cache.
- Giấy phép SIL Open Font License và nguồn tải nằm trong `assets/fonts/`.
- Kiểm tra bảng ký tự không thay thế kiểm tra hình ảnh thực tế; bản này chưa được xem trực tiếp trong trình duyệt ở môi trường tạo file.

## 1. Định hướng cần giữ

- Không gian lấy cảm hứng từ căn nhà cô tịch giữa thung lũng núi, rừng và sương trong ảnh tham chiếu của Vinh.
- Nhịp chậm, tự do dừng lại; không đếm ngược, không ép đăng nhập, không nhiệm vụ hằng ngày.
- Dùng 3D cho nơi có thể bước tới, đi vòng quanh hoặc chạm vào. Phần núi xa và rừng nền dùng 2.5D.
- Nhân vật có tỷ lệ người, bề mặt bo mềm, áo khoác, túi đeo và cử động tay/chân. Không ghép nhân vật bằng khối lập phương.
- Camera giới hạn góc xoay để giữ phong cảnh 2.5D nhất quán, không hứa hẹn tự do 360°.
- Luôn cập nhật README khi sửa cơ chế, thêm chặng, thay tài nguyên hoặc thay cách triển khai.
- Các chặng nằm ở file riêng và được tải khi cần. Việc tách file chỉ hữu ích cho hiệu năng khi đồng thời tải theo nhu cầu và giải phóng tài nguyên cũ.

## 2. Bản này đã chơi được những gì?

### Chặng 01 — Qua màn sương

- Đi lại trong khu vực thung lũng, quan sát núi rừng nền nhiều lớp và sương trôi.
- Đọc tấm biển hướng dẫn.
- Nhặt ít nhất **3 trong 4 nhánh củi** dọc đường; mỗi nhánh chỉ nhặt một lần.
- Ngồi ghế ngoài vườn và nghe âm thanh nền.
- Đi tới cửa căn nhà để chuyển sang chặng 02. Có thể vào nhà khi chưa đủ củi và quay ra tìm thêm.

### Chặng 02 — Một mái nhà

- Vào nội thất dạng cắt mái/tường trước để camera quan sát được.
- Đọc lời nhắn của chủ nhà.
- Nhóm bếp khi đã có đủ 3 nhánh củi.
- Pha trà khi bếp đã được nhóm.
- Ngồi bên cửa sổ, tự chọn lúc đứng dậy.
- Viết một lá thư, lưu vào ngăn kéo trên trình duyệt hoặc xóa thư sau khi xác nhận.
- Mở cửa để trở lại thung lũng.

**Luồng gợi ý:** nhặt củi → vào nhà → nhóm bếp → pha trà → ngồi nghỉ. Hoàn thành luồng này là hết nội dung bản thử; bạn vẫn có thể tiếp tục đi dạo hoặc viết thư.

## 3. Điều khiển

| Thiết bị | Thao tác |
|---|---|
| Máy tính | W A S D hoặc phím mũi tên để đi |
| Tương tác | Đến gần dấu sáng rồi bấm E hoặc nút Tương tác |
| Góc nhìn | Q / R, hoặc giữ chuột và kéo ngang |
| Tạm nghỉ | Esc hoặc nút menu góc trên phải |
| Điện thoại | Các nút mũi tên, nút ↻ và nút tương tác trên màn hình |
| Đang ngồi | Bấm “Đứng dậy khi bạn muốn” |
| Âm thanh | Bấm “Âm thanh: tắt/bật” trên thanh đầu trang |

Âm thanh chỉ bắt đầu sau thao tác của người chơi. Bản hiện tại dùng tiếng nền tổng hợp bằng Web Audio; chưa có thư viện thu âm mưa, bước chân và lửa thực tế.

## 4. Chạy thử trên máy tính

**Không mở `index.html` bằng cách nhấp đúp.** Game dùng ES modules và dynamic import; trình duyệt thường chặn tải module qua `file://`.

Cách A — Python 3, mở terminal trong thư mục chứa `index.html`:

```bash
python -m http.server 8080
```

Mở `http://localhost:8080`. Trên một số máy dùng `python3` hoặc `py` thay cho `python`.

Cách B — VS Code:

1. Mở nguyên thư mục dự án.
2. Dùng tiện ích Live Server nếu đã cài.
3. Mở `index.html` qua “Open with Live Server”.

Không cần `npm install`, không có bước build. Thư viện Three.js đã được đóng gói tại `vendor/`.

## 5. Đưa lên GitHub / GitHub Pages

1. Giải nén bộ ZIP.
2. Tạo repository mới hoặc dùng repository riêng cho game.
3. Upload **toàn bộ nội dung bên trong thư mục `o-day-mot-lat`**, để `index.html`, `src`, `assets` và `vendor` cùng nằm tại gốc repository.
4. Trong phần Pages của repository, chọn triển khai từ nhánh `main`, thư mục gốc `/ (root)` nếu dùng cách triển khai từ nhánh.
5. Đợi GitHub Pages triển khai, sau đó mở URL Pages mà GitHub cung cấp.

Tất cả đường dẫn tài nguyên là tương đối, nên dùng được tại URL dự án dạng `https://TEN.github.io/TEN-REPO/`. File `.nojekyll` đi kèm để phục vụ nội dung tĩnh trực tiếp.

Nếu dùng Vercel: chọn dự án tĩnh, không đặt build command, dùng thư mục gốc chứa `index.html` làm output. Game không cần backend hay khóa API.

## 6. Cấu trúc file

```text
o-day-mot-lat/
├── index.html                  Màn đầu, lớp giao diện và điểm khởi chạy
├── style.css                   Giao diện máy tính / điện thoại
├── README.md                   Tài liệu dự án — luôn cập nhật
├── CHANGELOG.md                Nhật ký thay đổi
├── ASSETS.md                   Nguồn tài nguyên và giới hạn hiện tại
├── .nojekyll                   Phục vụ file tĩnh trên GitHub Pages
├── package.json                Lệnh kiểm tra tùy chọn; không cần cài dependency
├── assets/
│   ├── valley.webp             Nền núi rừng nén WebP
│   ├── favicon.svg
│   └── fonts/                  Font WOFF2 tiếng Việt, CSS và giấy phép
├── vendor/
│   ├── three.module.min.js     Three.js r180
│   ├── three.core.min.js
│   └── THREE-LICENSE.txt
├── src/
│   ├── game.js                 Vòng lặp, camera, giao diện, tải chặng
│   ├── state.js                Trạng thái, điều kiện nhiệm vụ, va chạm
│   ├── character.js            Nhân vật 3D và hoạt họa khớp đơn giản
│   ├── world.js                Vật liệu và hàm dựng cảnh dùng chung
│   ├── audio.js                Âm thanh tổng hợp
│   └── chapters/
│       ├── 01-valley.js        Chặng 01; chỉ tải khi vào thung lũng
│       └── 02-cabin.js         Chặng 02; chỉ tải khi vào căn nhà
└── tests/
    └── game.test.mjs           Kiểm tra logic và cấu trúc cảnh
```

## 7. Phân chia 2.5D / 3D và hiệu năng

| Thành phần | Cách làm |
|---|---|
| Núi xa, bầu trời | Ảnh nền WebP với dịch chuyển nhẹ theo camera |
| Rừng | Tấm hình cây có alpha ghép chéo cùng thân cây 3D; phù hợp góc nhìn giới hạn |
| Sương | Các sprite trong suốt có chuyển động |
| Đường, đá, nhà, đồ dùng | Mesh 3D đơn giản |
| Nhân vật | Mesh cong với bộ khớp điều khiển bằng code; chưa phải nhân vật GLB có skinning |
| Cỏ, sỏi | InstancedMesh giảm số lần gửi lệnh vẽ |
| Mưa | LineSegments trong một đối tượng chung |

- `game.js` dùng `import()` cho từng module chặng. Không tải trước module chặng 02 ở màn đầu.
- Khi rời chặng: gỡ nhóm cảnh, gọi `dispose()` cho geometry, material và texture; giữ renderer và nhân vật dùng chung.
- Mã module có thể được trình duyệt lưu cache sau lần tải đầu. Cache module khác với giữ cả cảnh 3D trong GPU.
- Texture cây/vải/gỗ được tạo tại máy bằng canvas; không có hàng trăm ảnh riêng cần tải.
- Mức Thấp: tắt bóng động, giới hạn pixel ratio 1, giảm cây/cỏ/mưa.
- Mức Cân bằng: giới hạn pixel ratio 1.35. Mức Cao: tối đa 1.75.
- Dừng vòng cập nhật cảnh khi tab ẩn; dừng âm thanh khi ra khỏi tab.
- Chưa đo FPS trên thiết bị thật. Kích thước bộ file nhỏ không đồng nghĩa chắc chắn chạy mượt trên mọi GPU.

## 8. Lưu tiến trình và riêng tư

- Lưu bằng `localStorage` với khóa `o-day-mot-lat:v1` sau mỗi hành động quan trọng.
- Lưu: chặng hiện tại, nhánh củi đã nhặt, bếp, trà, trạng thái nghỉ, thư và cài đặt.
- Chưa lưu tọa độ chính xác: khi tiếp tục, nhân vật xuất hiện ở điểm vào của chặng.
- Thư chỉ lưu trên trình duyệt, **không gửi lên máy chủ** và không đồng bộ giữa thiết bị.
- Không có tài khoản, cơ chế multiplayer hoặc phân tích người dùng.
- Người dùng chung hồ sơ trình duyệt có thể đọc thư. Xóa dữ liệu trình duyệt sẽ xóa cả tiến trình và thư.
- Bắt đầu chuyến đi mới có xác nhận và sẽ thay tiến trình / thư cũ.

## 9. Thêm chặng mới

Tạo `src/chapters/03-ten-chang.js` và export `createChapter(app)`. Hàm trả về:

```js
return {
  id: 'ten-chang',
  root,                         // THREE.Group riêng của chặng
  bounds: [-10, 10, -10, 10],   // minX, maxX, minZ, maxZ
  colliders: [],                 // box hoặc circle theo mẫu chặng 01
  interactions: [],              // id, x, z, radius, label, action()
  spawn: { x: 0, z: 5 },
  camera: { distance: 12, height: 7, targetY: 1, lookAhead: -2 },
  name: 'Tên chặng',
  number: '03',
  interior: false,
  update(dt, elapsed) {}
};
```

Thêm khóa dynamic import trong `modules` ở `game.js`, thêm quy tắc chặng vào `normalizeState()` trong `state.js`, và nối cửa chuyển chặng bằng `app.loadChapter('ten-chang')`. Đặt asset chỉ dành cho chặng tại `assets/chapters/03/`, tải bên trong `createChapter()` hoặc một bước tải riêng của chặng. Đừng thêm import tĩnh của toàn bộ chặng vào `game.js`.

## 10. Kiểm tra và giới hạn của bản giao

Đã chạy các kiểm tra tự động bằng Node.js:

```bash
node --test tests/game.test.mjs
```

- Chuỗi nhiệm vụ, điều kiện củi/lửa/trà và chống nhặt trùng.
- Đọc trạng thái lưu hỏng và chuẩn hóa dữ liệu.
- Giữ tiến trình khi dựng lại / đổi chặng.
- Tìm đường trên lưới để xác nhận có lối tiếp cận mọi điểm tương tác.
- Hình học nhân vật không có BoxGeometry, ma trận hoạt họa hữu hạn.
- Điểm xuất hiện không nằm trong vật cản; cảnh được dọn tài nguyên.

**Chưa kiểm tra trực tiếp bằng trình duyệt hoặc trên điện thoại trong môi trường tạo file này.** Cần kiểm tra hình ảnh, shader, thao tác chạm, âm thanh và FPS trên URL Pages trước khi xem là bản phát hành chính thức. Yêu cầu trình duyệt có WebGL 2 và tăng tốc phần cứng.

Nhân vật hiện tại là tạo hình thử bằng bề mặt cong và khớp đơn giản, không phải mô hình nghệ sĩ hoàn thiện. Động tác pha trà / nhóm lửa đang dùng cử động tay chung; chưa có chuyển động cầm nắm và mô phỏng chất lỏng. Kiến trúc nhà cũng mang phong cách đơn giản. Định hướng kế tiếp là thay nhân vật bằng GLB có bản quyền phù hợp, giữ cùng giao diện `createWanderer()`.

## 11. Hướng phát triển tiếp theo

- Chốt mẫu nhân vật trước / nghiêng / sau với Vinh, thay bằng model rigged và animation chuẩn.
- Làm tương tác pha trà, nhóm lửa gần hơn, camera chuyển cảnh mềm.
- Thêm một chặng suối và một chặng sườn đồi, mỗi chặng một module riêng.
- Âm thanh mưa/nhà/lửa thu thật có giấy phép rõ ràng.
- Tối ưu dựa trên FPS và bộ nhớ thực tế trên máy tính / điện thoại mục tiêu.
- Những dấu vết từ người chơi khác là ý tưởng tương lai; chưa có backend hoặc kết nối giữa người chơi trong bản này.
