import { FormEvent, useState } from "react";
import { createTask } from "~/api/createTask";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

import { UseTasks } from "~/hooks";

const ID = "66d0db0c810e60d1f8a7c9d8";

export function HomeLayout() {
  const { data, isLoading, error } = UseTasks(ID);

  const [taskTitle, setTaskTitle] = useState("");

  function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createTask(ID, taskTitle);
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
        {data.length === 0 && (
          <div className="flex w-full justify-center rounded-md border p-4">
            You haven't created any tasks yet.
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
