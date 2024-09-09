import { TaskList } from "./TaskList";
import { MonthDaysRow } from "./MonthDaysRow";
import { getMonthFromIndex } from "~/utils";

import { ITask } from "~/~/models/Task";

interface MonthCardProps {
  tasks: ITask[] | undefined;
  year: number;
  month: number;
  daysInMonth: number;
}

export function MonthCard({ tasks, year, month, daysInMonth }: MonthCardProps) {
  return (
    <div className="rounded-xl bg-stone-100/75 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold capitalize">
          {`${getMonthFromIndex(month - 1)} ${year}`}
        </h2>
      </div>

      <div className="flex w-full justify-center">
        {tasks?.length === 0 && (
          <div className="flex w-full justify-center rounded-md border p-4">
            You haven't created any tasks yet.
          </div>
        )}

        {tasks && tasks?.length > 0 && (
          <div className="space-y-1">
            <MonthDaysRow year={year} month={month} daysInMonth={daysInMonth} />
            <TaskList tasks={tasks} year={year} month={month} />
          </div>
        )}
      </div>
    </div>
  );
}
