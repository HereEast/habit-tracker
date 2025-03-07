import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { createTask } from "~/api/tasks";
import { useUser } from "~/hooks/queries";

export function CreateTaskForm() {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [taskName, setTaskName] = useState("");

  const { data: user } = useUser(slug!);

  const { mutate } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["timeline"] });

      setTaskName("");
      console.log("Created", data);
    },
  });

  // Submit task
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskName.trim()) return;

    mutate({ userId: user?._id as string, title: taskName });
  }

  return (
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
  );
}
