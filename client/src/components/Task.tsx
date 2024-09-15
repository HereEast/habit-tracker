import mongoose from "mongoose";

import { Button } from "./ui/Button";
import { Entry } from "./Entry";

import { useAppContext, useMonthEntries } from "~/hooks";
import { getDaysInMonth } from "~/utils";
import { deleteTaskById } from "~/api/tasks";

interface TaskListItemProps {
  taskId: mongoose.Types.ObjectId;
  title: string;
  year: number;
  month: number;
}

export function Task(props: TaskListItemProps) {
  const { userId } = useAppContext();

  const { taskId, title, year, month } = props;

  const {
    data: entries,
    isLoading,
    error,
  } = useMonthEntries({ userId, taskId, year, month });

  const daysInMonth = getDaysInMonth(month, year);
  const invalidEntries = entries ? daysInMonth - entries?.length : 0;

  async function handleDeleteTask() {
    if (!taskId) {
      return;
    }

    await deleteTaskById(userId, taskId);
  }

  return (
    <div className="flex w-full items-center gap-6">
      <div className="w-32 truncate text-sm">{title}</div>

      {/* Entries */}
      <div className="flex gap-0.5">
        {invalidEntries > 0 &&
          new Array(invalidEntries)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="size-6 shrink-0 bg-transparent" />
            ))}

        {entries &&
          entries.map((entry) => (
            <Entry id={entry._id} status={entry.status} key={String(entry._id)} />
          ))}
      </div>

      <Button
        onClick={handleDeleteTask}
        classes="size-6 p-0 rounded-[4px] text-sm"
      >
        X
      </Button>
    </div>
  );
}
