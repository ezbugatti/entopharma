import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "white" | "ghost";

const variants: Record<Variant, string> = {
  // ento.mn: bg-[#00AC94] + hover:shadow-[var(--shadow-brand-high)]
  primary: "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-brand",
  // ento.mn: bg-[rgba(12,21,29,0.04)] + hover:bg-translucent-dark-8
  secondary: "bg-ink-900/4 text-ink-700 hover:bg-ink-900/8",
  white: "bg-white text-brand-600 hover:bg-brand-50",
  ghost: "text-brand-500 hover:bg-brand-50",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm leading-5 font-medium whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
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
