import { CreateTaskForm } from "./CreateTaskForm";
import { MonthDaysRow } from "./MonthDaysRow";
import { MonthCardHeader } from "./MonthCardHeader";
import { Notice } from "./Notice";
import { Task } from "./Task";

import { IMonthData } from "~/api/users";

interface MonthCardProps {
  year: number;
  monthData: IMonthData;
}

export function MonthCard({ year, monthData }: MonthCardProps) {
  const { month, tasks } = monthData;

  return (
    <div className="w-fit min-w-[680px] rounded-xl bg-stone-100/75 p-6">
      <MonthCardHeader year={year} month={month} classes="mb-6" />

      <div className="mb-4">
        {tasks?.length === 0 && (
          <Notice text="You haven't created any tasks yet." />
        )}

        {tasks && tasks?.length > 0 && (
          <div className="flex w-full flex-col justify-center gap-2">
            <MonthDaysRow year={year} month={month} />

            <div className="space-y-0.5">
              {tasks.map((task) => (
                <Task
                  task={task}
                  year={year}
                  month={month}
                  key={String(task._id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <CreateTaskForm />
    </div>
  );
}
