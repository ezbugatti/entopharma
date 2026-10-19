import Image from "next/image";
import Link from "next/link";
import { Search, Stethoscope } from "lucide-react";
import OpenNowCard from "./OpenNowCard";
import Cross from "@/components/ui/Cross";
import { buttonClass } from "@/components/ui/ButtonLink";
import type { Branch } from "@/lib/types";

export default function Hero({ branches, districts }: { branches: Branch[]; districts: string[] }) {
  return (
    <section className="relative overflow-hidden">
      <Cross className="pointer-events-none absolute -bottom-16 -left-16 size-56 rotate-12 text-brand-100/50" />
      <Cross className="pointer-events-none absolute right-[42%] bottom-10 hidden size-8 text-amber/70 lg:block" />

      <div className="relative mx-auto grid w-[1280px] max-w-full grid-cols-1 items-center gap-14 px-4 pt-8 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-12 lg:pb-24">
        <div className="flex flex-col gap-7">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-mint px-3.5 py-1.5 text-[13px] leading-5 font-semibold text-brand-700">
            <Cross className="size-3.5" />
            Сүлжээ эмийн сан · Улаанбаатар
          </span>

          <h1 className="font-display text-[40px] leading-[1.08] font-extrabold tracking-[-0.03em] text-pine-900 sm:text-[56px] lg:text-[64px]">
            Таны эрүүл мэндэд <span className="marker">ойр</span>, итгэлтэй эмийн сан
          </h1>

          <p className="max-w-[520px] text-lg leading-8 text-ink-500">
            Улаанбаатарын {branches.length} салбараар чанартай эм, эрүүл мэндийн бүтээгдэхүүн, мэргэжлийн эм
            зүйчийн зөвлөгөөг өдөр бүр хүргэж байна.
          </p>

          <form
            action="/branches"
            role="search"
            className="flex w-full max-w-[540px] items-center gap-2 rounded-full border border-line bg-white p-1.5 pl-5 shadow-soft transition-colors focus-within:border-brand-500"
          >
            <Search className="size-5 shrink-0 text-ink-300" />
            <label htmlFor="hero-q" className="sr-only">
              Салбар хайх
            </label>
            <input
              id="hero-q"
              name="q"
              type="search"
              placeholder="Хороолол, гудамж, салбарын нэр…"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink-700 placeholder:text-ink-300 focus:outline-none"
            />
            <button type="submit" className={buttonClass("primary", "px-5 sm:px-6")}>
              Хайх
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-ink-400">Дүүргээр:</span>
            {districts.map((d) => (
              <Link
                key={d}
                href={`/branches?district=${encodeURIComponent(d)}`}
                className="rounded-full border border-line bg-white/60 px-3 py-1 font-medium text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                {d}
              </Link>
            ))}
          </div>
        </div>

        {/* Нуман цонх хэлбэрийн зураг + хөвөгч картууд */}
        <div className="relative mx-auto w-full max-w-[500px] lg:mr-0">
          <div className="arch absolute inset-x-8 top-12 -bottom-5 bg-mint" aria-hidden />
          <div className="arch relative aspect-[4/5] overflow-hidden bg-cream-2">
            <Image
              src="/images/hero-portrait.webp"
              alt="ЭНТО ФАРМ эмийн сангийн эм зүйчид"
              fill
              priority
              sizes="(min-width: 1024px) 500px, 90vw"
              quality={85}
              className="object-cover"
            />
          </div>

          <OpenNowCard branches={branches} className="absolute bottom-8 -left-2 sm:-left-12" />

          <div className="absolute top-20 right-3 flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-float sm:right-5">
            <span className="grid size-10 place-items-center rounded-full bg-amber-soft text-[#a26f00]">
              <Stethoscope className="size-5" />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-sm leading-5 font-bold text-pine-900">Эм зүйчийн зөвлөгөө</span>
              <span className="text-xs text-ink-400">Салбар бүрт</span>
            </span>
          </div>

          <Cross className="absolute -top-2 right-16 size-9 text-amber" />
        </div>
      </div>
    </section>
  );
}
