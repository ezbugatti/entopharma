import type { Branch } from "./types";

export const DISTRICTS = ["Баянзүрх", "Баянгол", "Сүхбаатар", "Хан-Уул", "Чингэлтэй"] as const;
export type District = (typeof DISTRICTS)[number] | "Бусад";

// Case-sensitive: "ХУД" нь "Худалдааны гудамж"-тай давхцахгүй байх ёстой
const PATTERNS: [RegExp, District][] = [
  [/БЗД|Баянзүрх|Улаанхуаран/, "Баянзүрх"],
  [/БГД|Баянгол/, "Баянгол"],
  [/СБД|Сүхбаатар/, "Сүхбаатар"],
  [/ХУД|Хан-[Уу]ул/, "Хан-Уул"],
  [/ЧД|Чингэлтэй/, "Чингэлтэй"],
];

// Хаягт дүүрэг заагаагүй салбарууд
const NAME_OVERRIDES: Record<string, District> = {
  "Офицер салбар": "Баянзүрх",
};

export function districtOf(branch: Pick<Branch, "name" | "address">): District {
  if (NAME_OVERRIDES[branch.name]) return NAME_OVERRIDES[branch.name];
  for (const [re, district] of PATTERNS) if (re.test(branch.address)) return district;
  return "Бусад";
}
