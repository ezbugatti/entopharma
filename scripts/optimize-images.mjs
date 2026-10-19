// ento.mn репоны эх зургуудыг (6000px, 20-30MB) вэбэд тохирох WebP болгон хөрвүүлнэ.
// Ашиглах: npm run images -- ../entollc/public/images
//
// Эдгээр нь next/image-ийн ЭХ файл — хэрэглэгчид Next өөрөө хэрэгтэй өргөнөөр нь багасгаж хүргэнэ.
// Тиймээс өндөр нягтралтай (2400px, q85) хадгалж, object-cover-оор тайрагдах үед ч бүдгэрэхгүй байлгана.
// `aspect` өгвөл тухайн харьцаагаар (жишээ нь нуман hero-д 4:5) эх зургаас шууд тайрна.
import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const src = path.resolve(process.argv[2] || "../entollc/public/images");
const out = path.resolve("public/images");

const images = [
  { from: "landing/services/pharma.jpg", to: "hero.webp", width: 1920 }, // OpenGraph
  { from: "landing/services/pharma.jpg", to: "hero-portrait.webp", width: 1600, aspect: 4 / 5, focusX: 0.5 },
  { from: "business/pharma.jpg", to: "pharmacists.webp", width: 2400 },
  { from: "business/detail/pharma1.jpg", to: "consultation.webp", width: 2400 },
  { from: "business/detail/pharma.jpg", to: "interior.webp", width: 1600 },
  { from: "web zurag/HEL04998a copy.jpg", to: "hotline.webp", width: 2400 },
  { from: "hr/whyento.jpg", to: "team.webp", width: 2400 },
];

await mkdir(out, { recursive: true });

for (const { from, to, width, aspect, focusX = 0.5 } of images) {
  let img = sharp(path.join(src, from)).rotate();
  if (aspect) {
    const { width: w, height: h } = await img.metadata();
    const cropW = Math.min(w, Math.round(h * aspect));
    const cropH = Math.round(cropW / aspect);
    const left = Math.round(Math.min(Math.max(w * focusX - cropW / 2, 0), w - cropW));
    img = img.extract({ left, top: Math.round((h - cropH) / 2), width: cropW, height: cropH });
  }
  const info = await img
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 85, smartSubsample: true })
    .toFile(path.join(out, to));
  console.log(`${to.padEnd(22)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

// Газрын зургийн тэмдэглэгээ, favicon
await mkdir(path.join(out, "markers"), { recursive: true });
for (const f of ["logotrue.svg", "logofalse.svg"]) {
  await copyFile(path.join(src, "branches", f), path.join(out, "markers", f));
}
for (const f of ["favicon.ico", "apple-icon.png", "icon1.png"]) {
  await copyFile(path.join(src, "..", f), path.join("public", f));
}
console.log("Marker, favicon хуулагдлаа.");
