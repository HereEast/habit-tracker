import { useAppContext, useUser } from "~/hooks";
import { MonthCard } from "../MonthCard";
import { Rating } from "../Rating";

export function Dashboard() {
  // const { userId } = useAppContext();

  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  // const { data } = useUser(userId);

  // console.log(data);

  return (
    <div className="flex flex-col items-center gap-6">
      <Rating />
      <MonthCard year={year} month={month} />
    </div>
  );
}
