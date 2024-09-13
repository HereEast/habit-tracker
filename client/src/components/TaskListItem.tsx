import mongoose from "mongoose";

import { Button } from "./ui/Button";
import { EntryBox } from "./EntryBox";

import { useAppContext, useMonthEntries } from "~/hooks";
import { getDaysInMonth } from "~/utils";
import { deleteTaskById } from "~/api/tasks";

interface TaskListItemProps {
  taskId?: mongoose.Types.ObjectId;
  title: string;
  year: number;
  month: number;
}

export function TaskListItem(props: TaskListItemProps) {
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

      <div className="flex gap-0.5">
        {invalidEntries > 0 &&
          new Array(invalidEntries)
            .fill(0)
            .map((_, i) => <EntryBox key={i} />)}

        {entries &&
          entries.map((entry) => (
            <EntryBox id={entry._id} key={String(entry._id)} />
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
