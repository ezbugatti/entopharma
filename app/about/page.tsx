import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Lightbulb, ShieldCheck, Trophy, type LucideIcon } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading, { Badge } from "@/components/ui/SectionHeading";
import GroupSection from "@/components/home/GroupSection";
import CtaBand from "@/components/home/CtaBand";
import { getPharmacies } from "@/lib/branches";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Бидний тухай",
  description: "Энто Фарм ХХК — ЭНТО ГРУПП-ийн охин компани, Улаанбаатар хот дахь сүлжээ эмийн сан.",
};

// ЭНТО ГРУПП-ийн үнэт зүйлс (ento.mn → OurValues)
const values: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Trophy,
    title: "Чанар",
    description: "Харилцагч, хэрэглэгч бүртээ үргэлж чанартай бүтээгдэхүүн, үйлчилгээг хүргэхийг зорьдог.",
  },
  {
    icon: ShieldCheck,
    title: "Найдвартай байдал",
    description: "Ажилтан, харилцагч бүрийн санаа, дуу хоолой үнэ цэнтэй. Нээлттэй байдал бол хамтын хөгжлийн түлхүүр.",
  },
  {
    icon: BadgeCheck,
    title: "Хариуцлага",
    description: "Нийгэм, үйлчлүүлэгчдийнхээ өмнө хүлээсэн үүргээ нэр төртэйгээр биелүүлж, салбарын хөгжилд хувь нэмэр оруулна.",
  },
  {
    icon: Lightbulb,
    title: "Иноватив байдал",
    description: "Үйлчилгээ болон үйл ажиллагаандаа шинэчлэлийг тасралтгүй нэвтрүүлж, үнэ цэнийг улам нэмэгдүүлдэг.",
  },
];

export default async function AboutPage() {
  const branches = await getPharmacies();

  return (
    <>
      <PageHero
        title="Энто Фарм ХХК"
        subtitle={`Хэрэглэгчдийн хэрэгцээ шаардлагад нийцсэн, чанартай эм, эрүүл мэндийн бүтээгдэхүүнийг хүргэх зорилготойгоор Улаанбаатар хотод ${branches.length} салбар эмийн сантай үйл ажиллагаа явуулж байна.`}
      />

      {/* Танилцуулга */}
      <section className="mx-auto flex w-full max-w-[900px] flex-col gap-8 px-4">
        <div className="relative h-[220px] w-full overflow-hidden rounded-2xl md:h-[420px]">
          <Image
            src="/images/consultation.webp"
            alt="Эм зүйч үйлчлүүлэгчид зөвлөгөө өгч байна"
            fill
            sizes="(min-width: 900px) 900px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 text-base leading-7 text-ink-500">
          <p>
            Бид үйлчлүүлэгчдэдээ хамгийн хялбар, түргэн шуурхай байдлаар шаардлагатай бүтээгдэхүүнээ авах боломжийг
            бүрдүүлсэн. Мэргэжлийн эм зүйчдийн зөвлөгөө, найдвартай бүтээгдэхүүн, тав тухтай орчин бүхий салбаруудаараа
            дамжуулан бид өдөр бүр олон мянган хүнд эрүүл мэндийн хэрэгцээгээ хангахад нь тусалдаг.
          </p>
          <p>
            Эм зүйч, эм найруулагч нарынхаа мэдлэг боловсролд ихээхэн анхаарч, өндөр мэдлэгтэй, ёс суртахуунтай ажилтан
            байлгаж чанартай үйлчилгээ үзүүлэхийг эрмэлздэг. Үүний тулд мэргэжлийн болон харилцаа, үйлчилгээний
            сургалтуудыг тогтмол зохион байгуулж, цаашдын үйл ажиллагаагаа улам сайжруулахаар ажиллаж байна.
          </p>
        </div>
      </section>

      {/* Эрхэм зорилго */}
      <section className="mx-auto w-full max-w-[1088px] px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 overflow-hidden rounded-[32px] bg-white shadow-card md:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
            <Badge className="self-start">Эрхэм зорилго</Badge>
            <blockquote className="text-[22px] leading-8 font-semibold text-ink-700 md:text-[26px] md:leading-9">
              “Иргэн бүрт чанартай эм, эрүүл мэндийн бүтээгдэхүүн, эмзүйн тусламж үйлчилгээг{" "}
              <span className="text-brand-500">ойр, хүртээмжтэй</span> хүргэх.”
            </blockquote>
            <p className="text-base leading-6 text-ink-500">
              ЭНТО ГРУПП-ийн эрүүл мэндийн салбарт хуримтлуулсан 27 жилийн туршлага, итгэлцэлд тулгуурлан бид
              хэрэглэгчиддээ хамгийн ойр байх сүлжээг хөгжүүлсээр байна.
            </p>
          </div>
          <div className="relative min-h-[260px]">
            <Image
              src="/images/pharmacists.webp"
              alt="ЭНТО ФАРМ-ын эм зүйчид"
              fill
              sizes="(min-width: 768px) 544px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Үнэт зүйлс */}
      <section className="mx-auto flex w-full max-w-[1088px] flex-col gap-12 px-4 pb-8">
        <SectionHeading
          badge="Бидний үнэт зүйлс"
          title="Чанар, хариуцлага, хүндэтгэлтэй харилцаа"
          description="ЭНТО ГРУПП-ийн нийтлэг үнэт зүйлс нь салбар бүрийн өдөр тутмын үйлчилгээний суурь болдог."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group flex flex-col gap-6 rounded-3xl bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="inline-flex self-start rounded-xl bg-surface p-4 transition-colors duration-300 group-hover:bg-brand-500">
                <Icon className="size-7 text-brand-500 transition-colors duration-300 group-hover:text-surface" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg leading-7 font-semibold text-ink-700">{title}</h3>
                <p className="text-sm leading-5 text-ink-500">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <GroupSection />
      <CtaBand />
    </>
  );
}
