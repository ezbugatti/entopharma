import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Lightbulb, ShieldCheck, Trophy, type LucideIcon } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading, { Eyebrow } from "@/components/ui/SectionHeading";
import Cross from "@/components/ui/Cross";
import WhyUs from "@/components/home/WhyUs";
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
        title="Бидний тухай"
        subtitle={`Энто Фарм ХХК нь ЭНТО ГРУПП-ийн охин компани бөгөөд Улаанбаатар хотод ${branches.length} салбар эмийн сантайгаар үйл ажиллагаа явуулж байна.`}
        image="/images/consultation.webp"
        imageAlt="Эм зүйч үйлчлүүлэгчид зөвлөгөө өгч байна"
      />

      {/* Танилцуулга */}
      <section className="mx-auto grid w-[1280px] max-w-full grid-cols-1 gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[40px] lg:aspect-auto lg:min-h-[440px]">
          <Image
            src="/images/pharmacists.webp"
            alt="ЭНТО ФАРМ-ын эм зүйчид"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 text-base leading-7 text-ink-500">
          <Eyebrow>Танилцуулга</Eyebrow>
          <p className="font-display text-2xl leading-9 font-bold tracking-[-0.01em] text-pine-900">
            Хэрэглэгчдийн хэрэгцээ шаардлагад нийцсэн, чанартай эм, эрүүл мэндийн бүтээгдэхүүнийг хүргэх нь бидний
            зорилго.
          </p>
          <p>
            Бид үйлчлүүлэгчдэдээ шаардлагатай бүтээгдэхүүнээ хамгийн хялбар, түргэн шуурхай авах боломжийг бүрдүүлсэн.
            Мэргэжлийн эм зүйчдийн зөвлөгөө, найдвартай бүтээгдэхүүн, тав тухтай орчин бүхий салбаруудаараа дамжуулан
            өдөр бүр олон мянган хүнд эрүүл мэндийн хэрэгцээгээ хангахад нь тусалдаг.
          </p>
          <p>
            Эм зүйч, эм найруулагч нарынхаа мэдлэг боловсролд ихээхэн анхаарч, мэргэжлийн болон харилцаа, үйлчилгээний
            сургалтуудыг тогтмол зохион байгуулдаг.
          </p>
        </div>
      </section>

      {/* Эрхэм зорилго */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="cross-pattern relative mx-auto flex w-[1280px] max-w-full flex-col gap-6 overflow-hidden rounded-[40px] bg-pine-900 px-6 py-14 sm:px-14 md:py-20">
          <Cross className="pointer-events-none absolute -top-20 -right-20 size-60 text-brand-500/10" />
          <Eyebrow tone="light">Эрхэм зорилго</Eyebrow>
          <blockquote className="relative max-w-[900px] font-display text-[26px] leading-[1.3] font-extrabold tracking-[-0.02em] text-white sm:text-[38px]">
            Иргэн бүрт чанартай эм, эрүүл мэндийн бүтээгдэхүүн, эмзүйн тусламж үйлчилгээг{" "}
            <span className="text-brand-300">ойр, хүртээмжтэй</span> хүргэх.
          </blockquote>
          <p className="max-w-[640px] text-base leading-7 text-white/65">
            ЭНТО ГРУПП-ийн эрүүл мэндийн салбарт хуримтлуулсан 27 жилийн туршлага, итгэлцэлд тулгуурлан бид
            хэрэглэгчиддээ хамгийн ойр байх сүлжээг хөгжүүлсээр байна.
          </p>
        </div>
      </section>

      {/* Үнэт зүйлс */}
      <section className="mx-auto flex w-[1280px] max-w-full flex-col gap-12 px-4 pb-20 sm:px-6">
        <SectionHeading
          eyebrow="Үнэт зүйлс"
          title="Чанар, хариуцлага, хүндэтгэлтэй харилцаа"
          description="ЭНТО ГРУПП-ийн нийтлэг үнэт зүйлс нь салбар бүрийн өдөр тутмын үйлчилгээний суурь болдог."
        />
        <ol className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }, i) => (
            <li key={title} className="flex flex-col gap-5 border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-8">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-mint text-brand-600">
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <span className="font-display text-sm font-extrabold text-ink-300">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-pine-900">{title}</h3>
              <p className="text-sm leading-6 text-ink-500">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <WhyUs />
      <div className="h-20 md:h-24" />
      <GroupSection />
      <CtaBand />
    </>
  );
}
