import mongoose from "mongoose";

import { Button } from "./ui/Button";
import { Entry } from "./Entry";

import { useAppContext, useEntries } from "~/hooks";
import { cn, getDaysInMonth } from "~/utils";
import { deleteTask, updateTask } from "~/api/tasks";
import { useState } from "react";

interface TaskListItemProps {
  taskId: mongoose.Types.ObjectId;
  title: string;
  year: number;
  month: number;
}

export function Task(props: TaskListItemProps) {
  const { userId } = useAppContext();

  const { taskId, title, year, month } = props;

  const [newTaskTitle, setNewTaskTitle] = useState(title);
  const [editMode, setEditMode] = useState(false);

  // const {
  //   data: entries,
  //   isLoading,
  //   error,
  // } = useEntries({ userId, taskId, year, month });

  const daysInMonth = getDaysInMonth(month, year);
  // const invalidEntries = entries ? daysInMonth - entries?.length : 0;

  // Delete
  async function handleDeleteTask() {
    if (taskId) {
      await deleteTask(userId, taskId);
    }
  }

  // Edit title
  async function handleEditTitle() {
    if (taskId) {
      await updateTask(taskId, newTaskTitle);
    }

    setEditMode(false);
  }

  return (
    <div className="flex w-full items-center gap-6">
      <div className="w-32">
        <input
          value={newTaskTitle}
          className={cn(
            "h-6 w-full truncate border border-x-0 border-transparent bg-transparent text-sm outline-none",
            editMode && "border-b-brown-200/0 bg-brown-50",
          )}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onFocus={() => setEditMode(true)}
          onBlur={handleEditTitle}
        />
      </div>

      {/* Entries */}
      {/* <div className="flex gap-0.5">
        {invalidEntries > 0 &&
          new Array(invalidEntries)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="size-6 shrink-0 bg-transparent" />
            ))}

        {entries &&
          entries.map((entry) => (
            <Entry entry={entry} key={String(entry._id)} />
          ))}
      </div> */}

      <Button
        onClick={handleDeleteTask}
        classes="size-6 p-0 rounded-[4px] text-sm"
      >
        X
      </Button>
    </div>
  );
}
