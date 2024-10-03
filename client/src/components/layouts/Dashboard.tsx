import { MonthCard } from "../MonthCard";
import { Rating } from "../Rating";

import { useAppContext } from "~/hooks";
import { useUserYear } from "~/hooks/useUserYear";

export function Dashboard() {
  const { today } = useAppContext();

  const { data } = useUserYear(today.year);

  console.log(data);

  return (
    <div className="flex flex-col items-center gap-6">
      <Rating />

      {data?.months.map((month) => (
        <MonthCard key={month.month} year={data.year} data={month} />
      ))}
    </div>
  );
}
