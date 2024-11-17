import { MonthCard } from "../MonthCard";
import { Rating } from "../Rating";

import { useAppContext, useUserYear } from "~/hooks";

export function Timeline() {
  const { today } = useAppContext();

  const { data, isLoading } = useUserYear(today.year);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data?.year && (
        <div className="flex flex-col items-center gap-6">
          <Rating />

          {data?.months.map((month) => (
            <MonthCard key={month.month} year={data.year} monthData={month} />
          ))}
        </div>
      )}
    </>
  );
}
