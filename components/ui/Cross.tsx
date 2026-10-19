import { cn } from "@/lib/cn";

// Эмийн сангийн "+" загалмай — бөөрөнхий булантай
export default function Cross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4", className)}>
      <path
        d="M9.5 3.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v6h6a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-6v6a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1-1.5-1.5v-6h-6A1.5 1.5 0 0 1 2 13v-2a1.5 1.5 0 0 1 1.5-1.5h6z"
        fill="currentColor"
      />
    </svg>
  );
}
