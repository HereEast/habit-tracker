import { cn, getMonthFromIndex } from "~/utils/handlers";

interface MonthCardHeaderProps {
  year: number;
  month: number;
  // monthPercentage: number;
  tasksCount: number;
  classNames?: string;
}

export function MonthCardHeader({
  year,
  month,
  // monthPercentage,
  tasksCount,
  classNames,
}: MonthCardHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 flex w-full items-center justify-between",
        classNames,
      )}
    >
      <h2 className="text-xl font-semibold capitalize">{`${getMonthFromIndex(month)} ${year}`}</h2>

      <div className="space-x-1 text-sm">
        <span>{`${tasksCount} tasks`}</span>
        <span>•</span>
        <span>{`Num % month 🔥`}</span>

        {/* <span>{`${tasksCount} tasks`}</span>
        <span>•</span>
        <span>{`${monthPercentage}% month 🔥`}</span> */}
      </div>
    </div>
  );
}
