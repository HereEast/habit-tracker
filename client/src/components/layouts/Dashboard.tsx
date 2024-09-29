import { useAppContext } from "~/hooks";
import { MonthCard } from "../MonthCard";
import { Rating } from "../Rating";
import { useUserYear } from "~/hooks/useUserYear";

export function Dashboard() {
  const { userId, today } = useAppContext();

  const { data: yearData } = useUserYear(userId, today.todayYear);

  {
    /* {error && <Notice isError text="Something went wrong." />} */
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Rating />

      {yearData?.months.map((month) => (
        <MonthCard key={month.month} year={yearData.year} monthData={month} />
      ))}
    </div>
  );
}
