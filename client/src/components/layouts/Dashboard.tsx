import { FormEvent, useEffect, useState } from "react";
import { createTask } from "~/api/createTask";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { TaskItem } from "./TaskItem";

import { useUser } from "~/hooks/useUser";
import { getMonthFromIndex } from "~/utils";

const ID = "66d0db0c810e60d1f8a7c9d8";

export function Dashboard() {
  const { data, isLoading, error } = useUser(ID);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    const month = getMonthFromIndex(monthIndex);
  }, []);

  console.log(data);

  const [taskTitle, setTaskTitle] = useState("");

  function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskTitle.length) {
      return;
    }

    createTask(ID, taskTitle);
    setTaskTitle("");
  }

  if (isLoading) {
    return <div className="w-full rounded-md border p-3">Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full rounded-md border p-3">Something went wrong.</div>
    );
  }

  return (
    <>
      <div className="mb-10 w-full">
        {data?.tasks.length === 0 && (
          <div className="flex w-full justify-center rounded-md border p-4">
            You haven't created any tasks yet.
          </div>
        )}

        {data && data?.tasks.length > 0 && (
          <div className="flex flex-col gap-1">
            {data.tasks.map((task) => (
              <TaskItem task={task} key={String(task._id)} />
            ))}
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
