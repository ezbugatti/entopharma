import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  FileSearch,
  FileText,
  GraduationCap,
  Handshake,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Scale,
  Shuffle,
  Sprout,
  Sun,
  TrendingUp,
  UserCheck,
  Users,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";
import Cross from "@/components/ui/Cross";
import CtaBand from "@/components/home/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Хүний нөөц",
  description:
    "ЭНТО ФАРМ-ын хүний нөөцийн бодлого, ажлын байрны давуу тал, сонгон шалгаруулалтын үе шат. Манай хамт олонд нэгдээрэй.",
};

// Агуулга: ento.mn/human (messages/mn.json → Human), эмийн сангийн онцлогт тааруулсан
const policies: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UserCheck,
    title: "Тохирсон ажлын байр",
    text: "Ур чадвар, сонирхол, авьяаст нь нийцүүлэн ажилтнаа зөв томилон, бүтээмжтэй, өндөр гүйцэтгэлтэй ажиллахад анхаардаг.",
  },
  {
    icon: Scale,
    title: "Шударга үнэлгээ",
    text: "Үүрэг, хариуцлагыг тодорхой хуваарилж, гүйцэтгэлийг бодитой, тэгш үнэлдэг тогтолцоо хэрэгжүүлдэг.",
  },
  {
    icon: Award,
    title: "Үр дүнд суурилсан урамшуулал",
    text: "Хөдөлмөрийн үнэ цэнийг бодитойгоор үнэлж, урт хугацаанд тогтвортой, идэвхтэй ажиллах нөхцөлийг бүрдүүлдэг.",
  },
  {
    icon: GraduationCap,
    title: "Тасралтгүй хөгжил",
    text: "Эм зүйч, эм найруулагч болон бусад ажилтнуудынхаа мэргэжлийн болон харилцаа, үйлчилгээний ур чадварыг тогтмол сургалтаар шат дараатай хөгжүүлдэг.",
  },
  {
    icon: Users,
    title: "Эерэг хамт олон",
    text: "Хүндэтгэл, ойлголцол, бүтээлч уур амьсгалаар баялаг байгууллагын соёлыг эрхэмлэнэ.",
  },
];

const benefits: { icon: LucideIcon; text: string }[] = [
  { icon: TrendingUp, text: "Гүйцэтгэлд тулгуурласан урамшууллын тогтолцоо" },
  { icon: Shuffle, text: "ЭНТО ГРУПП-ийн бусад салбарт хөрвөн ажиллах боломж" },
  { icon: Sprout, text: "Ажилтан бүрт өсөн дэвших адил тэгш боломж" },
  { icon: Wallet, text: "Өрсөлдөхүйц цалин урамшуулал" },
  { icon: Sun, text: "Ажиллах таатай орчин" },
  { icon: UsersRound, text: "Чадварлаг, мэргэжлийн, нөхөрсөг хамт олон" },
];

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Megaphone,
    title: "Ажлын байр зарлах",
    text: "Байгууллагын хэрэгцээ, шаардлагад нийцсэн ажлын байрыг зарлаж, чадварлаг мэргэжилтнүүдийг багтаа урина.",
  },
  {
    icon: FileText,
    title: "Анкет хүлээн авах",
    text: "Сонгон шалгаруулалтад оролцох хүсэлтэй ажил горилогчдын анкетыг хүлээн авч, мэдээллийг нууцлалтайгаар бүртгэнэ.",
  },
  {
    icon: FileSearch,
    title: "Анкетын шалгаруулалт",
    text: "Анкетыг нягтлан шалгаж, шаардлагад нийцсэн нэр дэвшигчдийг дараагийн шатанд урина.",
  },
  {
    icon: MessagesSquare,
    title: "Анхан шатны ярилцлага",
    text: "Сонгогдсон нэр дэвшигчдийн ур чадвар, ажилд тохирох байдлыг үнэлэх эхний ярилцлагыг зохион байгуулна.",
  },
  {
    icon: Users,
    title: "Хоёрдугаар шатны ярилцлага",
    text: "Анхан шатанд тэнцсэн нэр дэвшигчдийг удирдлагатай уулзуулж, ажилд тохирох байдлыг илүү нарийвчлан үнэлнэ.",
  },
  {
    icon: Handshake,
    title: "Ажлын санал хүргүүлэх",
    text: "Тэнцсэн ажил горилогчид ажлын санал хүргүүлж, гэрээ байгуулан манай багийн нэг хэсэг болно.",
  },
];

export default function HrPage() {
  return (
    <>
      <PageHero
        crumb="Хүний нөөц"
        title="Хамт олон, хамтын ажиллагаа"
        subtitle="Ажилтан бүрийн хувьд эерэг ажлын орчин, мэргэжлийн дэвшил, тогтвортой хөгжлийг бид хамтдаа бүтээдэг."
        image="/images/team.webp"
        imageAlt="ЭНТО ГРУПП-ийн хамт олон"
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href={site.careers}>
            <Briefcase className="size-4" />
            Нээлттэй ажлын байр
            <ArrowUpRight className="size-4" />
          </ButtonLink>
          <ButtonLink href="#selection" variant="outline">
            Сонгон шалгаруулалт
          </ButtonLink>
        </div>
      </PageHero>

      {/* Хүний нөөцийн бодлого */}
      <section className="mx-auto grid w-[1280px] max-w-full grid-cols-1 gap-12 px-4 pb-20 sm:px-6 md:pb-24 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="relative order-2 self-start lg:sticky lg:top-28 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[40px]">
            <Image
              src="/images/pharmacists.webp"
              alt="ЭНТО ФАРМ-ын эм зүйчид ажлын байран дээр"
              fill
              sizes="(min-width: 1024px) 1080px, 190vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -top-6 -right-2 grid size-28 rotate-[-8deg] place-items-center rounded-full bg-amber text-center shadow-float sm:-right-6 sm:size-32">
            <span className="flex flex-col items-center gap-1 px-3">
              <Cross className="size-5 text-pine-900" />
              <span className="font-display text-[13px] leading-4 font-extrabold text-pine-900">
                Сургалт
                <br />
                хөгжил
              </span>
            </span>
          </div>
        </div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading
            eyebrow="Бодлого"
            title="Хүний нөөцийн бодлого"
            description="Манай компанид хүн бүр өөрийн авьяас, ур чадвараа бүрэн ашиглан чөлөөтэй ажиллах боломжтой. Бид ажилтнуудаа ур чадвар, сонирхолд нь тохирсон ажлын байранд томилон үнэ цэнийг хамтдаа бүтээдэг."
          />
          <ol className="flex flex-col">
            {policies.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-5 border-t border-line py-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mint text-brand-600">
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-xs font-extrabold text-brand-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg leading-6 font-bold text-pine-900">{title}</span>
                  </span>
                  <span className="text-sm leading-6 text-ink-500">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Яагаад ЭНТО ФАРМ гэж? */}
      <section className="px-4 pb-20 sm:px-6 md:pb-24">
        <div className="cross-pattern relative mx-auto w-[1280px] max-w-full overflow-hidden rounded-[40px] bg-pine-900 px-6 py-14 sm:px-12 md:py-20">
          <Cross className="pointer-events-none absolute -top-20 -right-20 size-60 text-brand-500/10" />
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              tone="light"
              eyebrow="Давуу тал"
              title="Яагаад ЭНТО ФАРМ гэж?"
              description="Бид ажилтнууддаа өсөн дэвжих тэгш боломж, өрсөлдөхүйц урамшуулал, группын хэмжээнд салбар дамнан ажиллах хөгжлийн замналыг санал болгодог."
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-[15px] leading-6 font-semibold text-white">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Сонгон шалгаруулалт */}
      <section
        id="selection"
        className="mx-auto flex w-[1280px] max-w-full scroll-mt-28 flex-col gap-12 px-4 pb-20 sm:px-6 md:pb-24"
      >
        <SectionHeading
          eyebrow="Сонгон шалгаруулалт"
          title="Манай багт нэгдэх 6 алхам"
          description="Бид ажлын байранд хамгийн тохиромжтой нэр дэвшигчийг сонгох олон шатлалт шалгаруулалтыг нээлттэй, шударга байдлаар зохион байгуулдаг."
        />
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="relative flex flex-col gap-5 rounded-[28px] border border-line bg-white p-7 transition-colors hover:border-brand-500"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-pine-900 px-3 py-1 font-display text-sm font-extrabold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="size-6 text-brand-500" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-lg leading-6 font-bold text-pine-900">{title}</h3>
                <p className="text-sm leading-6 text-ink-500">{text}</p>
              </div>
              {/* Дараагийн алхам руу заасан сум (desktop, мөрийн төгсгөлөөс бусад) */}
              {i % 3 !== 2 && i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-8 -right-[22px] z-10 hidden size-9 place-items-center rounded-full border border-line bg-cream text-brand-600 lg:grid"
                >
                  <ArrowRight className="size-4" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <CtaBand
        title="Манай хамт олонд нэгдээрэй"
        description="Нээлттэй ажлын байрууд болон анкет илгээх заавартай Zangia.mn дээр танилцаарай."
      >
        <ButtonLink href={site.careers} variant="white">
          <Briefcase className="size-4" />
          Нээлттэй ажлын байр
          <ArrowUpRight className="size-4" />
        </ButtonLink>
        <ButtonLink href="/contact" variant="dark">
          <MessageCircle className="size-4" />
          Холбоо барих
        </ButtonLink>
      </CtaBand>
    </>
  );
}
