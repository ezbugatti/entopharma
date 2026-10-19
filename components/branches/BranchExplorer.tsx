"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Clock, LocateFixed, LoaderCircle, MapPin, Navigation, Phone, Search, X } from "lucide-react";
import OpenBadge from "./OpenBadge";
import { BranchImage, directionsUrl, primaryPhone, telHref } from "./BranchCard";
import { DISTRICTS, districtOf, type District } from "@/lib/district";
import { getOpenStatus } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";
import type { Branch } from "@/lib/types";
import { cn } from "@/lib/cn";

const BranchMap = dynamic(() => import("./BranchMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-surface-2" />,
});

type Filter = "Бүгд" | District;

function distanceKm(a: [number, number], b: [number, number]) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function BranchExplorer({
  branches,
  initialDistrict,
}: {
  branches: Branch[];
  initialDistrict?: string;
}) {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState<Filter>(
    () => DISTRICTS.find((d) => d === initialDistrict) ?? "Бүгд"
  );
  const [openOnly, setOpenOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const now = useNow();

  const districts = useMemo(
    () =>
      DISTRICTS.map((d) => ({ d, n: branches.filter((b) => districtOf(b) === d).length })).filter((x) => x.n > 0),
    [branches]
  );

  // "Одоо нээлттэй" шүүлтүүр идэвхтэй үед л цагийн өөрчлөлт жагсаалтыг дахин тооцно
  const openClock = openOnly ? now : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = branches
      .filter((b) => district === "Бүгд" || districtOf(b) === district)
      .filter((b) => !q || `${b.name} ${b.address}`.toLowerCase().includes(q))
      .filter((b) => {
        if (!openClock) return true;
        const s = getOpenStatus(b.schedule, openClock);
        return s.known && s.open;
      })
      .map((b) => ({ ...b, km: userLoc ? distanceKm(userLoc, [b.lat, b.lng]) : null }));
    return userLoc ? list.sort((a, b) => a.km! - b.km!) : list;
  }, [branches, district, query, openClock, userLoc]);

  const select = (id: string) => {
    setSelectedId(id);
    itemRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    if (selectedId && !filtered.some((b) => b._id === selectedId)) setSelectedId(null);
  }, [filtered, selectedId]);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setLocError("Таны хөтөч байршил тогтоохыг дэмжихгүй байна.");
      return;
    }
    setLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLoc(loc);
        setLocating(false);
        const nearest = [...branches].sort(
          (a, b) => distanceKm(loc, [a.lat, a.lng]) - distanceKm(loc, [b.lat, b.lng])
        )[0];
        if (nearest) setSelectedId(nearest._id);
      },
      () => {
        setLocating(false);
        setLocError("Байршил тогтоож чадсангүй. Хөтчийн байршлын зөвшөөрлөө шалгана уу.");
      },
      { enableHighAccuracy: true, timeout: 10_000 }
    );
  };

  const chip = (active: boolean) =>
    cn(
      "flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm leading-5 font-semibold transition-colors cursor-pointer",
      active ? "bg-brand-500 text-surface" : "bg-white text-ink-700 border border-ink-900/8 hover:border-brand-500"
    );

  return (
    <div className="mx-auto grid w-full max-w-[1312px] grid-cols-1 gap-6 px-4 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
      {/* Жагсаалт */}
      <div className="order-2 flex min-w-0 flex-col gap-6 lg:order-1">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Салбар хайх</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-300" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Салбарын нэр, хаягаар хайх"
              className="w-full rounded-xl border border-ink-900/8 bg-white py-3 pr-10 pl-12 text-base text-ink-700 placeholder:text-ink-300 focus:border-brand-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Хайлт цэвэрлэх"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-ink-300 hover:text-ink-700"
              >
                <X className="size-4" />
              </button>
            )}
          </label>
          <button
            onClick={locate}
            disabled={locating}
            className="flex items-center justify-center gap-2 rounded-xl border border-ink-900/8 bg-white px-5 py-3 text-base font-semibold text-ink-700 transition-colors hover:bg-gray-100 disabled:opacity-60"
          >
            {locating ? <LoaderCircle className="size-5 animate-spin" /> : <LocateFixed className="size-5" />}
            Надад ойр
          </button>
        </div>
        {locError && <p className="-mt-3 text-sm text-red-600">{locError}</p>}

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          <button className={chip(district === "Бүгд")} onClick={() => setDistrict("Бүгд")}>
            Бүгд <span className="opacity-70">{branches.length}</span>
          </button>
          {districts.map(({ d, n }) => (
            <button key={d} className={chip(district === d)} onClick={() => setDistrict(d)}>
              {d} <span className="opacity-70">{n}</span>
            </button>
          ))}
          <button
            className={cn(chip(openOnly), "sm:ml-auto")}
            onClick={() => setOpenOnly((v) => !v)}
            aria-pressed={openOnly}
          >
            <span className={cn("size-2 rounded-full", openOnly ? "bg-surface" : "bg-success")} />
            Одоо нээлттэй
          </button>
        </div>

        <p className="text-sm text-ink-500" aria-live="polite">
          {filtered.length} салбар олдлоо{userLoc && " · танаас ойрын дарааллаар"}
        </p>

        <ul className="flex flex-col gap-4 lg:max-h-[760px] lg:overflow-y-auto lg:pr-2">
          {filtered.map((b) => {
            const active = b._id === selectedId;
            return (
              <li key={b._id} ref={(el) => { itemRefs.current[b._id] = el; }}>
                <div
                  className={cn(
                    "flex gap-4 rounded-3xl border bg-white p-3 transition-all duration-200 sm:gap-5 sm:p-4",
                    active ? "border-brand-500 shadow-brand-soft" : "border-gray-200 hover:border-brand-300"
                  )}
                >
                  <button onClick={() => select(b._id)} className="shrink-0 cursor-pointer" aria-label={`${b.name} газрын зураг дээр харах`}>
                    <BranchImage branch={b} sizes="120px" className="size-24 rounded-2xl sm:size-28" />
                  </button>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={() => select(b._id)} className="cursor-pointer text-left">
                        <h3 className={cn("text-lg leading-6 font-semibold", active ? "text-brand-600" : "text-ink-700")}>
                          {b.name}
                        </h3>
                      </button>
                      {b.km !== null && (
                        <span className="rounded-full bg-chip px-2 py-0.5 text-xs font-semibold text-ink-500">
                          {b.km < 1 ? `${Math.round(b.km * 1000)} м` : `${b.km.toFixed(1)} км`}
                        </span>
                      )}
                    </div>
                    <OpenBadge schedule={b.schedule} className="self-start" />
                    <p className="flex gap-1.5 text-sm leading-5 text-ink-500">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" />
                      <span className={cn(!active && "line-clamp-1")}>{b.address}</span>
                    </p>
                    {active && (
                      <div className="flex flex-col gap-3 pt-1">
                        <p className="flex gap-1.5 text-sm leading-5 text-ink-500">
                          <Clock className="mt-0.5 size-4 shrink-0 text-brand-500" />
                          {b.schedule}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={telHref(b.phone)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-ink-900/4 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/8"
                          >
                            <Phone className="size-4" />
                            {primaryPhone(b.phone)}
                          </a>
                          <a
                            href={directionsUrl(b)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600"
                          >
                            <Navigation className="size-4" />
                            Чиглэл авах
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="rounded-3xl border border-dashed border-gray-300 p-10 text-center text-ink-500">
              Хайлтад тохирох салбар олдсонгүй.
              <button
                onClick={() => {
                  setQuery("");
                  setDistrict("Бүгд");
                  setOpenOnly(false);
                }}
                className="mt-3 block w-full font-semibold text-brand-500"
              >
                Шүүлтүүр цэвэрлэх
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Газрын зураг */}
      <div className="order-1 h-[340px] min-w-0 sm:h-[440px] lg:sticky lg:top-24 lg:order-2 lg:h-[calc(100vh-120px)] lg:max-h-[860px]">
        <BranchMap branches={filtered} selectedId={selectedId} onSelect={select} />
      </div>
    </div>
  );
}
