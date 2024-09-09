import { ReactNode } from "react";
import mongoose from "mongoose";

import { EntryBox } from "./EntryBox";

import { useEntries } from "~/hooks/useEntries";
import { getDaysInMonth } from "~/utils";
import { ITask } from "~/~/models/Task";

// Task List
interface TaskListProps {
  userId: string;
  tasks: ITask[];
  year: number;
  month: number;
}

export function TaskList({ userId, tasks, year, month }: TaskListProps) {
  return (
    <div className="flex flex-col gap-1">
      {tasks.map((task) => (
        <Task
          userId={userId}
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
interface TaskProps {
  userId: string;
  taskId?: mongoose.Types.ObjectId;
  title: string;
  year: number;
  month: number;
}

export function Task(props: TaskProps) {
  const { userId, taskId, title, year, month } = props;

  const {
    data: entries,
    isLoading,
    error,
  } = useEntries(userId, taskId, year, month);

  const daysInMonth = getDaysInMonth(month, year);
  const invalidEntries = daysInMonth - entries?.length;

  return (
    <TaskLayout title={title}>
      <>
        {invalidEntries > 0 &&
          new Array(invalidEntries)
            .fill(0)
            .map((_, i) => <EntryBox invalid={true} key={i} />)}

        {entries &&
          entries.map((entry) => <EntryBox key={String(entry._id)} />)}
      </>
    </TaskLayout>
  );
}

// Task Layout (title + entries)
interface TaskLayoutProps {
  children: ReactNode;
  title?: string;
}

export function TaskLayout({ children, title = "" }: TaskLayoutProps) {
  return (
    <div className="flex w-full gap-6">
      <div className="w-28">{title}</div>

      <div className="flex gap-1">{children}</div>
    </div>
  );
}
