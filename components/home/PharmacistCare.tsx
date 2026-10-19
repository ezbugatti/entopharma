import Image from "next/image";
import { ArrowUpRight, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";
import Cross from "@/components/ui/Cross";
import { site } from "@/lib/site";

const topics = [
  { title: "Тун ба хэрэглэх заавар", text: "Хэдийд, ямар хэмжээгээр, хоолны өмнө эсвэл дараа уух вэ." },
  { title: "Харилцан үйлчлэл", text: "Таны хэрэглэж буй бусад эм, нэмэлт бүтээгдэхүүнтэй нийцэх эсэх." },
  { title: "Гаж нөлөө", text: "Анхаарах шинж тэмдэг, тохиолдвол юу хийх тухай." },
  { title: "Зөв хадгалалт", text: "Эмийн үйлчилгээг алдагдуулахгүй хадгалах нөхцөл." },
];

export default function PharmacistCare() {
  return (
    <section className="mx-auto grid w-[1280px] max-w-full grid-cols-1 items-center gap-14 px-4 pb-20 sm:px-6 md:pb-24 lg:grid-cols-2 lg:gap-20">
      <div className="relative">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[40px]">
          <Image
            src="/images/consultation.webp"
            alt="Эм зүйч үйлчлүүлэгчид зөвлөгөө өгч байна"
            fill
            sizes="(min-width: 1024px) 700px, 120vw"
            className="object-cover"
          />
        </div>
        {/* Наалт */}
        <div className="absolute -top-6 -right-2 grid size-28 rotate-[-8deg] place-items-center rounded-full bg-amber text-center shadow-float sm:-right-6 sm:size-32">
          <span className="flex flex-col items-center gap-1 px-3">
            <Cross className="size-5 text-pine-900" />
            <span className="font-display text-[13px] leading-4 font-extrabold text-pine-900">
              Мэргэжлийн
              <br />
              зөвлөгөө
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Эм зүйчийн зөвлөгөө"
          title="Эмээ зөв хэрэглэхэд тань туслана"
          description="Манай эм зүйчид мэргэжлийн болон харилцааны сургалтад тогтмол хамрагдаж, эмийн зөв, зохистой хэрэглээг дэмждэг. Асуух зүйлээ эм зүйчдээ чөлөөтэй хандаарай."
        />

        <ol className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          {topics.map((t, i) => (
            <li key={t.title} className="flex gap-4 border-t border-line py-5">
              <span className="font-display text-sm leading-6 font-extrabold text-brand-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-base leading-6 font-bold text-pine-900">{t.title}</span>
                <span className="text-sm leading-6 text-ink-500">{t.text}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href={site.phoneHref} variant="dark">
            <Phone className="size-4" />
            Эм зүйчээс асуух · {site.phone}
          </ButtonLink>
          <ButtonLink href="https://ento.mn/mn/sideEffects" variant="outline">
            Гаж нөлөө мэдээллэх
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
