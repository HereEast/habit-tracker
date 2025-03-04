import { useParams } from "react-router-dom";

import { MonthCardHeader } from "~/components/month-card/MonthCardHeader";
import { Notice } from "~/components/Notice";
import { RatingButtons } from "~/components/RatingButtons";

import { useUser } from "~/hooks/useUser";
import { getToday, isCurrentMonth } from "~/utils/handlers";

// Remove timeline from user object > Move to separate table
// Request year data from the db by the current Year and UserId

export function Timeline() {
  const { slug } = useParams();

  const { data, isError } = useUser(slug!);
  const monthTasks = [];

  const { year } = getToday();

  const yearData = data?.timeline.find((data) => data.year === year);
  console.log(yearData);

  return (
    <div className="flex flex-col items-center gap-6">
      <RatingButtons />

      <div>
        {yearData?.months?.map((data) => (
          <div
            className="w-fit min-w-[680px] space-y-6 rounded-xl bg-stone-100/75 p-6"
            key={data.month}
          >
            <MonthCardHeader year={year} month={data.month} />

            <div>
              {monthTasks?.length === 0 && (
                <Notice text="You haven't created any tasks yet." />
              )}
            </div>

            {/* Form */}
            {isCurrentMonth(year, data.month) && <div>Form</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
