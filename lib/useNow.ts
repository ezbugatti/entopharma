"use client";

import { useEffect, useState } from "react";

// Цагаас хамаарсан UI-г зөвхөн client дээр тооцож hydration зөрөхөөс сэргийлнэ.
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
