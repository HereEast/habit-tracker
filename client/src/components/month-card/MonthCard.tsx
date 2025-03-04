import { MonthCardHeader } from "./MonthCardHeader";

import { IMonthData } from "~/utils/types";

interface MonthCardProps {
  year: number;
  monthData: IMonthData;
}

export function MonthCard({ year, monthData }: MonthCardProps) {
  return (
    <div className="w-fit min-w-[680px] space-y-6 rounded-xl bg-stone-100/75 p-6">
      <MonthCardHeader year={year} month={monthData.month} />
    </div>
  );
}
