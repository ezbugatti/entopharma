"use client";

import { getOpenStatus } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";
import type { Branch } from "@/lib/types";

// Зурган дээр хөвж харагдах "Одоо X салбар нээлттэй" шошго
export default function OpenNowChip({ branches }: { branches: Branch[] }) {
  const now = useNow();
  const open = now
    ? branches.filter((b) => {
        const s = getOpenStatus(b.schedule, now);
        return s.known && s.open;
      }).length
    : null;

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-ink-900/4 bg-surface/72 px-4 py-3 shadow-card backdrop-blur-[30px]">
      <span className="relative flex size-2.5">
        {open !== null && open > 0 && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
        )}
        <span className={`relative inline-flex size-2.5 rounded-full ${open ? "bg-success" : "bg-ink-300"}`} />
      </span>
      <span className="text-sm leading-5 font-semibold text-ink-700">
        {open === null ? "Салбаруудын төлөв…" : open > 0 ? `Яг одоо ${open} салбар нээлттэй` : "Одоогоор бүх салбар хаалттай"}
      </span>
    </div>
  );
}
