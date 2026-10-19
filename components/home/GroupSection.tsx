import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Cross from "@/components/ui/Cross";
import { site } from "@/lib/site";

const companies = [
  { name: "Энто ХХК", role: "Эм ханган нийлүүлэх төв", href: site.group.supplier },
  { name: "Энто Клиник", role: "Эмчилгээ, оношилгооны төв", href: site.group.clinic },
  { name: "Энто Трэйд", role: "Эмнэлэг, лабораторийн нийлүүлэлт", href: site.group.trade },
];

export default function GroupSection() {
  return (
    <section className="mx-auto grid w-[1280px] max-w-full grid-cols-1 items-end gap-12 px-4 pb-20 sm:px-6 md:pb-24 lg:grid-cols-[1fr_1.25fr]">
      <SectionHeading
        eyebrow="ЭНТО ГРУПП"
        title={
          <>
            <span className="text-brand-500">1998</span> оноос итгэлийг хүлээсэн группын гишүүн
          </>
        }
        description="ЭНТО ГРУПП нь 20 улсын 80 гаруй үйлдвэрлэгчтэй онцгой эрхийн болон дистрибьютерийн гэрээгээр хамтран ажиллаж, 3600 гаруй нэр төрлийн бүтээгдэхүүнийг Монгол орон даяар түгээдэг. Энто Фарм нь группын агуулах, түгээлтийн нэгдсэн тогтолцоонд тулгуурлан чанартай бүтээгдэхүүнийг тасралтгүй нийлүүлдэг."
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {companies.map((c) => (
          <li key={c.name}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-[190px] flex-col justify-between gap-8 rounded-[28px] border border-line bg-white p-6 transition-colors duration-300 hover:border-pine-900 hover:bg-pine-900"
            >
              <span className="flex items-center justify-between">
                <Cross className="size-5 text-brand-500 group-hover:text-brand-300" />
                <ArrowUpRight className="size-5 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-lg leading-6 font-bold text-pine-900 group-hover:text-white">
                  {c.name}
                </span>
                <span className="text-sm leading-5 text-ink-500 group-hover:text-white/70">{c.role}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
