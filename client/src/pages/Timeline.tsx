import { useParams } from "react-router-dom";

import { MonthCardHeader } from "~/components/month-card/MonthCardHeader";
import { MonthDays } from "~/components/month-card/MonthDays";
import { Notice } from "~/components/Notice";
import { RatingButtons } from "~/components/RatingButtons";

import { useUser, useUserTasks } from "~/hooks/queries";
import { getToday, isCurrentMonth } from "~/utils/handlers";

// Remove timeline from user object > Move to separate table
// Request year data from the db by the current Year and UserId

export function Timeline() {
  const { slug } = useParams();

  const { data, isError } = useUser(slug!);
  const { data: tasks } = useUserTasks(String(data?._id || ""));

  console.log("TASKS", tasks);

  const monthTasks = [];

  const { currentYear } = getToday();

  const yearData = data?.timeline.find((data) => data.year === currentYear);

  return (
    <div className="flex flex-col items-center gap-6">
      <RatingButtons />

      <div>
        {yearData?.months?.map((data) => (
          <div
            className="w-fit min-w-[680px] space-y-6 rounded-xl bg-stone-100/75 p-6"
            key={data.month}
          >
            <MonthCardHeader year={currentYear} month={data.month} />
            <MonthDays year={currentYear} month={data.month} />

            <div>
              {monthTasks?.length === 0 && (
                <Notice text="You haven't created any tasks yet." />
              )}
            </div>

            {/* Form */}
            {isCurrentMonth(currentYear, data.month) && <div>Form</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
