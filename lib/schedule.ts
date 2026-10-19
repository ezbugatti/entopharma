// Sanity дээрх "schedule" текстийг задлан тухайн агшинд нээлттэй эсэхийг тооцно.
// Жишээ формат:
//   "Даваа-Баасан 08:00-22:00, Бямба-Ням 09:00-22:00"
//   "Өдөр бүр 09:00 - 22:00 цаг хүртэл"
//   "Даваа-Ням 09:00-22:00"

const DAYS = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];
const DAY_PATTERN = DAYS.join("|");
const RULE_REGEX = new RegExp(
  `(Өдөр бүр|(${DAY_PATTERN})(?:\\s*-\\s*(${DAY_PATTERN}))?)\\s*(\\d{1,2}):(\\d{2})\\s*-\\s*(\\d{1,2}):(\\d{2})`,
  "g"
);

type Rule = { days: number[]; open: number; close: number };

function dayRange(from: number, to: number): number[] {
  const days: number[] = [];
  let d = from;
  for (let i = 0; i < 7; i++) {
    days.push(d);
    if (d === to) break;
    d = (d + 1) % 7;
  }
  return days;
}

export function parseSchedule(schedule: string): Rule[] {
  const rules: Rule[] = [];
  for (const m of schedule.matchAll(RULE_REGEX)) {
    const [, label, fromDay, toDay, oh, om, ch, cm] = m;
    let days: number[];
    if (label === "Өдөр бүр") {
      days = [0, 1, 2, 3, 4, 5, 6];
    } else {
      const from = DAYS.indexOf(fromDay);
      days = toDay ? dayRange(from, DAYS.indexOf(toDay)) : [from];
    }
    rules.push({ days, open: +oh * 60 + +om, close: +ch * 60 + +cm });
  }
  return rules;
}

// Улаанбаатарын цагаар гарагийн индекс (0 = Ням) ба өдрийн минут
export function ulaanbaatarNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ulaanbaatar",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: +get("hour") * 60 + +get("minute") };
}

const fmt = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

export type OpenStatus =
  | { known: false }
  | { known: true; open: true; closesAt: string }
  | { known: true; open: false; opensAt: string | null };

export function getOpenStatus(schedule: string, date = new Date()): OpenStatus {
  const rules = parseSchedule(schedule);
  if (!rules.length) return { known: false };

  const { day, minutes } = ulaanbaatarNow(date);
  const today = rules.find((r) => r.days.includes(day));

  if (today && minutes >= today.open && minutes < today.close) {
    return { known: true, open: true, closesAt: fmt(today.close) };
  }
  if (today && minutes < today.open) {
    return { known: true, open: false, opensAt: fmt(today.open) };
  }
  const tomorrow = rules.find((r) => r.days.includes((day + 1) % 7));
  return { known: true, open: false, opensAt: tomorrow ? fmt(tomorrow.open) : null };
}

// Хамгийн оройтож хаадаг цаг (статистикт харуулах зорилгоор)
export function latestClosing(schedules: string[]): string | null {
  const closes = schedules.flatMap((s) => parseSchedule(s).map((r) => r.close));
  return closes.length ? fmt(Math.max(...closes)) : null;
}
