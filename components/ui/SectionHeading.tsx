import Cross from "./Cross";
import { cn } from "@/lib/cn";

// "+ ГАРЧИГ" маягийн жижиг eyebrow — ento.mn-ийн саарал pill badge-ээс ялгарна
export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs leading-4 font-bold tracking-[0.14em] uppercase",
        tone === "brand" ? "text-brand-600" : "text-brand-300",
        className
      )}
    >
      <Cross className="size-3.5" />
      {children}
    </span>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "max-w-[720px] font-display text-[30px] leading-[1.15] font-extrabold tracking-[-0.02em] sm:text-[40px]",
          tone === "light" ? "text-white" : "text-pine-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-[600px] text-base leading-7", tone === "light" ? "text-white/70" : "text-ink-500")}>
          {description}
        </p>
      )}
    </div>
  );
}
