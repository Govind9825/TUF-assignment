import { useState, useMemo } from "react";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isToday,
  getHoliday,
  isInRange,
  isRangeStart,
  isRangeEnd,
} from "@/lib/calendarUtils";
import DateCell from "./DateCell";

const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarGridProps {
  month: number;
  year: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onDateClick: (day: number) => void;
  direction: "left" | "right";
}

const CalendarGrid = ({ month, year, rangeStart, rangeEnd, onDateClick, direction }: CalendarGridProps) => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const { daysInMonth, firstDay } = useMemo(
    () => ({
      daysInMonth: getDaysInMonth(year, month),
      firstDay: (getFirstDayOfMonth(year, month) + 6) % 7,
    }),
    [year, month]
  );

  const emptyCells = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const previewEnd = hoveredDay && rangeStart && !rangeEnd
    ? new Date(year, month, hoveredDay)
    : null;
  const effectiveEnd = rangeEnd || previewEnd;

  let displayStart = rangeStart;
  let displayEnd = effectiveEnd;
  if (displayStart && displayEnd && displayStart > displayEnd) {
    [displayStart, displayEnd] = [displayEnd, displayStart];
  }

  const animClass = direction === "left" ? "animate-slide-left" : "animate-slide-right";

  const isWeekendDay = (day: number): boolean => {
    const dayOfWeek = new Date(year, month, day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <div key={`${month}-${year}`} className={animClass}>
      <div className="grid grid-cols-7 border-b border-border">
        {DAY_HEADERS.map((name, i) => (
          <div
            key={name}
            className={`text-center text-[11px] font-heading font-bold tracking-wider py-2 ${i >= 5 ? "text-calendar-weekend" : "text-muted-foreground"
              }`}
          >
            {name}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 mt-1">
        {emptyCells.map((i) => (
          <div key={`empty-${i}`} className="py-2.5" />
        ))}
        {days.map((day) => (
          <DateCell
            key={day}
            day={day}
            isToday={isToday(year, month, day)}
            isRangeStart={isRangeStart(day, month, year, displayStart)}
            isRangeEnd={isRangeEnd(day, month, year, displayEnd)}
            isInRange={isInRange(day, month, year, displayStart, displayEnd)}
            isWeekend={isWeekendDay(day)}
            holiday={getHoliday(month, day)}
            onClick={() => onDateClick(day)}
            onMouseEnter={() => setHoveredDay(day)}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
