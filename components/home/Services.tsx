import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Headset, Pill, Stethoscope, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const services: {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
}[] = [
  {
    icon: Pill,
    title: "Эм, эрүүл мэндийн бүтээгдэхүүн",
    description:
      "Жортой болон жоргүй эм, эрүүл мэндийн нэмэлт бүтээгдэхүүн, эмнэлгийн хэрэгсэл, хүүхдийн арьс арчилгааны бүтээгдэхүүнийг нэг дороос. Бүх бүтээгдэхүүн группын нэгдсэн агуулах, түгээлтийн тогтолцоогоор дамжин чанар, хадгалалтын нөхцөлийн хяналттай ирдэг.",
    image: "/images/pharmacists.webp",
    href: "/branches",
    cta: "Ойр салбар хайх",
  },
  {
    icon: Stethoscope,
    title: "Эм зүйчийн мэргэжлийн зөвлөгөө",
    description:
      "Эмийн тун, хэрэглэх заавар, бусад эмтэй харилцан үйлчлэх байдал, гаж нөлөөний талаар салбар бүрийн мэргэжлийн эм зүйчээс зөвлөгөө аваарай. Бид эмийн зөв, зохистой хэрэглээг дэмждэг.",
    image: "/images/consultation.webp",
    href: "/branches",
    cta: "Салбаруудыг харах",
  },
  {
    icon: Headset,
    title: "Лавлах утас",
    description: `Салбарын байршил, ажлын цаг, бүтээгдэхүүний талаарх лавлагааг ${site.phone} дугаараас аваарай. Манай ажилтнууд таныг хамгийн ойр салбар руу чиглүүлж, асуултад тань хариулна.`,
    image: "/images/hotline.webp",
    href: site.phoneHref,
    cta: `${site.phone} руу залгах`,
  },
];

// ento.mn-ийн ServicesSection: зураг зүүн/баруун ээлжилсэн картууд, hover дээр текст дээш гулсаж CTA гарч ирнэ
export default function Services() {
  return (
    <section className="mx-auto flex w-full max-w-[1088px] flex-col items-center gap-12 px-4 py-16 md:gap-20">
      <SectionHeading
        badge="Бидний үйлчилгээ"
        title="Эрүүл амьдралыг хамтдаа шийдье"
        description="Эрүүл мэндийн найдвартай бүтээгдэхүүн, үйлчилгээг үйлчлүүлэгчиддээ итгэл, сэтгэлийн угаас хүндэтгэлтэй харилцаагаар хүргэнэ."
      />

      <div className="flex w-full flex-col gap-8 md:gap-12">
        {services.map((s, i) => {
          const reverse = i % 2 === 1;
          const Wrapper = s.href.startsWith("/") ? Link : "a";
          return (
            <Wrapper
              key={s.title}
              href={s.href}
              className={cn(
                "group flex flex-col items-center gap-6 rounded-2xl bg-white p-4 shadow-brand-soft transition-shadow duration-200 hover:shadow-card-hover sm:p-6 md:gap-12 md:rounded-3xl md:py-8",
                reverse ? "md:flex-row-reverse md:pr-8 md:pl-16" : "md:flex-row md:pr-16 md:pl-8"
              )}
            >
              <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-xl sm:h-[260px] md:h-[300px] md:w-[400px] md:rounded-2xl">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 400px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col items-start gap-5 md:gap-6">
                <div className="flex h-[60px] items-center">
                  <div className="inline-flex items-center justify-center rounded-xl bg-brand-500 p-3 shadow-brand transition-transform duration-500 ease-in-out md:group-hover:-translate-y-4">
                    <s.icon className="size-6 text-surface" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 transition-transform duration-500 ease-in-out md:group-hover:-translate-y-4">
                  <h3 className="text-xl leading-7 font-semibold text-ink-700">{s.title}</h3>
                  <p className="text-base leading-6 text-ink-500">{s.description}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-lg py-2 font-medium text-brand-500 transition-all duration-700 ease-in-out md:translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {s.cta}
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
