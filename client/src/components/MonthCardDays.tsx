import { useAppContext } from "~/hooks";
import { cn, getDaysInMonth } from "~/utils/handlers";

interface MonthCardDaysProps {
  year: number;
  month: number;
}

export function MonthCardDays({ year, month }: MonthCardDaysProps) {
  const { today } = useAppContext();

  const daysInMonth = getDaysInMonth(month, year);
  const isCurrentYearAndMonth = year === today.year && month === today.month;

  return (
    <div className="flex w-full items-center gap-6">
      <div className="w-32" />

      <div className="flex gap-0.5">
        {new Array(daysInMonth).fill(0).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-sm border bg-transparent text-xs text-stone-400",
              isCurrentYearAndMonth &&
                today.day === i + 1 &&
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
