import { MonthCard } from "../MonthCard";
import { Rating } from "../Rating";

import { useAppContext } from "~/hooks";
import { useUserYear } from "~/hooks/useUserYear";

export function Dashboard() {
  const { today } = useAppContext();

  const { data: yearData } = useUserYear(today.year);

  return (
    <div className="flex flex-col items-center gap-6">
      <Rating />

      {yearData?.months.map((month) => (
        <MonthCard key={month.month} year={yearData.year} monthData={month} />
      ))}
    </div>
  );
}
