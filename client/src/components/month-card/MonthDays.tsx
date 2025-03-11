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
          <DayItem
            isToday={isCurrentMonthAndYear && currentDay === i + 1}
            key={i}
          />
        ))}
      </ul>

      <div className="size-6" />
    </div>
  );
}

// Day item
interface DayItemProps {
  children?: number;
  isToday: boolean;
}

function DayItem({ children, isToday }: DayItemProps) {
  return (
    <li
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-sm border bg-transparent text-xs text-stone-400",
        isToday && "rounded-full bg-stone-50 font-medium text-stone-800",
      )}
    >
      {children || ""}
    </li>
  );
}
