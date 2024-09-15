import { useAppContext, useMonthEntries } from "~/hooks";
import { calculateStatusPercentage, cn, getDateDetails } from "~/utils";

interface MonthCardHeaderProps {
  title: string;
  classes?: string;
}

export function MonthCardHeader({ title, classes }: MonthCardHeaderProps) {
  const { userId } = useAppContext();

  // Any other date here
  const today = new Date();

  const { year, month } = getDateDetails(today);

  const { data: monthEntries, isLoading: isEntriesLoading } = useMonthEntries({
    userId,
    year,
    month,
  });

  const tasks = new Set(monthEntries?.map((entry) => entry.taskId));

  const monthStatuses = monthEntries?.map((entry) => entry.status);
  const monthPercentage = calculateStatusPercentage(monthStatuses);

  return (
    <div className={cn("flex w-full items-center justify-between", classes)}>
      <h2 className="text-xl font-semibold capitalize">{title}</h2>

      <div className="space-x-1 text-sm">
        <span>{`${tasks.size} tasks`}</span>
        <span>•</span>
        <span>{`${monthPercentage}% month 🔥`}</span>
      </div>
    </div>
  );
}
