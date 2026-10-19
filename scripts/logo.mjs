// public/pharma-logo.png (албан ёсны лого) → хоосон захыг тайрсан өнгөт + цагаан (бараан дэвсгэрт) хувилбар.
// Ашиглах: npm run logo
import sharp from "sharp";

const src = "public/pharma-logo.png";
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

// Ил тод бус пикселийн хүрээ
let [x0, y0, x1, y1] = [info.width, info.height, 0, 0];
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * 4 + 3] > 8) {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
  }
}
const trimmed = await sharp(src).extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }).png().toBuffer();
await sharp(trimmed).png({ compressionLevel: 9 }).toFile("public/logo-entopharma.png");

const white = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < white.data.length; i += 4) white.data.fill(255, i, i + 3);
await sharp(white.data, { raw: white.info }).png({ compressionLevel: 9 }).toFile("public/logo-entopharma-white.png");

console.log(`logo-entopharma(.png|-white.png): ${x1 - x0 + 1}x${y1 - y0 + 1}`);
