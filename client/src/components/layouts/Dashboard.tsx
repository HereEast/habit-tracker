import { FormEvent, useState } from "react";
import { createTask } from "~/api/createTask";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { TaskList } from "../TaskList";

import { getDaysInMonth } from "~/utils";
import { useTasks } from "~/hooks";
import { useAppContext } from "~/hooks/useContext";
import { MonthCard } from "../MonthCard";

export function Dashboard() {
  const { userId } = useAppContext();
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
      <MonthCard
        tasks={tasks}
        year={year}
        month={month}
        daysInMonth={daysInMonth}
      />

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
