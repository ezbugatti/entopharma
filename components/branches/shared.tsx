import Image from "next/image";
import type { Branch } from "@/lib/types";
import { cn } from "@/lib/cn";

export const directionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`;

// "70084043, 7012 1211-3-3-2" → эхний дугаарыг tel: линк болгоно
export const primaryPhone = (phone: string) => phone.split(",")[0].trim();
export const telHref = (phone: string) => `tel:+976${primaryPhone(phone).replace(/\D/g, "").slice(0, 8)}`;

export function BranchImage({ branch, className, sizes }: { branch: Branch; className?: string; sizes: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-cream-2", className)}>
      <Image
        src={branch.image || "/images/interior.webp"}
        alt={branch.image ? `${branch.name} эмийн сан` : ""}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
