import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarHeader = ({ onPrev, onNext, onToday }: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <button
        onClick={onPrev}
        className="p-1.5 rounded-full hover:bg-muted calendar-transition"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
      </button>
      <button
        onClick={onToday}
        className="px-4 py-1 text-xs font-heading font-semibold tracking-wide uppercase rounded-full bg-primary text-primary-foreground hover:opacity-90 calendar-transition"
      >
        Today
      </button>
      <button
        onClick={onNext}
        className="p-1.5 rounded-full hover:bg-muted calendar-transition"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
};

export default CalendarHeader;
