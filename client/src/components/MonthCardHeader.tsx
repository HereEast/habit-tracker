import { cn, getMonthFromIndex } from "~/utils/handlers";

interface MonthCardHeaderProps {
  year: number;
  month: number;
  monthPercentage: number;
  tasksCount: number;
  classes?: string;
}

export function MonthCardHeader({
  year,
  month,
  monthPercentage,
  tasksCount,
  classes,
}: MonthCardHeaderProps) {
  return (
    <div className={cn("flex w-full items-center justify-between", classes)}>
      <h2 className="text-xl font-semibold capitalize">{`${getMonthFromIndex(month - 1)} ${year}`}</h2>

      <div className="space-x-1 text-sm">
        <span>{`${tasksCount} tasks`}</span>
        <span>•</span>
        <span>{`${monthPercentage}% month 🔥`}</span>
      </div>
    </div>
  );
}
