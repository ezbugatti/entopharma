"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getOpenStatus } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";
import type { Branch } from "@/lib/types";
import { cn } from "@/lib/cn";

// Hero зурган дээр хөвөх "Яг одоо X салбар нээлттэй" карт
export default function OpenNowCard({ branches, className }: { branches: Branch[]; className?: string }) {
  const now = useNow();
  const open = now
    ? branches.filter((b) => {
        const s = getOpenStatus(b.schedule, now);
        return s.known && s.open;
      }).length
    : null;

  return (
    <Link
      href="/branches"
      className={cn(
        "group flex items-center gap-4 rounded-2xl bg-white p-4 pr-5 shadow-float transition-transform hover:-translate-y-0.5",
        className
      )}
    >
      <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-mint">
        <span className="relative flex size-3">
          {!!open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />}
          <span className={cn("relative inline-flex size-3 rounded-full", open ? "bg-success" : "bg-ink-300")} />
        </span>
      </span>
      <span className="flex flex-col">
        <span className="font-display text-[15px] leading-5 font-bold text-pine-900">
          {open === null ? "Салбаруудын төлөв…" : open > 0 ? `Яг одоо ${open} салбар нээлттэй` : "Одоогоор хаалттай"}
        </span>
        <span className="flex items-center gap-1 text-[13px] text-brand-600">
          Хамгийн ойрыг олох
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}
