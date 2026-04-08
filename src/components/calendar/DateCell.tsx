import { cn } from "@/lib/utils";

interface DateCellProps {
  day: number;
  isToday: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isWeekend: boolean;
  holiday?: string;
  onClick: () => void;
  onMouseEnter: () => void;
}

const DateCell = ({
  day,
  isToday: today,
  isRangeStart: rangeStart,
  isRangeEnd: rangeEnd,
  isInRange: inRange,
  isWeekend,
  holiday,
  onClick,
  onMouseEnter,
}: DateCellProps) => {
  const isEndpoint = rangeStart || rangeEnd;

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "relative flex items-center justify-center py-2.5 text-sm font-medium calendar-transition select-none",
        "hover:bg-calendar-hover active:scale-95 rounded",
        isWeekend && !isEndpoint && !inRange && "text-calendar-weekend font-semibold",
        !isWeekend && !isEndpoint && !inRange && "text-foreground",
        today && !isEndpoint && "bg-calendar-today text-calendar-today-foreground rounded-full font-bold",
        inRange && !isEndpoint && "bg-calendar-range",
        isEndpoint && "bg-calendar-selected text-calendar-selected-foreground rounded-full font-bold",
      )}
      title={holiday}
    >
      {day}
      {holiday && (
        <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-calendar-holiday" />
      )}
    </button>
  );
};

export default DateCell;
