import { ArrowRight, Phone } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { Badge } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export default function Hero({ count }: { count: number }) {
  return (
    <section className="mx-auto flex w-full max-w-[1024px] flex-col items-center px-4 pt-12 pb-8 sm:pt-16">
      <div className="flex w-full flex-col items-center gap-5 text-center">
        <Badge>
          <span className="size-1.5 rounded-full bg-brand-500" />
          ЭНТО ГРУПП-ийн сүлжээ эмийн сан
        </Badge>
        <h1 className="text-[32px] leading-10 font-semibold text-ink-700 sm:text-[40px] sm:leading-[48px]">
          Чанартай эм, мэргэжлийн зөвлөгөө
          <br className="hidden sm:block" /> <span className="text-brand-500">танд ойрхон</span>
        </h1>
        <p className="mx-auto max-w-[640px] text-base leading-6 text-ink-500">
          Энто Фарм ХХК нь хэрэглэгчдийн хэрэгцээ шаардлагад нийцсэн, чанартай эм, эрүүл мэндийн бүтээгдэхүүн,
          эмзүйн тусламж үйлчилгээг Улаанбаатар хотын {count} салбар эмийн сангаараа дамжуулан өдөр бүр хүргэж
          байна.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <ButtonLink href={site.phoneHref} variant="secondary">
          <Phone className="size-4" />
          Эм зүйчээс асуух
        </ButtonLink>
        <ButtonLink href="/branches">
          Ойр салбар хайх
          <ArrowRight className="size-4" />
        </ButtonLink>
      </div>
    </section>
  );
}
