"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/Logo";
import ButtonLink from "@/components/ui/ButtonLink";
import Cross from "@/components/ui/Cross";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Дээд мэдээллийн мөр — эмийн сангийн сайтуудын түгээмэл хэв маяг */}
      <div className="bg-pine-900 text-[13px] leading-5 text-white/75">
        <div className="mx-auto flex h-10 w-[1280px] max-w-full items-center justify-between gap-4 px-4 sm:px-6">
          <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
            <Cross className="size-3.5 text-brand-300" />
            <span className="hidden sm:inline">Эмийн сангийн лавлах утас</span>
            <span className="font-semibold text-white">{site.phone}</span>
          </a>
          <a
            href={site.group.ento}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white"
          >
            ЭНТО ГРУПП-ийн гишүүн
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-colors duration-300",
          scrolled ? "border-line bg-white/90 backdrop-blur-md" : "border-transparent bg-cream"
        )}
      >
        <div className="mx-auto flex h-[72px] w-[1280px] max-w-full items-center justify-between px-4 sm:px-6">
          <Logo />

          <nav className="hidden lg:block" aria-label="Үндсэн цэс">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-white/70 p-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-2 text-sm leading-5 font-semibold whitespace-nowrap transition-colors xl:px-5",
                      isActive(item.href) ? "bg-pine-900 text-white" : "text-ink-500 hover:text-pine-900"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href="/branches">
              <MapPin className="size-4" />
              Салбар хайх
            </ButtonLink>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Цэс нээх"
            aria-expanded={open}
            className="rounded-full border border-line bg-white p-2.5 text-pine-900 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer — баруун талаас */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-pine-950/40 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-[61] flex h-dvh w-[88vw] max-w-sm flex-col bg-cream shadow-float transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            aria-label="Цэс хаах"
            className="rounded-full border border-line bg-white p-2.5 text-pine-900"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 px-5 py-4" aria-label="Гар утасны цэс">
          <ul className="flex flex-col gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-bold",
                    isActive(item.href) ? "bg-pine-900 text-white" : "text-pine-900 hover:bg-white"
                  )}
                >
                  {item.name}
                  <Cross className={cn("size-3.5", isActive(item.href) ? "text-brand-300" : "text-brand-500")} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 border-t border-line p-5">
          <ButtonLink href="/branches">
            <MapPin className="size-4" />
            Ойр салбар хайх
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline">
            <Phone className="size-4" />
            {site.phone}
          </ButtonLink>
        </div>
      </aside>
    </>
  );
}
