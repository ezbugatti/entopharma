"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/Logo";
import ButtonLink from "@/components/ui/ButtonLink";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 h-20 w-full bg-surface/72 shadow-header backdrop-blur-[20px]">
      <div className="mx-auto flex h-20 w-[1440px] max-w-full items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop nav — ento.mn-ийн hover glow эффект */}
        <nav className="mx-4 hidden lg:flex" aria-label="Үндсэн цэс">
          <ul className="flex items-center gap-4">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-block px-3 py-2 text-sm leading-5 font-semibold whitespace-nowrap transition-colors hover:text-brand-500 hover:[text-shadow:0_0_24px_#00AC94]",
                    isActive(item.href) ? "text-brand-500" : "text-ink-400"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href={site.phoneHref} variant="secondary" className="pr-5 pl-4">
            <Phone className="size-4" />
            {site.phone}
          </ButtonLink>
          <ButtonLink href="/branches">
            <MapPin className="size-4" />
            Салбар хайх
          </ButtonLink>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={site.phoneHref}
            aria-label={`Утас: ${site.phone}`}
            className="rounded-lg bg-ink-900/4 p-2 text-ink-700 transition-colors hover:bg-ink-900/8"
          >
            <Phone className="size-5" />
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Цэс нээх"
            aria-expanded={open}
            className="rounded-lg bg-ink-900/4 p-2 text-ink-700 transition-colors hover:bg-ink-900/8"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/20 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "fixed top-0 left-0 z-[61] flex h-dvh w-[90vw] max-w-xs flex-col bg-white shadow-xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <Logo />
          <button onClick={() => setOpen(false)} aria-label="Цэс хаах" className="p-2 text-ink-700">
            <X className="size-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6" aria-label="Гар утасны цэс">
          <ul className="flex flex-col gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className={cn(
                    "block py-1 text-lg font-semibold hover:text-brand-500",
                    isActive(item.href) ? "text-brand-500" : "text-ink-700"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 border-t border-gray-100 p-4">
          <ButtonLink href="/branches">
            <MapPin className="size-4" />
            Ойр салбар хайх
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="secondary">
            <Phone className="size-4" />
            {site.phone}
          </ButtonLink>
        </div>
      </aside>
    </header>
  );
}
