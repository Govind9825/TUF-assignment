import januaryImg from "@/assets/months/january.jpg";
import februaryImg from "@/assets/months/february.jpg";
import marchImg from "@/assets/months/march.jpg";
import aprilImg from "@/assets/months/april.jpg";
import mayImg from "@/assets/months/may.jpg";
import juneImg from "@/assets/months/june.jpg";
import julyImg from "@/assets/months/july.jpg";
import augustImg from "@/assets/months/august.jpg";
import septemberImg from "@/assets/months/september.jpg";
import octoberImg from "@/assets/months/october.jpg";
import novemberImg from "@/assets/months/november.jpg";
import decemberImg from "@/assets/months/december.jpg";

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTH_IMAGES: Record<number, string> = {
  0: januaryImg,
  1: februaryImg,
  2: marchImg,
  3: aprilImg,
  4: mayImg,
  5: juneImg,
  6: julyImg,
  7: augustImg,
  8: septemberImg,
  9: octoberImg,
  10: novemberImg,
  11: decemberImg,
};

export const HOLIDAYS: Record<string, string> = {
  "1-1": "New Year's Day",
  "2-14": "Valentine's Day",
  "7-4": "Independence Day",
  "10-31": "Halloween",
  "12-25": "Christmas",
  "12-31": "New Year's Eve",
};

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function isToday(year: number, month: number, day: number): boolean {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
}

export function getHoliday(month: number, day: number): string | undefined {
  return HOLIDAYS[`${month + 1}-${day}`];
}

export function isInRange(
  day: number, month: number, year: number,
  start: Date | null, end: Date | null
): boolean {
  if (!start || !end) return false;
  const date = new Date(year, month, day);
  return date >= start && date <= end;
}

export function isRangeStart(day: number, month: number, year: number, start: Date | null): boolean {
  if (!start) return false;
  return start.getFullYear() === year && start.getMonth() === month && start.getDate() === day;
}

export function isRangeEnd(day: number, month: number, year: number, end: Date | null): boolean {
  if (!end) return false;
  return end.getFullYear() === year && end.getMonth() === month && end.getDate() === day;
}

export interface CalendarNote {
  id: string;
  text: string;
  monthKey: string; // "YYYY-MM" or "YYYY-MM-DD_YYYY-MM-DD" for range
  createdAt: number;
}

export function getNotesKey(year: number, month: number, rangeStart?: Date | null, rangeEnd?: Date | null): string {
  if (rangeStart && rangeEnd) {
    const s = `${rangeStart.getFullYear()}-${rangeStart.getMonth()}-${rangeStart.getDate()}`;
    const e = `${rangeEnd.getFullYear()}-${rangeEnd.getMonth()}-${rangeEnd.getDate()}`;
    return `${s}_${e}`;
  }
  return `${year}-${month}`;
}

export function loadNotes(): CalendarNote[] {
  try {
    const raw = localStorage.getItem("wall-calendar-notes");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: CalendarNote[]) {
  localStorage.setItem("wall-calendar-notes", JSON.stringify(notes));
}
