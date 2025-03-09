import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { useCreateTask } from "~/hooks/mutations/useCreateTask";
import { useUser } from "~/hooks/queries/useUser";

export function CreateTaskForm() {
  const { slug } = useParams();

  const [taskName, setTaskName] = useState("");

  const { data: user } = useUser(slug!);
  const { mutate: createTask } = useCreateTask();

  // Submit task
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskName.trim()) return;

    createTask({ userId: String(user?._id), title: taskName });
    setTaskName("");
  }

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="flex gap-2">
          <input
            name="new-task"
            value={taskName}
            placeholder="New task..."
            required={true}
            onChange={(e) => setTaskName(e.target.value)}
            className="h-10 w-full rounded-md border px-4"
          />

          <button className="h-10 rounded-md bg-zinc-800 px-5 text-zinc-50">
            Create
          </button>
        </div>
      </form>

      {/* {isPending && <div>{variables.title}</div>} */}
    </>
  );
}
