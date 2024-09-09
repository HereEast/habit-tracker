import { cn } from "~/utils";
import { TaskLayout } from "./TaskList";

export function MonthTasks() {
  return;
}

// Month days row

interface MonthDaysRowProps {
  year: number;
  month: number;
  daysInMonth: number;
}

export function MonthDaysRow({ year, month, daysInMonth }: MonthDaysRowProps) {
  const today = new Date();

  const currentDate = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const isCurrentYearAndMonth = year === currentYear && month === currentMonth;

  return (
    <TaskLayout>
      <>
        {new Array(daysInMonth).fill(0).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-sm bg-transparent text-sm",
              isCurrentYearAndMonth && currentDate === i + 1 && "text-red-500",
            )}
          >
            {i + 1}
          </div>
        ))}
      </>
    </TaskLayout>
  );
}
