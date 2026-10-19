import { Armchair, BookOpenCheck, HeartHandshake, PackageSearch, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BookOpenCheck,
    title: "Эмзүйн өндөр мэдлэг",
    description:
      "Эм зүйч, эм найруулагч нар маань мэргэжлийн болон харилцаа, үйлчилгээний сургалтад тогтмол хамрагддаг.",
  },
  {
    icon: Armchair,
    title: "Тав тухтай орчин",
    description: "Цэвэр, гэгээлэг салбаруудад хэрэгтэй бүтээгдэхүүнээ хялбар, түргэн шуурхай аваарай.",
  },
  {
    icon: PackageSearch,
    title: "Бүтээгдэхүүний өргөн сонголт",
    description: "Группын нэгдсэн агуулах, түгээлтэд тулгуурласан чанарын баталгаатай бүтээгдэхүүн.",
  },
  {
    icon: HeartHandshake,
    title: "Найрсаг харилцаа",
    description: "Үйлчлүүлэгч бүрийг хүндэтгэлтэй хүлээн авч, хэрэгцээг нь сонсож ойлгоно.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid w-[1280px] max-w-full grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
        <SectionHeading
          eyebrow="Бидний амлалт"
          title="Яагаад ЭНТО ФАРМ гэж?"
          description="Өдөр бүр олон мянган хүнд эрүүл мэндийн хэрэгцээгээ хангахад нь туслахдаа бид эдгээр зарчмыг баримталдаг."
        />
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, description }) => (
            <article key={title} className="flex gap-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mint text-brand-600">
                <Icon className="size-6" strokeWidth={1.75} />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-lg leading-7 font-bold text-pine-900">{title}</h3>
                <p className="text-sm leading-6 text-ink-500">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
