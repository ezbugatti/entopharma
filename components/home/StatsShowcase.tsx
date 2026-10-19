import { Fragment } from "react";
import Image from "next/image";
import OpenNowChip from "./OpenNowChip";
import type { Branch } from "@/lib/types";

export type Stat = { value: string; label: string };

// ento.mn-ийн StatsSection: том зураг + доор нь тоон үзүүлэлтүүд, нэг цагаан картанд
export default function StatsShowcase({ branches, stats }: { branches: Branch[]; stats: Stat[] }) {
  return (
    <section className="px-4">
      <div className="mx-auto my-8 w-full max-w-[1024px] overflow-hidden rounded-[32px] bg-white p-3 shadow-lg sm:p-4">
        <div className="relative h-[240px] w-full overflow-hidden rounded-[20px] sm:h-[420px] md:h-[560px]">
          <Image
            src="/images/hero.webp"
            alt="ЭНТО ФАРМ эмийн сангийн эм зүйчид"
            fill
            priority
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-cover object-[50%_30%]"
          />
          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6">
            <OpenNowChip branches={branches} />
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-y-6 py-6 md:flex md:items-center md:justify-around md:py-8">
          {stats.map((s, i) => (
            <Fragment key={s.label}>
              <div className="flex flex-1 flex-col-reverse items-center gap-1 text-center md:gap-2">
                <dt className="px-2 text-sm leading-5 text-ink-500 md:text-base md:leading-6">{s.label}</dt>
                <dd className="text-[28px] leading-9 font-semibold text-brand-500 md:text-[32px] md:leading-10">
                  {s.value}
                </dd>
              </div>
              {i < stats.length - 1 && <div className="hidden h-10 w-px bg-surface-2 md:block" />}
            </Fragment>
          ))}
        </dl>
      </div>
    </section>
  );
}
