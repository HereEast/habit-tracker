import { TaskList } from "../TaskList";

import { cn, getDaysInMonth, getMonthFromIndex } from "~/utils";
import { useTasks } from "~/hooks";
import { useAppContext } from "~/hooks/useContext";
import { MonthDaysRow } from "../MonthDaysRow";
import { CreateTaskForm } from "../CreateTaskForm";
import { MonthCardHeader } from "../MonthCardHeader";

export function Dashboard() {
  const { userId } = useAppContext();

  const { data: tasks, isLoading, error } = useTasks(userId);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const daysInMonth = getDaysInMonth(month, year);

  return (
    <>
      <div className="rounded-xl bg-stone-100/75 p-6">
        <MonthCardHeader
          title={`${getMonthFromIndex(month - 1)} ${year}`}
          classes="mb-6"
        />

        <div className="mb-6">
          {tasks?.length === 0 && <Notion />}
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

//

function Notion() {
  return (
    <div className="flex w-full justify-center rounded-md border p-4">
      You haven't created any tasks yet.
    </div>
  );
}
