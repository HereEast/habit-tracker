import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { TaskEntries } from "./TaskEntries";
import { Button, Input, Modal } from "../ui";

import { ITask, IEntry } from "~/utils/types";
import { cn, isCurrentMonth } from "~/utils/helpers";
import { useUpdateTask, useDeleteTask } from "~/hooks";

interface TaskListItemProps {
  task: ITask;
  entries: IEntry[];
  year: number;
  month: number;
}

export function TaskListItem(data: TaskListItemProps) {
  const { task, entries, year, month } = data;

  const [value, setValue] = useState(task?.title);
  const [isModal, setIsModal] = useState(false);

  const { mutate: updateTitle } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  useEffect(() => {
    setValue(task?.title);
  }, [task?.title]);

  // Update
  function handleUpdateTitle() {
    if (value.trim() && value.trim() !== task.title) {
      updateTitle({ taskId: task._id, title: value });
    }
  }

  // Delete
  function handleDelete() {
    deleteTask(
      { taskId: task._id, createdAt: task.createdAt },
      { onSuccess: () => setIsModal(false) },
    );
  }

  return (
    <>
      <li className="h-entry flex w-full items-center gap-6">
        <div className="w-32">
          <Input
            name="task"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleUpdateTitle}
            disabled={!isCurrentMonth(year, month)}
            className={cn(
              "focus:bg-brown-50 h-full cursor-default truncate rounded-sm border-transparent px-0 focus:border-transparent focus:px-1",
              isCurrentMonth(year, month) && "hover:bg-brown-50",
            )}
          />
        </div>

        <div className="flex gap-6">
          <TaskEntries entries={entries || []} year={year} month={month} />

          {isCurrentMonth(year, month) && (
            <Button
              size="icon"
              className="hover:bg-brown-900/10 size-entry flex cursor-pointer items-center justify-center rounded-sm bg-transparent transition"
              onClick={() => setIsModal(true)}
            >
              <XMarkIcon className="text-brown-900 size-5" />
            </Button>
          )}
        </div>
      </li>

      {isModal && (
        <Modal title={`Delete "${task.title}"?`} className="max-w-[360px]">
          <>
            <Button onClick={handleDelete} className="w-full">
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsModal(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </>
        </Modal>
      )}
    </>
  );
}
