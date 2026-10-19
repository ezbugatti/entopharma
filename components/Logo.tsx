import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

// Албан ёсны ЭНТО ФАРМ лого (public/pharma-logo.png-оос `npm run logo`-оор үүсгэсэн, 758x201)
const RATIO = 758 / 201;

export default function Logo({
  className,
  size = "md",
  tone = "color",
}: {
  className?: string;
  size?: "md" | "lg";
  tone?: "color" | "white";
}) {
  const height = size === "lg" ? 52 : 46;
  return (
    <Link href="/" aria-label="ЭНТО ФАРМ — нүүр хуудас" className={cn("inline-flex shrink-0", className)}>
      <Image
        src={tone === "white" ? "/logo-entopharma-white.png" : "/logo-entopharma.png"}
        alt="ЭНТО ФАРМ"
        width={Math.round(height * RATIO)}
        height={height}
        priority
        className={cn("w-auto", size === "lg" ? "h-[52px]" : "h-10 sm:h-[46px]")}
      />
    </Link>
  );
}
