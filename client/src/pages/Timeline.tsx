import { useParams } from "react-router-dom";
import { MonthCardHeader } from "~/components/month-card/MonthCardHeader";

import { RatingButtons } from "~/components/RatingButtons";

import { useUser } from "~/hooks/useUser";
import { getToday } from "~/utils/handlers";

// Remove timeline from user object > Move to separate table
// Request year data from the db by the current Year and UserId

export function Timeline() {
  const { slug } = useParams();

  const { data, isError } = useUser(slug || "");

  const { year } = getToday();

  const yearData = data?.timeline.find((data) => data.year === year);

  console.log(yearData);

  return (
    <div className="flex flex-col items-center gap-6">
      <RatingButtons />

      <div>
        {yearData?.months?.map((data) => (
          <div className="w-fit min-w-[680px] space-y-6 rounded-xl bg-stone-100/75 p-6">
            <MonthCardHeader year={year} month={data.month} />
          </div>
        ))}
      </div>
    </div>
  );
}
