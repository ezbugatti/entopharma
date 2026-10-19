import { Armchair, BookOpenCheck, HeartHandshake, PackageSearch, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BookOpenCheck,
    title: "Эмзүйн өндөр мэдлэг",
    description:
      "Эм зүйч, эм найруулагч нар маань мэргэжлийн болон харилцаа, үйлчилгээний сургалтад тогтмол хамрагдаж, эмийн зөв хэрэглээний талаар найдвартай зөвлөгөө өгдөг.",
  },
  {
    icon: Armchair,
    title: "Тав тухтай орчин",
    description:
      "Цэвэр, гэгээлэг, эмх цэгцтэй салбаруудад хэрэгцээт бүтээгдэхүүнээ хамгийн хялбар, түргэн шуурхай авах боломжийг бүрдүүлсэн.",
  },
  {
    icon: PackageSearch,
    title: "Бүтээгдэхүүний өргөн сонголт",
    description:
      "ЭНТО ГРУПП-ийн 20 улсын 80 гаруй үйлдвэрлэгчтэй хамтын ажиллагаанд тулгуурласан, чанарын баталгаатай эм, эрүүл мэндийн бүтээгдэхүүн.",
  },
  {
    icon: HeartHandshake,
    title: "Найрсаг харилцаа",
    description:
      "Үйлчлүүлэгч бүрийг хүндэтгэлтэй, найрсаг хүлээн авч, хэрэгцээг нь сонсож ойлгох нь бидний үйлчилгээний үндэс.",
  },
];

// ento.mn-ийн OurValues картын загвар: icon хайрцаг hover дээр ногоон болно
export default function WhyUs() {
  return (
    <section className="mx-auto flex w-full max-w-[1088px] flex-col gap-12 px-4 py-16 md:gap-16">
      <SectionHeading
        align="left"
        badge="Яагаад ЭНТО ФАРМ гэж?"
        title="Эрүүл мэндийн хэрэгцээ бүрт итгэлтэй түнш"
        description="Өдөр бүр олон мянган хүнд эрүүл мэндийн хэрэгцээгээ хангахад нь туслахдаа бид дараах зарчмыг баримталдаг."
      />
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {reasons.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="group flex flex-col items-start gap-8 rounded-3xl bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
          >
            <div className="inline-flex items-center justify-center rounded-xl bg-surface p-4 transition-colors duration-300 group-hover:bg-brand-500">
              <Icon className="size-8 text-brand-500 transition-colors duration-300 group-hover:text-surface" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl leading-7 font-semibold text-ink-700">{title}</h3>
              <p className="text-sm leading-5 font-medium text-ink-500">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
