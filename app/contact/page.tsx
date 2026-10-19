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
        title="Бидэнтэй холбогдох"
        subtitle="Санал, хүсэлт, гомдол болон хамтран ажиллах саналаа илгээнэ үү. Бид аль болох шуурхай хариу өгөхийг эрмэлзэнэ."
        image="/images/hotline.webp"
      />

      <section className="mx-auto grid w-full max-w-[1088px] grid-cols-1 gap-8 px-4 pb-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-4">
          {contacts.map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <span className="inline-flex shrink-0 rounded-xl bg-brand-500 p-3 shadow-brand">
                  <Icon className="size-5 text-surface" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-5 text-ink-500">{label}</span>
                  <span className="text-base leading-6 font-semibold text-ink-700">{value}</span>
                </span>
              </>
            );
            const cls = "flex items-start gap-4 rounded-3xl bg-white p-6 shadow-card transition-shadow";
            return href ? (
              <a key={label} href={href} className={`${cls} hover:shadow-card-hover`}>
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
            className="group flex items-center justify-between gap-4 rounded-3xl border border-brand-200 bg-brand-50 p-6 text-brand-700 transition-colors hover:border-brand-500"
          >
            <span className="flex flex-col gap-1">
              <span className="text-base font-semibold">Салбартай шууд холбогдох уу?</span>
              <span className="text-sm text-brand-700/80">Салбар бүрийн утас, ажлын цагийг харах</span>
            </span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
