import { FormEvent, useState } from "react";
import { createTask } from "~/api/createTask";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { TaskList } from "../TaskList";

import { getDaysInMonth } from "~/utils";
import { useTasks } from "~/hooks";
import { MonthDaysRow } from "../MonthTasks";

const userId = "66d0db0c810e60d1f8a7c9d8";

export function Dashboard() {
  const { data: tasks, isLoading, error } = useTasks(userId);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const daysInMonth = getDaysInMonth(month, year);

  const [taskTitle, setTaskTitle] = useState("");

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskTitle.length) {
      return;
    }

    await createTask(userId, taskTitle);
    setTaskTitle("");
  }

  return (
    <>
      <div className="mb-10 flex w-full justify-center">
        {tasks?.length === 0 && (
          <div className="flex w-full justify-center rounded-md border p-4">
            You haven't created any tasks yet.
          </div>
        )}

        {tasks && tasks?.length > 0 && (
          <div className="space-y-3">
            <MonthDaysRow year={year} month={month} daysInMonth={daysInMonth} />
            <TaskList userId={userId} tasks={tasks} year={year} month={month} />
          </div>
        )}
      </div>

      <form onSubmit={handleCreateTask}>
        <div className="flex gap-2">
          <Input
            name="new-task"
            placeholder="New task..."
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <Button name="Create" />
        </div>
      </form>
    </>
  );
}
