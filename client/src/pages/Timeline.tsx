import { useParams } from "react-router-dom";

import { CreateTaskForm } from "~/components/CreateTaskForm";
import { MonthCardHeader } from "~/components/month-card/MonthCardHeader";
import { MonthDays } from "~/components/month-card/MonthDays";
import { TaskEntries } from "~/components/month-card/TaskEntries";
import { Notice } from "~/components/Notice";
import { RatingButtons } from "~/components/RatingButtons";

import { useUser, useUserTasks, useYearData } from "~/hooks/queries";
import { getToday, isCurrentMonth } from "~/utils/handlers";

// Remove timeline from user object > Move to separate table
// Request year data from the db by the current Year and UserId

export function Timeline() {
  const { slug } = useParams();

  const { currentMonth, currentYear } = getToday();

  const { data: user, isError } = useUser(slug!);
  const { data: tasks } = useUserTasks(String(user?._id || ""));

  // Year data
  const { data: timeline } = useYearData(String(user?._id || ""), currentYear);

  console.log("TIMELINE", timeline);

  // const yearData = data?.timeline.find((data) => data.year === currentYear);

  return (
    <div className="flex flex-col items-center gap-6">
      <RatingButtons />

      <div>
        <div className="w-fit min-w-[680px] space-y-6 rounded-xl bg-stone-100/75 p-6">
          <MonthCardHeader year={currentYear} month={currentMonth} />
          <MonthDays year={currentYear} month={currentMonth} />

          <div>
            {tasks?.length === 0 && (
              <Notice text="You haven't created any tasks yet." />
            )}
          </div>

          {tasks?.length &&
            tasks.map((task) => (
              <div
                className="flex w-full items-center gap-6"
                key={String(task._id)}
              >
                <div className="w-32">
                  <h3>{task.title}</h3>
                </div>

                <TaskEntries
                  userId={String(user?._id || "")}
                  taskId={String(task._id)}
                  year={currentYear}
                  month={currentMonth}
                />
              </div>
            ))}

          {/* Form */}
          {/* {isCurrentMonth(currentYear, data.month) && <div>Form</div>} */}

          <CreateTaskForm />
        </div>
      </div>
    </div>
  );
}
