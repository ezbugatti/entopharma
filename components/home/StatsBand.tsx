import Cross from "@/components/ui/Cross";

export type Stat = { value: string; label: string };

// Гүн ногоон тоон үзүүлэлтийн мөр — ento.mn-ийн цагаан картан статистикаас ялгарна
export default function StatsBand({ stats }: { stats: Stat[] }) {
  return (
    <section className="px-4 sm:px-6">
      <div className="cross-pattern relative mx-auto w-[1280px] max-w-full overflow-hidden rounded-[32px] bg-pine-900 px-6 py-10 sm:px-12 sm:py-12">
        <Cross className="pointer-events-none absolute -top-20 -right-20 size-48 text-brand-500/10" />
        <dl className="relative grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1 lg:px-10 lg:first:pl-0">
              <dt className="text-sm leading-5 text-white/60">{s.label}</dt>
              <dd className="font-display text-[40px] leading-none font-extrabold tracking-tight text-white sm:text-5xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
