import { MessageCircle, Phone } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import Cross from "@/components/ui/Cross";
import { site } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="cross-pattern relative mx-auto flex w-[1280px] max-w-full flex-col gap-8 overflow-hidden rounded-[40px] bg-brand-500 px-6 py-12 sm:px-12 md:py-14 lg:flex-row lg:items-center lg:justify-between">
        <Cross className="pointer-events-none absolute -right-16 -bottom-24 size-56 text-white/10" />
        <div className="relative flex max-w-[620px] flex-col gap-3">
          <h2 className="font-display text-[28px] leading-[1.15] font-extrabold tracking-[-0.02em] text-white sm:text-[36px]">
            Эмийн талаар асуух зүйл байна уу?
          </h2>
          <p className="text-base leading-7 text-white/85">
            Манай эм зүйчид эмийн хэрэглээ, бүтээгдэхүүний сонголтын талаар танд туслахад бэлэн.
          </p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <ButtonLink href={site.phoneHref} variant="white">
            <Phone className="size-4" />
            {site.phone}
          </ButtonLink>
          <ButtonLink href="/contact" variant="dark">
            <MessageCircle className="size-4" />
            Санал, хүсэлт илгээх
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
