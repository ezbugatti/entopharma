// ento.mn репоны эх зургуудыг (6000px, 20-30MB) вэбэд тохирох WebP болгон хөрвүүлнэ.
// Ашиглах: npm run images -- ../entollc/public/images
import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const src = path.resolve(process.argv[2] || "../entollc/public/images");
const out = path.resolve("public/images");

const images = [
  ["landing/services/pharma.jpg", "hero.webp", 1920],
  ["business/pharma.jpg", "pharmacists.webp", 1600],
  ["business/detail/pharma1.jpg", "consultation.webp", 1600],
  ["business/detail/pharma.jpg", "interior.webp", 1600],
  ["business/detail/pharmabackground.jpg", "banner.webp", 1920],
  ["business/ento.jpg", "supply.webp", 1600],
  ["web zurag/HEL04998a copy.jpg", "hotline.webp", 1600],
];

await mkdir(out, { recursive: true });

for (const [from, to, width] of images) {
  const info = await sharp(path.join(src, from))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(path.join(out, to));
  console.log(`${to.padEnd(20)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

// Лого ба газрын зургийн тэмдэглэгээ
await copyFile(path.join(src, "../Logo.svg"), "public/logo-ento.svg");
await mkdir(path.join(out, "markers"), { recursive: true });
for (const f of ["logotrue.svg", "logofalse.svg"]) {
  await copyFile(path.join(src, "branches", f), path.join(out, "markers", f));
}
for (const f of ["favicon.ico", "apple-icon.png", "icon1.png"]) {
  await copyFile(path.join(src, "..", f), path.join("public", f));
}
console.log("Лого, marker, favicon хуулагдлаа.");
