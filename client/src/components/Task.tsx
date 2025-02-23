import { useState } from "react";

import { Button } from "./ui";
import { Entry } from "./Entry";

import { useAppContext, useEntries } from "~/hooks";
import { updateTask } from "~/api/tasks";
import { cn } from "~/utils/handlers";
import { IEntry, ITask, Status } from "~/utils/types";

interface TaskProps {
  year: number;
  month: number;
  task: ITask;
  onDelete: (id: string, deletedTaskRatings: Status[]) => void;
}

// Task
export function Task({ task, year, month, onDelete }: TaskProps) {
  const { today } = useAppContext();

  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [editMode, setEditMode] = useState(false);

  const {
    data: entriesData,
    isLoading,
    isError,
  } = useEntries({ taskId: String(task._id), year, month });

  const taskRatings = entriesData?.map((entry) => entry.status) || [];
  const isCurrentMonth = today.month === month && today.year === year;

  // Delete task
  function handleDelete() {
    if (!isCurrentMonth) {
      return;
    }

    onDelete(String(task._id), taskRatings);
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
          disabled={!isCurrentMonth}
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
      <TaskEntries entries={entriesData || []} />

      <Button
        onClick={handleDelete}
        disabled={!isCurrentMonth}
        classes={cn(
          "size-6 p-0 rounded-[4px] text-sm",
          !isCurrentMonth && "opacity-50",
        )}
      >
        X
      </Button>
    </div>
  );
}

// Task Entries
interface TaskEntriesProps {
  entries: IEntry[];
}

function TaskEntries({ entries }: TaskEntriesProps) {
  const firstEntryDay = entries && entries.length > 0 ? entries[0].day : 1;
  const invalidEntries = firstEntryDay - 1;
  const restEntries = entries?.length
    ? 31 - (entries?.length + invalidEntries)
    : 0;

  return (
    <div className="flex gap-0.5">
      {invalidEntries > 0 &&
        new Array(invalidEntries)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="size-6 shrink-0 border bg-transparent" />
          ))}

      {entries &&
        entries.map((entry) => <Entry entry={entry} key={String(entry._id)} />)}

      {restEntries > 0 &&
        new Array(restEntries)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="size-6 shrink-0 border bg-transparent" />
          ))}
    </div>
  );
}
