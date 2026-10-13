# Tài nguyên và nguồn gốc

## Three.js

- Bản đóng gói: r180, hai module `vendor/three.module.min.js` và `vendor/three.core.min.js`.
- Tác giả: Three.js Authors.
- Giấy phép MIT: giữ nguyên file `vendor/THREE-LICENSE.txt` và phần header trong mã.
- Nguồn dự án: https://github.com/mrdoob/three.js

## Nền thung lũng

- File: `assets/valley.webp`.
- Tạo mới bằng công cụ Imagegen tích hợp, sau đó đổi sang WebP để tối ưu dung lượng.
- Ảnh người dùng gửi được dùng để hiểu định hướng qua cuộc trao đổi; không đóng gói hoặc dùng lại ảnh tham chiếu gốc làm nền.
- Prompt tạo ảnh:

> Use case: stylized-concept. Asset type: background matte painting for a contemplative 2.5D + 3D game. Create an atmospheric widescreen panorama of a remote misty mountain valley in the Carpathian-like forest, dark evergreen pines, many overlapping mountain silhouettes fading into grey teal fog, pale overcast cloudy sky occupying upper 45%, muted olive and desaturated slate green palette, melancholic peaceful drizzly morning. Painterly cinematic realism, soft detailed forest textures with depth. Lower 25% is soft blank low mist over distant meadow, no large trees or foreground objects, no house, no people, no path, no text, no watermark. The image is only DISTANT landscape backdrop, actual 3D gameplay takes place in front. Wide horizontal 3:2 composition, soft diffuse lighting, calm elegant art direction.

## Nhân vật, cảnh và âm thanh

- Nhân vật và vật thể được dựng riêng bằng code; không sử dụng asset nhân vật tải từ kho bên ngoài.
- Texture cây và gỗ được vẽ tại runtime bằng Canvas.
- Mưa, sương và ngọn lửa là hiệu ứng dựng bằng code.
- Âm thanh là tiếng nền tổng hợp bằng Web Audio; không dùng nhạc hoặc bản ghi thương mại.
- Phông Newsreader (Production Type) và Be Vietnam Pro (Be Vietnam Pro Project Authors).
- Nguồn phân phối Google Fonts; tải một lần và chuyển sang WOFF2, giữ đầy đủ ký tự. Không gọi dịch vụ font bên ngoài khi chơi.
- File font, URL nguồn và giấy phép OFL lưu tại `assets/fonts/`.
- Nguồn dự án: https://github.com/productiontype/Newsreader và https://github.com/bettergui/BeVietnamPro.
