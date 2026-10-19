import { cn } from "@/lib/cn";

// ento.mn-ийн хэсгийн гарчгийн загвар: саарал pill badge + 32px гарчиг + тайлбар
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[20px] bg-chip px-4 py-2 text-sm leading-5 font-semibold text-brand-500",
        className
      )}
    >
      {children}
    </span>
  );
}

export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
}: {
  badge?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && <Badge>{badge}</Badge>}
      <h2 className="text-[26px] leading-[34px] font-semibold text-ink-700 sm:text-[32px] sm:leading-10">
        {title}
      </h2>
      {description && <p className="max-w-[640px] text-base leading-6 text-ink-500">{description}</p>}
    </div>
  );
}
