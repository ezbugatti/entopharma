"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BranchCard from "@/components/branches/BranchCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";
import { DISTRICTS, districtOf } from "@/lib/district";
import { getOpenStatus } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";
import type { Branch } from "@/lib/types";

export default function BranchesPreview({ branches }: { branches: Branch[] }) {
  const now = useNow();

  // Нээлттэй салбаруудыг эхэнд гаргана (цаг тодорхой болсны дараа)
  const highlighted = [...branches]
    .sort((a, b) => {
      if (!now) return 0;
      const ao = getOpenStatus(a.schedule, now);
      const bo = getOpenStatus(b.schedule, now);
      return Number(bo.known && bo.open) - Number(ao.known && ao.open);
    })
    .slice(0, 6);

  const counts = DISTRICTS.map((d) => ({ d, n: branches.filter((b) => districtOf(b) === d).length })).filter(
    (x) => x.n > 0
  );

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto flex w-full max-w-[1088px] flex-col gap-10 px-4">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            badge="Салбарын сүлжээ"
            title={
              <>
                {branches.length} салбар — <span className="text-brand-500">танд хамгийн ойр</span>
              </>
            }
            description={`Улаанбаатар хотын ${counts.length} дүүрэгт байрлах салбаруудаас өөрт ойрыг сонгоорой.`}
          />
          <ButtonLink href="/branches" className="self-start md:self-auto">
            Бүх салбар, газрын зураг
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4">
          {counts.map(({ d, n }) => (
            <Link
              key={d}
              href={`/branches?district=${encodeURIComponent(d)}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-ink-900/8 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-500"
            >
              {d}
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">{n}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlighted.map((b) => (
            <BranchCard key={b._id} branch={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
