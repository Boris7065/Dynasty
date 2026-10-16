/* ------------------------------------------------------------------ */
/*  In-site booking: slots, storage, calendar + SMS delivery           */
/* ------------------------------------------------------------------ */

export type BarberId = "no-preference" | "herbert" | "oskr";

export interface Booking {
  ref: string;
  serviceId: string;
  serviceName: string;
  price: string;
  barber: BarberId;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (24h)
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  createdAt: number;
}

export const BARBERS: { id: BarberId; label: string }[] = [
  { id: "no-preference", label: "First available" },
  { id: "herbert", label: "Herbert" },
  { id: "oskr", label: "Oskr · Master Barber" },
];

export const barberLabel = (id: BarberId) =>
  BARBERS.find((b) => b.id === id)?.label ?? "First available";

/* Suggested appointment times, 10:00 – 17:30 */
export const SLOTS: string[] = (() => {
  const out: string[] = [];
  for (let h = 10; h <= 17; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
})();

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export interface DayOption {
  iso: string;
  dow: string;
  num: number;
  mon: string;
}

export function nextDays(n: number): DayOption[] {
  const out: DayOption[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    const cur = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    const iso = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(
      cur.getDate()
    ).padStart(2, "0")}`;
    out.push({
      iso,
      dow: DOW[cur.getDay()],
      num: cur.getDate(),
      mon: MON[cur.getMonth()],
    });
  }
  return out;
}

export function fmtDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${DOW[dt.getDay()]}, ${MON[m - 1]} ${d}`;
}

export function fmtTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${period}`;
}

const REF_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function makeRef(): string {
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)];
  }
  return `DYN-${s}`;
}

/* ------------------------- device storage --------------------------- */

const STORAGE_KEY = "dynasty.barbers.bookings.v1";

export function listBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(b: Booking): void {
  const all = listBookings();
  all.push(b);
  all.sort((a, z) => z.createdAt - a.createdAt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function removeBooking(ref: string): void {
  try {
    const all = listBookings().filter((b) => b.ref !== ref);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable */
  }
}

/* ------------------------- calendar export -------------------------- */

const icsEsc = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");

function icsDT(iso: string, time: string): string {
  return `${iso.replace(/-/g, "")}T${time.replace(":", "")}00`;
}

function icsEnd(iso: string, time: string): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + 60; // one-hour appointment block
  const hh = String(Math.floor(total / 60)).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");
  return `${iso.replace(/-/g, "")}T${hh}${mm}00`;
}

export function buildICS(b: Booking): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dynasty Barbers//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${b.ref}@dynasty-barbers-davie-fl`,
    `DTSTAMP:${icsDT(b.date, b.time)}`,
    `DTSTART:${icsDT(b.date, b.time)}`,
    `DTEND:${icsEnd(b.date, b.time)}`,
    `SUMMARY:${icsEsc(`${b.serviceName} — Dynasty Barbers (Davie, FL)`)}`,
    `DESCRIPTION:${icsEsc(
      `Booking ref ${b.ref} · Barber: ${barberLabel(b.barber)} · ${b.price} (starting rate) · 4288 S University Dr, Davie, FL 33328 · 954-609-9029 · The shop confirms your slot by call or text.`
    )}`,
    `LOCATION:${icsEsc("Dynasty Barbers, 4288 S University Dr, Davie, FL 33328")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadICS(b: Booking): void {
  const blob = new Blob([buildICS(b)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dynasty-barbers-${b.ref}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function googleCalUrl(b: Booking): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${b.serviceName} — Dynasty Barbers (Davie, FL)`,
    dates: `${icsDT(b.date, b.time)}/${icsEnd(b.date, b.time)}`,
    details: `Booking ref ${b.ref} · Barber: ${barberLabel(b.barber)} · ${b.price} (starting rate). The shop confirms your slot by call or text.`,
    location: "4288 S University Dr, Davie, FL 33328",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* ------------------------- shop delivery ---------------------------- */

export function smsHref(b: Booking): string {
  const body = `Booking request ${b.ref}: ${b.serviceName}, ${fmtDay(
    b.date
  )} at ${fmtTime(b.time)}, barber: ${barberLabel(b.barber)}. — ${b.name}, ${b.phone}`;
  return `sms:+19546099029?body=${encodeURIComponent(body)}`;
}

export function bookingSummary(b: Booking): string {
  return `${b.serviceName} · ${fmtDay(b.date)} · ${fmtTime(b.time)}`;
}
