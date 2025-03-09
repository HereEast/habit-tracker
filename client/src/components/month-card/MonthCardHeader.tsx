import { cn, getFireIcon, getMonthFromIndex } from "~/utils/helpers";

interface MonthCardHeaderProps {
  year: number;
  month: number;
  donePercentage: number;
  tasksCount: number;
  classNames?: string;
}

export function MonthCardHeader({
  year,
  month,
  donePercentage,
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
        <span className="space-x-1">
          <span>{`${donePercentage}% month`}</span>
          <span className={cn(donePercentage === 0 && "grayscale")}>
            {getFireIcon(donePercentage)}
          </span>
        </span>
      </div>
    </div>
  );
}
