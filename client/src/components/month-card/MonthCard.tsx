import { Notice } from "../Notice";
import { MonthCardHeader } from "./MonthCardHeader";
import { MonthDays } from "./MonthDays";
import { CreateTaskForm } from "./CreateTaskForm";
import { TasksList } from "./TasksList";

import { calculateDonePercentage, isCurrentMonth } from "~/utils/helpers";
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

      {monthTasks && <TasksList monthData={monthData} year={year} />}

      {isCurrentMonth(year, month) && <CreateTaskForm />}
    </div>
  );
}
