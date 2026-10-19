"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Navigation, Phone } from "lucide-react";
import OpenBadge from "@/components/branches/OpenBadge";
import { BranchImage, directionsUrl, telHref } from "@/components/branches/shared";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";
import { DISTRICTS, districtOf, type District } from "@/lib/district";
import { getOpenStatus } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";
import type { Branch } from "@/lib/types";
import { cn } from "@/lib/cn";

type Filter = "Бүгд" | District;

// Нүүр хуудасны салбар хайгч самбар: зүүн талд дүүрэг, баруун талд салбарын мөрүүд
export default function StoreFinder({ branches }: { branches: Branch[] }) {
  const [district, setDistrict] = useState<Filter>("Бүгд");
  const now = useNow(5 * 60_000);

  const tabs = useMemo(
    () => [
      { d: "Бүгд" as Filter, n: branches.length },
      ...DISTRICTS.map((d) => ({ d: d as Filter, n: branches.filter((b) => districtOf(b) === d).length })).filter(
        (x) => x.n > 0
      ),
    ],
    [branches]
  );

  const list = useMemo(() => {
    const isOpen = (b: Branch) => {
      if (!now) return 0;
      const s = getOpenStatus(b.schedule, now);
      return s.known && s.open ? 1 : 0;
    };
    return branches
      .filter((b) => district === "Бүгд" || districtOf(b) === district)
      .sort((a, b) => isOpen(b) - isOpen(a));
  }, [branches, district, now]);

  const mapHref = district === "Бүгд" ? "/branches" : `/branches?district=${encodeURIComponent(district)}`;

  return (
    <section className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto grid w-[1280px] max-w-full grid-cols-1 gap-10 rounded-[40px] bg-mint p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:p-14">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Салбарын сүлжээ"
            title={`${branches.length} салбар — танд хамгийн ойр`}
            description={`Улаанбаатар хотын ${tabs.length - 1} дүүрэгт. Дүүргээ сонгоод хамгийн ойр салбараа олоорой.`}
          />
          <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0">
            {tabs.map(({ d, n }) => (
              <button
                key={d}
                onClick={() => setDistrict(d)}
                aria-pressed={district === d}
                className={cn(
                  "flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  district === d ? "bg-pine-900 text-white" : "bg-white text-ink-700 hover:text-brand-600"
                )}
              >
                {d}
                <span className={cn("text-xs", district === d ? "text-brand-300" : "text-ink-300")}>{n}</span>
              </button>
            ))}
          </div>
          <ButtonLink href={mapHref} variant="dark" className="self-start">
            Газрын зураг дээр харах
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <ul className="flex max-h-[520px] flex-col gap-3 overflow-y-auto pr-1" aria-live="polite">
          {list.map((b) => (
            <li key={b._id} className="flex items-center gap-4 rounded-2xl bg-white p-3 pr-4 transition-shadow hover:shadow-soft">
              <BranchImage branch={b} sizes="100px" className="size-16 shrink-0 rounded-xl" />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-base leading-6 font-bold text-pine-900">{b.name}</h3>
                  <OpenBadge schedule={b.schedule} />
                </div>
                <p className="line-clamp-1 text-sm leading-5 text-ink-500">{b.address}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <a
                  href={telHref(b.phone)}
                  aria-label={`${b.name} руу залгах`}
                  className="grid size-10 place-items-center rounded-full border border-line text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600"
                >
                  <Phone className="size-4" />
                </a>
                <a
                  href={directionsUrl(b)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${b.name} хүрэх чиглэл`}
                  className="grid size-10 place-items-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
                >
                  <Navigation className="size-4" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
