"use client";

import { getOpenStatus } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";
import { cn } from "@/lib/cn";

export default function OpenBadge({ schedule, className }: { schedule: string; className?: string }) {
  const now = useNow();
  if (!now) return <span className={cn("inline-block h-6 w-28 rounded-full bg-chip", className)} />;

  const status = getOpenStatus(schedule, now);
  if (!status.known) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs leading-4 font-semibold",
        status.open ? "bg-brand-50 text-brand-700" : "bg-chip text-ink-500",
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", status.open ? "bg-success" : "bg-ink-300")} />
      {status.open
        ? `Нээлттэй · ${status.closesAt} хүртэл`
        : status.opensAt
          ? `Хаалттай · ${status.opensAt}-д нээнэ`
          : "Хаалттай"}
    </span>
  );
}
