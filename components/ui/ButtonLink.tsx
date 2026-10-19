import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "white" | "ghost";

// Капсул (эмийн капсул) хэлбэрийн товч — ento.mn-ийн rounded-lg товчноос ялгарна
const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-lift hover:-translate-y-0.5",
  dark: "bg-pine-900 text-white hover:bg-pine-800 hover:-translate-y-0.5",
  outline: "border border-line bg-white text-ink-700 hover:border-brand-500 hover:text-brand-600",
  white: "bg-white text-pine-900 hover:bg-mint hover:-translate-y-0.5",
  ghost: "text-brand-600 hover:bg-mint",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm leading-5 font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    variants[variant],
    className
  );

export default function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        className={buttonClass(variant, className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
