import { useAppContext, useEntries } from "~/hooks";
import { calculateStatusPercentage, cn, getMonthFromIndex } from "~/utils";

interface MonthCardHeaderProps {
  year: number;
  month: number;
  tasksCount: number;
  classes?: string;
}

export function MonthCardHeader({
  year,
  month,
  tasksCount,
  classes,
}: MonthCardHeaderProps) {
  const { userId } = useAppContext();

  const { data: monthEntries, isLoading: isEntriesLoading } = useEntries({
    userId,
    year,
    month,
  });

  // const tasks = new Set(monthEntries?.map((entry) => entry.taskId));

  const monthStatuses = monthEntries?.map((entry) => entry.status);
  const monthPercentage = calculateStatusPercentage(monthStatuses);

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
