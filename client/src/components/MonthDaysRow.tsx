import { cn, getDaysInMonth } from "~/utils";

interface MonthDaysRowProps {
  year: number;
  month: number;
  daysInMonth: number;
}

export function MonthDaysRow({ year, month, daysInMonth }: MonthDaysRowProps) {
  const today = new Date();

  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const isCurrentYearAndMonth = year === currentYear && month === currentMonth;

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
                currentDate === i + 1 &&
                "rounded-full bg-stone-50 text-stone-800 font-medium",
            )}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
