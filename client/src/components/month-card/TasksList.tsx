import { useState } from "react";

import { Input } from "../ui";
import { TaskEntries } from "./TaskEntries";
import { DeleteTaskButton } from "./DeleteTaskButton";

import { BasicTask, MonthTimelineData } from "~/utils/types";
import { isCurrentMonth } from "~/utils/helpers";
import { useUpdateTask } from "~/hooks/mutations/useUpdateTask";

interface TasksListProps {
  monthData: MonthTimelineData;
  year: number;
}

export function TasksList({ monthData, year }: TasksListProps) {
  const { month, tasks: monthTasks } = monthData;

  return (
    <ul className="mb-6 space-y-0.5">
      {monthTasks.map(({ task, entries }, index) => {
        return (
          <li className="flex w-full items-center gap-6" key={index}>
            <div className="w-32">
              <TaskInput task={task} />
            </div>

            <div className="flex gap-6">
              <TaskEntries entries={entries || []} year={year} month={month} />

              {isCurrentMonth(year, month) && (
                <DeleteTaskButton
                  taskId={task?._id}
                  createdAt={task?.createdAt}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// Task input
interface TaskInputProps {
  task: BasicTask;
}

function TaskInput({ task }: TaskInputProps) {
  const [value, setValue] = useState(task?.title);

  const { mutate: updateTitle } = useUpdateTask();

  function handleUpdateTitle() {
    if (value.trim() === task.title || !value.trim()) {
      return;
    }

    updateTitle({ taskId: task._id, title: value });
  }

  return (
    <Input
      name="task"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleUpdateTitle}
      className="focus:bg-brown-50 hover:bg-brown-50 h-6 cursor-default truncate rounded-sm border-transparent px-0 focus:border-transparent focus:px-1"
    />
  );
}
