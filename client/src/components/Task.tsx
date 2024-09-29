import { useState } from "react";

import { Button } from "./ui/Button";
import { Entry } from "./Entry";

import { deleteTask, updateTask } from "~/api/tasks";
import { useAppContext, useEntries } from "~/hooks";
import { cn } from "~/utils";
import { ITask } from "~/~/models/Task";

interface TaskProps {
  year: number;
  month: number;
  task: ITask;
}

// Task
export function Task({ task, year, month }: TaskProps) {
  const { userId } = useAppContext();

  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [editMode, setEditMode] = useState(false);

  const {
    data: entries,
    isLoading,
    error,
  } = useEntries({ userId, taskId: task._id, year, month });

  const firstEntryDay = entries && entries.length > 0 ? entries[0].day : 1;
  const invalidEntries = firstEntryDay - 1;

  // Delete
  async function handleDeleteTask() {
    if (task._id) {
      await deleteTask(userId, task._id);
    }
  }

  // Edit title
  async function handleEditTitle() {
    if (task._id) {
      await updateTask(task._id, newTaskTitle);
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
      <div className="flex gap-0.5">
        {invalidEntries > 0 &&
          new Array(invalidEntries)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="size-6 shrink-0 border bg-transparent" />
            ))}

        {entries &&
          entries.map((entry) => (
            <Entry entry={entry} key={String(entry._id)} />
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
