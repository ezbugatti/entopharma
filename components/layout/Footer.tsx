import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Компани",
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
  const cls = "text-sm leading-5 text-ink-400 transition-colors hover:text-brand-500";
  if (href.startsWith("/")) return <Link href={href} className={cls}>{children}</Link>;
  return (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-surface shadow-2xl">
      <div className="mx-auto flex w-[1440px] max-w-full flex-col gap-8 px-5 py-6 sm:px-8 md:px-16 md:py-8">
        <div className="flex w-full flex-col gap-10 py-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex w-full flex-col gap-8 lg:w-[416px]">
            <Logo size="lg" />
            <ul className="flex flex-col gap-4 lg:pr-16">
              <li className="flex items-start gap-2 text-sm leading-5 text-ink-700">
                <Phone className="size-5 shrink-0 text-brand-500" />
                <a href={site.phoneHref} className="hover:text-brand-500">{site.phone}</a>
              </li>
              <li className="flex items-start gap-2 text-sm leading-5 text-ink-700">
                <Mail className="size-5 shrink-0 text-brand-500" />
                <a href={`mailto:${site.email}`} className="hover:text-brand-500">{site.email}</a>
              </li>
              <li className="flex items-start gap-2 text-sm leading-5 text-ink-700">
                <MapPin className="size-5 shrink-0 text-brand-500" />
                {site.address}
              </li>
            </ul>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-5">
                <h3 className="text-base leading-6 font-bold text-brand-500">{col.title}</h3>
                <ul className="flex flex-col gap-4">
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

        <div className="h-px w-full bg-gray-200" />

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-5 font-bold text-gray-400">
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
                className="rounded-xl p-3 text-ink-700 transition-colors hover:bg-gray-100 hover:text-brand-500"
              >
                <Icon className="size-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
