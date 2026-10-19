import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Baby, Leaf, Pill, Thermometer, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const categories: { icon: LucideIcon; title: string; description: string; tone: string }[] = [
  {
    icon: Pill,
    title: "Эм",
    description: "Жортой болон жоргүй эм — эмчийн жорын дагуу олгох үйлчилгээтэй.",
    tone: "bg-mint",
  },
  {
    icon: Leaf,
    title: "Витамин, нэмэлт",
    description: "Дархлаа, эрч хүч, өдөр тутмын эрүүл мэндийг дэмжих нэмэлт бүтээгдэхүүн.",
    tone: "bg-amber-soft",
  },
  {
    icon: Baby,
    title: "Хүүхэд, арьс арчилгаа",
    description: "Хүүхдийн болон эмзэг арьсанд зориулсан арчилгааны бүтээгдэхүүн.",
    tone: "bg-white border border-line",
  },
  {
    icon: Thermometer,
    title: "Эмнэлгийн хэрэгсэл",
    description: "Даралтын аппарат, халуун хэмжигч, боолт, анхны тусламжийн хэрэгсэл.",
    tone: "bg-cream-2",
  },
];

// Bento grid — нэг том зурагтай хавтан + 4 ангиллын хавтан
export default function Categories() {
  return (
    <section className="mx-auto flex w-[1280px] max-w-full flex-col gap-10 px-4 py-20 sm:px-6 md:py-24">
      <SectionHeading
        eyebrow="Бүтээгдэхүүн"
        title="Эрүүл мэндэд хэрэгтэй бүхэн нэг дор"
        description="Өдөр тутмын хэрэгцээнээс эмчийн жортой эм хүртэл — салбар бүрт өргөн сонголттой."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        <Link
          href="/branches"
          className="group relative min-h-[320px] overflow-hidden rounded-[28px] sm:col-span-2 lg:row-span-2 lg:min-h-0"
        >
          <Image
            src="/images/pharmacists.webp"
            alt="Эмийн сангийн тавиур дээрх бүтээгдэхүүн"
            fill
            sizes="(min-width: 1024px) 720px, (min-width: 640px) 100vw, 140vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950/90 via-pine-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7 sm:p-8">
            <span className="font-display text-[44px] leading-none font-extrabold text-white">3600+</span>
            <span className="max-w-sm text-base leading-6 text-white/80">
              ЭНТО ГРУПП-ийн 20 улсын 80 гаруй үйлдвэрлэгчээс нийлүүлдэг нэр төрлийн бүтээгдэхүүн
            </span>
            <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-300">
              Ойр салбараас авах
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        {categories.map(({ icon: Icon, title, description, tone }) => (
          <article key={title} className={cn("flex flex-col gap-6 rounded-[28px] p-6 sm:p-7", tone)}>
            <span className="grid size-12 place-items-center rounded-full bg-white text-brand-600 shadow-soft">
              <Icon className="size-6" strokeWidth={1.75} />
            </span>
            <div className="mt-auto flex flex-col gap-2">
              <h3 className="font-display text-xl leading-7 font-bold text-pine-900">{title}</h3>
              <p className="text-sm leading-6 text-ink-500">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
