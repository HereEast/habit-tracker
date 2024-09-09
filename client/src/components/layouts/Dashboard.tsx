import { TaskList } from "../TaskList";

import { cn, getDaysInMonth, getMonthFromIndex } from "~/utils";
import { useTasks } from "~/hooks";
import { useAppContext } from "~/hooks/useContext";
import { MonthDaysRow } from "../MonthDaysRow";
import { CreateTaskForm } from "../CreateTaskForm";

export function Dashboard() {
  const { userId } = useAppContext();
  
  const { data: tasks, isLoading, error } = useTasks(userId);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const daysInMonth = getDaysInMonth(month, year);

  return (
    <>
      <div className="rounded-xl bg-stone-100/75 p-6">
        <MonthHeader
          title={`${getMonthFromIndex(month - 1)} ${year}`}
          classes="mb-6"
        />

        {tasks?.length === 0 && <Notion />}

        <div className="flex w-full justify-center">
          {tasks && tasks?.length > 0 && (
            <div className="space-y-2">
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

interface MonthHeaderProps {
  title: string;
  classes?: string;
}

function MonthHeader({ title, classes }: MonthHeaderProps) {
  return (
    <div className={cn(classes)}>
      <h2 className="text-xl font-semibold capitalize">{title}</h2>
    </div>
  );
}

function Notion() {
  return (
    <div className="flex w-full justify-center rounded-md border p-4">
      You haven't created any tasks yet.
    </div>
  );
}
