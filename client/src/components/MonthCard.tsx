import { TaskList } from "./TaskList";
import { MonthDaysRow } from "./MonthDaysRow";
import { getDaysInMonth, getMonthFromIndex } from "~/utils";

// import { ITask } from "~/~/models/Task";
import { MonthCardHeader } from "./MonthCardHeader";
import { Notice } from "./Notice";
import { CreateTaskForm } from "./CreateTaskForm";
import { useAppContext, useTasks } from "~/hooks";

interface MonthCardProps {
  year: number;
  month: number;
}

export function MonthCard({ year, month }: MonthCardProps) {
  const { userId } = useAppContext();

  const { data: tasks, isLoading, error } = useTasks(userId);

  const daysInMonth = getDaysInMonth(month, year);

  return (
    <div className="w-fit min-w-[680px] rounded-xl bg-stone-100/75 p-6">
      <MonthCardHeader
        title={`${getMonthFromIndex(month)} ${year}`}
        classes="mb-6"
      />

      <div className="mb-4">
        {error && <Notice isError text="Something went wrong." />}

        {tasks?.length === 0 && !error && (
          <Notice text="You haven't created any tasks yet." />
        )}

        {tasks && tasks?.length > 0 && (
          <div className="flex w-full flex-col justify-center gap-2">
            <MonthDaysRow year={year} month={month} daysInMonth={daysInMonth} />
            <TaskList tasks={tasks} year={year} month={month} />
          </div>
        )}
      </div>

      <CreateTaskForm />
    </div>
  );
}
