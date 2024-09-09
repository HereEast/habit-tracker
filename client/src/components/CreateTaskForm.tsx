import { FormEvent, useState } from "react";
import { createTask } from "~/api";
import { Input } from "./Input";
import { Button } from "./Button";
import { useAppContext } from "~/hooks";

export function CreateTaskForm() {
  const { userId } = useAppContext();
  
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
  );
}
