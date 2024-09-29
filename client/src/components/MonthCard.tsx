import { useState } from "react";
import mongoose from "mongoose";

import { CreateTaskForm } from "./CreateTaskForm";
import { MonthDaysRow } from "./MonthDaysRow";
import { MonthCardHeader } from "./MonthCardHeader";
import { Notice } from "./Notice";
import { Task } from "./Task";

import { useAppContext } from "~/hooks";
import { IMonthData } from "~/api/users";
import { ITask } from "~/~/models/Task";
import { deleteTask } from "~/api/tasks";

interface MonthCardProps {
  year: number;
  monthData: IMonthData;
}

export function MonthCard({ year, monthData }: MonthCardProps) {
  const { userId } = useAppContext();

  const [monthTasks, setMonthTasks] = useState<ITask[]>(monthData.tasks);

  // Handle Delete
  async function handleDelete(taskId: mongoose.Types.ObjectId) {
    const updatedTasks = monthTasks.filter((task) => task._id !== taskId);

    setMonthTasks(updatedTasks); // Delete from UI
    await deleteTask(userId, taskId); // Delete from DB
  }

  return (
    <div className="w-fit min-w-[680px] rounded-xl bg-stone-100/75 p-6">
      <MonthCardHeader year={year} month={monthData.month} classes="mb-6" />

      <div className="mb-4">
        {monthTasks?.length === 0 && (
          <Notice text="You haven't created any tasks yet." />
        )}

        {monthTasks && monthTasks?.length > 0 && (
          <div className="flex w-full flex-col justify-center gap-2">
            <MonthDaysRow year={year} month={monthData.month} />

            <div className="space-y-0.5">
              {monthTasks.map((task) => (
                <Task
                  task={task}
                  year={year}
                  month={monthData.month}
                  onDelete={handleDelete}
                  key={String(task._id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <CreateTaskForm />
    </div>
  );
}
