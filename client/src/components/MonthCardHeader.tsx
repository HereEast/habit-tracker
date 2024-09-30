import { useEffect, useState } from "react";

import { useAppContext, useEntries } from "~/hooks";
import { calculateStatusPercentage, cn, getMonthFromIndex } from "~/utils";
import { IEntry } from "~/~/models/Entry";

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
  // const { userId } = useAppContext();

  // const { data: monthEntries, isLoading: isEntriesLoading } = useEntries({
  //   userId,
  //   year,
  //   month,
  // });

  // const monthStatuses = monthEntries?.map((entry) => entry.status);
  // const monthPercentage = calculateStatusPercentage(monthStatuses);

  // const [monthEntries, setMonthEntries] = useState<IEntry[] | undefined>(
  //   undefined,
  // );
  // const [monthPercentage, setMonthPercentage] = useState(0);

  // useEffect(() => {
  //   setMonthEntries(data);

  //   const monthStatuses = monthEntries?.map((entry) => entry.status);
  //   const percentage = calculateStatusPercentage(monthStatuses);

  //   setMonthPercentage(percentage);
  // }, [data, tasksCount, monthEntries]);

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
