import { MonthCard } from "../MonthCard";
import { Rating } from "../Rating";

export function Dashboard() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  return (
    <div className="flex flex-col items-center gap-6">
      <Rating />
      <MonthCard year={year} month={month} />
    </div>
  );
}
