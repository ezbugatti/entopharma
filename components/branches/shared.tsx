import Image from "next/image";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import OpenBadge from "./OpenBadge";
import { districtOf } from "@/lib/district";
import type { Branch } from "@/lib/types";
import { cn } from "@/lib/cn";

export const directionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`;

// "70084043, 7012 1211-3-3-2" → эхний дугаарыг tel: линк болгоно
export const primaryPhone = (phone: string) => phone.split(",")[0].trim();
export const telHref = (phone: string) => `tel:+976${primaryPhone(phone).replace(/\D/g, "").slice(0, 8)}`;

export function BranchImage({ branch, className, sizes }: { branch: Branch; className?: string; sizes: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      {branch.image ? (
        <Image src={branch.image} alt={`${branch.name} эмийн сан`} fill sizes={sizes} className="object-cover" />
      ) : (
        <Image src="/images/interior.webp" alt="" fill sizes={sizes} className="object-cover opacity-80" />
      )}
    </div>
  );
}

export default function BranchCard({ branch }: { branch: Branch }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <BranchImage
        branch={branch}
        sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
        className="h-44 w-full [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold tracking-wide text-ink-300 uppercase">{districtOf(branch)}</span>
          <OpenBadge schedule={branch.schedule} />
        </div>
        <h3 className="text-xl leading-7 font-semibold text-ink-700">{branch.name}</h3>
        <ul className="flex flex-col gap-2 text-sm leading-5 text-ink-500">
          <li className="flex gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" />
            <span className="line-clamp-2">{branch.address}</span>
          </li>
          <li className="flex gap-2">
            <Clock className="mt-0.5 size-4 shrink-0 text-brand-500" />
            {branch.schedule}
          </li>
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <a
            href={telHref(branch.phone)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink-900/4 px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-900/8"
          >
            <Phone className="size-4" />
            {primaryPhone(branch.phone)}
          </a>
          <a
            href={directionsUrl(branch)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-500 transition-colors hover:bg-brand-50"
          >
            <Navigation className="size-4" />
            Чиглэл
          </a>
        </div>
      </div>
    </article>
  );
}
