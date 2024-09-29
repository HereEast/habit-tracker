import { FormEvent, useState } from "react";
import { createTask } from "~/api/tasks";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useAppContext } from "~/hooks";

export function CreateTaskForm() {
  const { userId } = useAppContext();

  const [taskTitle, setTaskTitle] = useState("");

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskTitle.length) {
      return;
    }

    setTaskTitle("");
    await createTask(userId, taskTitle);
  }

  return (
    <form onSubmit={handleCreateTask}>
      <div className="flex gap-2">
        <Input
          name="new-task"
          value={taskTitle}
          placeholder="New task..."
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <Button>Create</Button>
      </div>
    </form>
  );
}
