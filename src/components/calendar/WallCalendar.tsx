import { useState, useCallback } from "react";
import HeroImage from "./HeroImage";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import SpiralBinding from "./SpiralBinding";

const WallCalendar = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const goTo = useCallback((m: number, y: number, dir: "left" | "right") => {
    setDirection(dir);
    if (m < 0) { setMonth(11); setYear(y - 1); }
    else if (m > 11) { setMonth(0); setYear(y + 1); }
    else { setMonth(m); setYear(y); }
  }, []);

  const handlePrev = () => goTo(month - 1, year, "right");
  const handleNext = () => goTo(month + 1, year, "left");
  const handleToday = () => {
    const t = new Date();
    setDirection(t.getMonth() < month ? "right" : "left");
    setMonth(t.getMonth());
    setYear(t.getFullYear());
  };

  const handleDateClick = useCallback(
    (day: number) => {
      const clicked = new Date(year, month, day);
      if (!rangeStart || rangeEnd) {
        setRangeStart(clicked);
        setRangeEnd(null);
      } else {
        if (clicked < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(clicked);
        } else {
          setRangeEnd(clicked);
        }
      }
    },
    [year, month, rangeStart, rangeEnd]
  );

  const clearSelection = () => {
    setRangeStart(null);
    setRangeEnd(null);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl">
        <CalendarHeader
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />

        <div className="relative mt-2">
          <SpiralBinding />

          <div className="calendar-paper rounded-b-lg overflow-hidden">
            <HeroImage month={month} year={year} />

            <div className="flex">
              <div className="hidden sm:flex w-[30%] border-r border-border p-4">
                <NotesPanel
                  month={month}
                  year={year}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                />
              </div>

              <div className="flex-1 p-4 md:p-5">
                <CalendarGrid
                  month={month}
                  year={year}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  onDateClick={handleDateClick}
                  direction={direction}
                />
              </div>
            </div>

            <div className="sm:hidden border-t border-border p-4">
              <NotesPanel
                month={month}
                year={year}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
              />
            </div>
          </div>
        </div>

        {rangeStart && (
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground bg-card rounded-lg px-4 py-2 animate-fade-in shadow-sm">
            <p>
              {rangeEnd
                ? `${rangeStart.toLocaleDateString()} → ${rangeEnd.toLocaleDateString()}`
                : `Start: ${rangeStart.toLocaleDateString()} — click another date`}
            </p>
            <button
              onClick={clearSelection}
              className="text-primary hover:underline font-medium"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WallCalendar;
