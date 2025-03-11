import { Notice } from "../Notice";
import { MonthCardHeader } from "./MonthCardHeader";
import { MonthDays } from "./MonthDays";
import { TaskEntries } from "./TaskEntries";
import { CreateTaskForm } from "./CreateTaskForm";

// import { MonthTimelineData } from "~/server/utils/types";
import { calculateDonePercentage, isCurrentMonth } from "~/utils/helpers";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { MonthTimelineData } from "~/utils/types/data";

interface MonthCardProps {
  year: number;
  monthData: MonthTimelineData;
}

export function MonthCard({ year, monthData }: MonthCardProps) {
  const { month, tasks: monthTasks } = monthData;

  const statusValues = monthTasks
    .map((task) => task.entries.map((entry) => entry.status))
    .flat();

  const percent = calculateDonePercentage(statusValues);

  return (
    <div className="w-fit min-w-[680px] rounded-xl bg-stone-100/75 p-6">
      <MonthCardHeader
        year={year}
        month={month}
        tasksCount={monthTasks.length}
        donePercentage={percent}
      />
      <MonthDays year={year} month={month} />

      <div>
        {monthTasks?.length === 0 && (
          <Notice>You haven't created any tasks yet.</Notice>
        )}
      </div>

      {monthTasks && (
        <ul className="mb-6 space-y-0.5">
          {monthTasks.map(({ task, entries }, index) => {
            return (
              <li className="flex w-full items-center gap-6" key={index}>
                <div className="w-32">
                  <h3>{task.title}</h3>
                </div>

                <div className="flex gap-6">
                  <TaskEntries
                    entries={entries || []}
                    year={year}
                    month={month}
                  />

                  {isCurrentMonth(year, month) && (
                    <DeleteTaskButton
                      taskId={task._id}
                      createdAt={task.createdAt}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {isCurrentMonth(year, month) && <CreateTaskForm />}
    </div>
  );
}
