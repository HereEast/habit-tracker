import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { createTask } from "~/api/tasks";
import { useUser } from "~/hooks/queries";
import { MonthTimelineData } from "~/server/utils/types";
import { getDaysInMonth, getToday } from "~/utils/handlers";

export function CreateTaskForm() {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [taskName, setTaskName] = useState("");

  const { data: user } = useUser(slug!);

  const { mutate } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-month"] });
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["current-month"] });

      const previousData = queryClient.getQueryData(["current-month"]);

      const { currentDay, currentMonth, currentYear } = getToday();
      const daysInMonth = getDaysInMonth(currentMonth, currentYear);
      const entriesCount = daysInMonth - currentDay;

      const entries = Array.from({ length: entriesCount }, (_, i) => ({
        _id: "temp-entry-" + Math.random(),
        userId: newTask.userId,
        taskId: "temp-task-" + Math.random(),
        year: currentYear,
        month: currentMonth,
        day: currentDay + i,
        status: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      // Optimistically update the cache
      queryClient.setQueryData(
        ["current-month"],
        (oldData: MonthTimelineData) => {
          if (!oldData) return [];

          return {
            ...oldData,
            tasks: [
              ...oldData.tasks,
              {
                task: {
                  _id: "temp-task-" + Math.random(),
                  title: newTask.title,
                  deleted: false,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
                entries: entries,
              },
            ],
          };
        },
      );

      setTaskName("");

      return previousData;
    },
  });

  // Submit task
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskName.trim()) return;

    mutate({ userId: String(user?._id), title: taskName });
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
