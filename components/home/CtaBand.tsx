import { MessageCircle, Phone } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { site } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="mx-auto w-full max-w-[1088px] px-4 pb-20">
      <div className="relative overflow-hidden rounded-[32px] bg-brand-500 px-6 py-12 text-center shadow-brand sm:px-12 md:py-16">
        {/* Логоны лотус дүрсийг санагдуулах тойргууд */}
        <div aria-hidden className="absolute -top-24 -left-16 size-72 rounded-full border-[40px] border-white/8" />
        <div aria-hidden className="absolute -right-20 -bottom-28 size-80 rounded-full border-[40px] border-white/8" />

        <div className="relative mx-auto flex max-w-[640px] flex-col items-center gap-5">
          <h2 className="text-[26px] leading-[34px] font-semibold text-white sm:text-[32px] sm:leading-10">
            Эмийн талаар асуух зүйл байна уу?
          </h2>
          <p className="text-base leading-6 text-white/85">
            Манай эм зүйчид эмийн хэрэглээ, бүтээгдэхүүний сонголтын талаар танд туслахад үргэлж бэлэн.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <ButtonLink href={site.phoneHref} variant="white">
              <Phone className="size-4" />
              {site.phone}
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" className="bg-white/12 text-white hover:bg-white/20">
              <MessageCircle className="size-4" />
              Санал, хүсэлт илгээх
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
