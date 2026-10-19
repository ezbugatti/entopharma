import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Холбоо барих",
  description: "Энто Фарм ХХК-тай холбогдох утас, имэйл, хаяг. Санал хүсэлтээ онлайнаар илгээнэ үү.",
};

const contacts: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
  { icon: Phone, label: "Лавлах утас", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Имэйл", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Төв оффис", value: site.address },
  { icon: Clock, label: "Оффисын цагийн хуваарь", value: "Даваа-Баасан 08:00-18:00" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Холбоо барих"
        subtitle="Санал, хүсэлт, гомдол болон хамтран ажиллах саналаа илгээнэ үү. Бид аль болох шуурхай хариу өгөхийг эрмэлзэнэ."
        image="/images/hotline.webp"
        imageAlt="Лавлах утасны ажилтан"
      />

      <section className="mx-auto grid w-[1280px] max-w-full grid-cols-1 gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-3">
          {contacts.map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mint text-brand-600">
                  <Icon className="size-5" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm leading-5 text-ink-400">{label}</span>
                  <span className="font-display text-base leading-6 font-bold text-pine-900">{value}</span>
                </span>
              </>
            );
            const cls = "flex items-center gap-4 rounded-[24px] border border-line bg-white p-5 transition-colors";
            return href ? (
              <a key={label} href={href} className={`${cls} hover:border-brand-500`}>
                {body}
              </a>
            ) : (
              <div key={label} className={cls}>
                {body}
              </div>
            );
          })}
          <Link
            href="/branches"
            className="group flex items-center justify-between gap-4 rounded-[24px] bg-pine-900 p-6 text-white transition-colors hover:bg-pine-800"
          >
            <span className="flex flex-col gap-1">
              <span className="font-display text-base font-bold">Салбартай шууд холбогдох уу?</span>
              <span className="text-sm text-white/65">Салбар бүрийн утас, ажлын цагийг харах</span>
            </span>
            <ArrowRight className="size-5 text-brand-300 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
