import mongoose from "mongoose";

import { EntryBox } from "./EntryBox";
import { useAppContext, useEntries } from "~/hooks";
import { getDaysInMonth } from "~/utils";

import { ITask } from "~/~/models/Task";

// Task List
interface TaskListProps {
  tasks: ITask[];
  year: number;
  month: number;
}

export function TaskList({ tasks, year, month }: TaskListProps) {
  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <TaskListItem
          taskId={task._id}
          title={task.title}
          year={year}
          month={month}
          key={String(task._id)}
        />
      ))}
    </div>
  );
}

// Task
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
  } = useEntries(userId, taskId, year, month);

  const daysInMonth = getDaysInMonth(month, year);
  const invalidEntries = entries ? daysInMonth - entries?.length : 0;

  return (
    <div className="flex w-full items-center gap-6">
      <div className="w-32 truncate">{title}</div>

      <div className="flex gap-1">
        {invalidEntries > 0 &&
          new Array(invalidEntries)
            .fill(0)
            .map((_, i) => <EntryBox invalid={true} key={i} />)}

        {entries &&
          entries.map((entry) => <EntryBox key={String(entry._id)} />)}
      </div>
    </div>
  );
}
