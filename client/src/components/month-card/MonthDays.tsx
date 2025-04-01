import { cn, getDaysInMonth, getToday, isCurrentMonth } from "~/utils/helpers";

interface MonthCardDaysProps {
  year: number;
  month: number;
}

const MAX_DAYS = 31;

export function MonthDays({ year, month }: MonthCardDaysProps) {
  const { currentDay } = getToday();

  const daysInMonth = getDaysInMonth(month, year);
  const isCurrentMonthAndYear = isCurrentMonth(year, month);

  return (
    <div className="mb-6 flex w-full items-center gap-6">
      <div className="w-32" />

      <ul className="flex gap-0.5">
        {new Array(daysInMonth).fill(0).map((_, i) => (
          <DayItem
            isToday={isCurrentMonthAndYear && currentDay === i + 1}
            key={i}
          >
            {i + 1}
          </DayItem>
        ))}

        {new Array(MAX_DAYS - daysInMonth).fill(0).map((_, i) => (
          <DayItem key={i} />
        ))}
      </ul>

      <div className="size-6" />
    </div>
  );
}

// Day item
interface DayItemProps {
  children?: number;
  isToday?: boolean;
  className?: string;
}

function DayItem({ children, isToday, className }: DayItemProps) {
  return (
    <li
      className={cn(
        "size-entry flex shrink-0 cursor-default items-center justify-center rounded-xs bg-transparent text-sm text-stone-400/75",
        isToday && "rounded-full bg-stone-50 font-medium text-stone-800",
        className || "",
      )}
    >
      {children || ""}
    </li>
  );
}
