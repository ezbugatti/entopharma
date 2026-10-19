import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Cross from "./Cross";

// Дэд хуудасны толгой: breadcrumb + том гарчиг + нуман зураг
export default function PageHero({
  title,
  crumb = title,
  subtitle,
  image,
  imageAlt = "",
  children,
}: {
  title: string;
  crumb?: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <Cross className="pointer-events-none absolute top-6 -right-12 size-40 -rotate-12 text-brand-100/60 lg:hidden" />
      <div className="relative mx-auto grid w-[1280px] max-w-full grid-cols-1 items-end gap-10 px-4 pt-8 pb-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:pt-12 lg:pb-16">
        <div className="flex flex-col gap-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-400">
            <Link href="/" className="hover:text-brand-600">
              Нүүр
            </Link>
            <ChevronRight className="size-3.5" />
            <span aria-current="page" className="font-medium text-pine-900">
              {crumb}
            </span>
          </nav>
          <h1 className="font-display text-[38px] leading-[1.08] font-extrabold tracking-[-0.03em] text-pine-900 sm:text-[52px]">
            {title}
          </h1>
          <p className="max-w-[620px] text-lg leading-8 text-ink-500">{subtitle}</p>
          {children}
        </div>
        {image && (
          <div className="relative hidden lg:block">
            <div className="arch absolute inset-x-5 top-8 -bottom-4 bg-mint" aria-hidden />
            <div className="arch relative h-[300px] w-[250px] overflow-hidden">
              <Image src={image} alt={imageAlt} fill priority sizes="450px" className="object-cover" />
            </div>
            <Cross className="absolute -top-2 -left-3 size-8 text-amber" />
          </div>
        )}
      </div>
    </section>
  );
}
