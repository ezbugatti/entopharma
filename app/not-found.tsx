import { ArrowRight } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[640px] flex-col items-center gap-5 px-4 py-28 text-center">
      <span className="font-display text-[72px] leading-none font-extrabold text-brand-500">404</span>
      <h1 className="font-display text-2xl font-extrabold text-pine-900">Хуудас олдсонгүй</h1>
      <p className="text-ink-500">Таны хайсан хуудас устсан эсвэл хаяг буруу байна.</p>
      <ButtonLink href="/">
        Нүүр хуудас руу буцах
        <ArrowRight className="size-4" />
      </ButtonLink>
    </section>
  );
}
