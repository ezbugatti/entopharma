import Image from "next/image";

// ento.mn-ийн business-area дэлгэрэнгүй хуудасны толгой: баннер зураг + шилэн (blur) карт
export default function PageHero({
  title,
  subtitle,
  image = "/images/banner.webp",
}: {
  title: string;
  subtitle: string;
  image?: string;
}) {
  return (
    <section className="px-4 pt-4 md:px-6">
      <div className="relative mx-auto flex h-[200px] w-full max-w-[1800px] items-center justify-center md:h-[280px]">
        <Image src={image} alt="" fill priority sizes="100vw" className="rounded-2xl object-cover" />
        <div className="absolute top-1/2 left-1/2 flex w-[92%] -translate-x-1/2 translate-y-4 flex-col items-center gap-3 rounded-2xl border border-ink-900/4 bg-surface/48 px-5 py-8 text-center backdrop-blur-[30px] md:w-[864px] md:gap-5 md:rounded-3xl md:px-28 md:py-[60px]">
          <h1 className="text-[24px] leading-8 font-semibold text-ink-700 md:text-[36px] md:leading-[44px]">{title}</h1>
          <p className="max-w-[640px] text-sm leading-5 text-ink-500 md:text-base md:leading-6">{subtitle}</p>
        </div>
      </div>
      <div className="h-24 md:h-36" />
    </section>
  );
}
