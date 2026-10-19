import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT_TOPICS } from "@/lib/site";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Буруу хүсэлт." }, { status: 400 });

  // Spam bot нуугдмал талбарыг бөглөдөг
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 16);
  const email = clean(body.email, 120);
  const topic = clean(body.topic, 40);
  const message = clean(body.message, 2000);

  if (!name || !/^[0-9+\s-]{8,16}$/.test(phone) || !CONTACT_TOPICS.includes(topic) || !message) {
    return NextResponse.json({ error: "Мэдээллээ бүрэн, зөв бөглөнө үү." }, { status: 422 });
  }

  if (!process.env.EMAIL_HOST || !process.env.EMAIL_RECEIVER) {
    console.error("EMAIL_* env тохируулаагүй байна — /api/contact имэйл илгээж чадахгүй.");
    return NextResponse.json({ error: "Онлайн хүсэлт түр ажиллахгүй байна." }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 465),
    secure: process.env.EMAIL_SECURE !== "false",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email || undefined,
      subject: `entopharma.mn — ${topic}: ${name}`,
      text: [`Нэр: ${name}`, `Утас: ${phone}`, `Имэйл: ${email || "-"}`, `Сэдэв: ${topic}`, "", message].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Имэйл илгээхэд алдаа:", error);
    return NextResponse.json({ error: "Илгээхэд алдаа гарлаа." }, { status: 500 });
  }
}
