import { Notice } from "../Notice";
import { MonthCardHeader } from "./MonthCardHeader";
import { MonthDays } from "./MonthDays";
import { TaskEntries } from "./TaskEntries";
import { CreateTaskForm } from "../CreateTaskForm";

import { isCurrentMonth } from "~/utils/handlers";
import { MonthTimelineData } from "~/server/utils/types";

interface MonthCardProps {
  year: number;
  monthData: MonthTimelineData;
}

export function MonthCard({ year, monthData }: MonthCardProps) {
  const { month, tasks: monthTasks } = monthData;

  return (
    <div className="w-fit min-w-[680px] rounded-xl bg-stone-100/75 p-6">
      <MonthCardHeader year={year} month={month} />
      <MonthDays year={year} month={month} />

      <div>
        {monthTasks?.length === 0 && (
          <Notice text="You haven't created any tasks yet." />
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

                <TaskEntries
                  entries={entries || []}
                  year={year}
                  month={month}
                />
              </li>
            );
          })}
        </ul>
      )}

      {/* Form */}
      {isCurrentMonth(year, month) && <CreateTaskForm />}
    </div>
  );
}
