import { FormEvent, useState } from "react";

import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

import { useAppContext } from "~/hooks";
import { createTask } from "~/api/tasks";
import { ITask } from "~/~/models/Task";

interface CreateTaskForm {
  handleOnCreate: (task: ITask) => void;
}

export function CreateTaskForm({ handleOnCreate }: CreateTaskForm) {
  const { userId } = useAppContext();

  const [taskTitle, setTaskTitle] = useState("");

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskTitle.trim()) return;

    const newTask = await createTask(userId, taskTitle);

    if (newTask) {
      handleOnCreate(newTask);
      setTaskTitle("");
    }
  }

  return (
    <form onSubmit={(e) => handleCreateTask(e)}>
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
