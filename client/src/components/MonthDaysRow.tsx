import { useAppContext } from "~/hooks";
import { cn, getDaysInMonth } from "~/utils";

interface MonthDaysRowProps {
  year: number;
  month: number;
}

export function MonthDaysRow({ year, month }: MonthDaysRowProps) {
  const { today } = useAppContext();
  
  const { todayDay, todayMonth, todayYear } = today;

  const daysInMonth = getDaysInMonth(month, year);
  const isCurrentYearAndMonth = year === todayYear && month === todayMonth;

  return (
    <div className="flex w-full items-center gap-6">
      <div className="w-32" />

      <div className="flex gap-0.5">
        {new Array(daysInMonth).fill(0).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-sm bg-transparent text-xs text-stone-400",
              isCurrentYearAndMonth &&
                todayDay === i + 1 &&
                "rounded-full bg-stone-50 font-medium text-stone-800",
            )}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
