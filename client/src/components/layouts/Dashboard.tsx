import { TaskList } from "../TaskList";
import { MonthDaysRow } from "../MonthDaysRow";
import { CreateTaskForm } from "../CreateTaskForm";
import { MonthCardHeader } from "../MonthCardHeader";

import { cn, getDaysInMonth, getMonthFromIndex } from "~/utils";
import { useTasks } from "~/hooks";
import { useAppContext } from "~/hooks/useContext";
import { Notice } from "../Notice";

export function Dashboard() {
  const { userId } = useAppContext();

  const { data: tasks, isLoading, error } = useTasks(userId);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const daysInMonth = getDaysInMonth(month, year);

  return (
    <>
      <div className="w-fit rounded-xl bg-stone-100/75 p-6">
        <MonthCardHeader
          title={`${getMonthFromIndex(month - 1)} ${year}`}
          classes="mb-6"
        />

        <div className="mb-4">
          {tasks?.length === 0 && (
            <Notice text="You haven't created any tasks yet." />
          )}

          {tasks && tasks?.length > 0 && (
            <div className="flex w-full flex-col justify-center gap-2">
              <MonthDaysRow
                year={year}
                month={month}
                daysInMonth={daysInMonth}
              />
              <TaskList tasks={tasks} year={year} month={month} />
            </div>
          )}
        </div>

        <CreateTaskForm />
      </div>
    </>
  );
}
