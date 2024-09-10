import { useAppContext, useAllDailyEntries } from "~/hooks";
import { calculateStatusPercentage, cn, getDateDetails } from "~/utils";

interface MonthCardHeaderProps {
  title: string;
  classes?: string;
}

export function MonthCardHeader({ title, classes }: MonthCardHeaderProps) {
  const { userId } = useAppContext();

  const today = new Date();
  const { year, month, day } = getDateDetails(today);

  const { data, isLoading, error } = useAllDailyEntries(
    userId,
    year,
    month,
    day,
  );

  const statuses = data?.map((entry) => entry.status);

  const percentage = calculateStatusPercentage(statuses);

  return (
    <div className={cn("flex w-full justify-between items-center", classes)}>
      <h2 className="text-xl font-semibold capitalize">{title}</h2>

      <div className="space-x-1 text-sm">
        <span>{`${data?.length} tasks`}</span>
        <span>•</span>
        <span>{`${percentage}% today 🔥`}</span>
      </div>
    </div>
  );
}
