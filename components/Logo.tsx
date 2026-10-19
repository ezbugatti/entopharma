import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

// Түр лого: ЭНТО ГРУПП-ийн лого + "ФАРМ". Албан ёсны Энто Фарм лого гарвал энд солино.
export default function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const width = size === "lg" ? 150 : 109;
  return (
    <Link href="/" aria-label="ЭНТО ФАРМ — нүүр хуудас" className={cn("flex items-center gap-3", className)}>
      <Image src="/logo-ento.svg" alt="ЭНТО" width={width} height={Math.round((width * 48) / 209)} priority />
      <span className={cn("w-px bg-ink-700/15", size === "lg" ? "h-8" : "h-6")} />
      <span
        className={cn(
          "font-semibold tracking-[0.2em] text-brand-500",
          size === "lg" ? "text-xl" : "text-[15px]"
        )}
      >
        ФАРМ
      </span>
    </Link>
  );
}
