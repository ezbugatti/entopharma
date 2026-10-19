import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Logo from "@/components/Logo";
import Cross from "@/components/ui/Cross";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Энто Фарм",
    links: [
      { name: "Бидний тухай", href: "/about" },
      { name: "Салбарын байршил", href: "/branches" },
      { name: "Бидэнтэй холбогдох", href: "/contact" },
    ],
  },
  {
    title: "ЭНТО ГРУПП",
    links: [
      { name: "Энто ХХК", href: site.group.ento },
      { name: "Эм ханган нийлүүлэх төв", href: site.group.supplier },
      { name: "Энто Клиник", href: site.group.clinic },
      { name: "Энто Трэйд", href: site.group.trade },
    ],
  },
  {
    title: "Тусламж",
    links: [
      { name: "Эмийн гаж нөлөө мэдээллэх", href: "https://ento.mn/mn/sideEffects" },
      { name: "Эм зүйчээс зөвлөгөө авах", href: site.phoneHref },
    ],
  },
];

const socials = [
  { label: "Facebook", href: site.social.facebook, Icon: Facebook },
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "YouTube", href: site.social.youtube, Icon: Youtube },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "text-sm leading-5 text-white/60 transition-colors hover:text-brand-300";
  if (href.startsWith("/")) return <Link href={href} className={cls}>{children}</Link>;
  return (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="cross-pattern relative w-full overflow-hidden bg-pine-950 text-white">
      <Cross className="pointer-events-none absolute -right-16 -bottom-20 size-80 text-white/[0.03]" />
      <div className="relative mx-auto flex w-[1280px] max-w-full flex-col gap-12 px-5 pt-16 pb-8 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-6">
            <Logo size="lg" tone="white" />
            <p className="max-w-sm text-sm leading-6 text-white/60">{site.description}</p>
            <ul className="flex flex-col gap-3 text-sm leading-5 text-white/80">
              <li className="flex items-start gap-3">
                <Phone className="size-4 shrink-0 text-brand-300" />
                <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="size-4 shrink-0 text-brand-300" />
                <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 text-brand-300" />
                {site.address}
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-5">
                <h3 className="font-display text-base font-bold text-white">{col.title}</h3>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((l) => (
                    <li key={l.name}>
                      <FooterLink href={l.href}>{l.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} ЭНТО ФАРМ ХХК · ЭНТО ГРУПП-ийн охин компани
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-brand-300 hover:text-brand-300"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
