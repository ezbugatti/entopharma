import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const companies = [
  { name: "Энто ХХК", role: "Эм ханган нийлүүлэх төв", href: site.group.supplier },
  { name: "Энто Клиник", role: "Эмчилгээ, оношилгооны төв", href: site.group.clinic },
  { name: "Энто Трэйд", role: "Эмнэлэг, лабораторийн нийлүүлэлт", href: site.group.trade },
];

export default function GroupSection() {
  return (
    <section className="mx-auto grid w-full max-w-[1088px] grid-cols-1 items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
      <div className="relative">
        <div className="relative h-[280px] overflow-hidden rounded-3xl sm:h-[420px]">
          <Image
            src="/images/supply.webp"
            alt="ЭНТО ГРУПП-ийн түгээлт"
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-6 left-4 flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-card sm:left-8">
          <span className="text-[32px] leading-10 font-semibold text-brand-500">1998</span>
          <span className="text-sm leading-5 text-ink-500">
            оноос хойш
            <br />
            тасралтгүй
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <SectionHeading
          align="left"
          badge="ЭНТО ГРУПП"
          title="27 жилийн туршлагатай группын нэг хэсэг"
          description="ЭНТО ГРУПП нь 20 улсын 80 гаруй үйлдвэрлэгчтэй онцгой эрхийн болон дистрибьютерийн гэрээгээр хамтран ажиллаж, 3600 гаруй нэр төрлийн бүтээгдэхүүнийг Монгол орон даяар түгээдэг. Энто Фарм нь группын агуулах, түгээлтийн нэгдсэн тогтолцоонд тулгуурлан чанартай бүтээгдэхүүнийг тасралтгүй нийлүүлдэг."
        />
        <ul className="flex flex-col gap-3">
          {companies.map((c) => (
            <li key={c.name}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-900/8 bg-white px-5 py-4 transition-all hover:border-brand-500 hover:shadow-brand-soft"
              >
                <span className="flex flex-col">
                  <span className="text-base leading-6 font-semibold text-ink-700">{c.name}</span>
                  <span className="text-sm leading-5 text-ink-500">{c.role}</span>
                </span>
                <ArrowUpRight className="size-5 text-ink-300 transition-colors group-hover:text-brand-500" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
