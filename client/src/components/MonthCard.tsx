import { FormEvent, useEffect, useState } from "react";
import mongoose from "mongoose";

import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { MonthCardDays } from "./MonthCardDays";
import { MonthCardHeader } from "./MonthCardHeader";
import { Notice } from "./Notice";
import { Task } from "./Task";

import { useAppContext, useEntries } from "~/hooks";
import { IMonthData } from "~/api/users";
import { createTask, deleteTask } from "~/api/tasks";
import { calculateStatusPercentage, filterDeletedRatings } from "~/utils";
import { ITask } from "~/~/models/Task";
import { Status } from "~/~/models/Entry";
import { useMonthRating } from "~/hooks/useMonthRating";

interface MonthCardProps {
  year: number;
  data: IMonthData;
}

export function MonthCard({ year, data }: MonthCardProps) {
  const { userId, today } = useAppContext();

  const [newTaskName, setNewTaskName] = useState("");
  const [monthTasks, setMonthTasks] = useState<ITask[]>(data.tasks);
  const [monthEntryRatings, setMonthEntryRatings] = useState<Status[]>([]);

  const { data: entriesData, isLoading: isEntriesLoading } = useEntries({
    userId,
    year,
    month: data.month,
  });

  const { monthPercentage, setMonthPercentage } = useMonthRating({
    entriesData: entriesData || [],
    monthEntryRatings,
  });

  // Ratings array
  useEffect(() => {
    const ratings = entriesData?.map((entry) => entry.status);

    if (ratings) {
      setMonthEntryRatings(ratings);
    }
  }, [entriesData]);

  // Percentage
  useEffect(() => {
    const percentage = calculateStatusPercentage(monthEntryRatings);

    setMonthPercentage(percentage);
  }, [monthEntryRatings, setMonthPercentage]);

  // Create
  // async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   if (!newTaskName.trim()) return;

  //   const newTask = await createTask(userId, newTaskName);

  //   if (newTask) {
  //     setMonthTasks((prevTasks) => [...prevTasks, newTask]);
  //   }

  //   setNewTaskName("");
  // }

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTaskName.trim()) return;

    const newTask = await createTask(userId, newTaskName);

    if (newTask) {
      setMonthTasks((prevTasks) => [...prevTasks, newTask]);
      setMonthEntryRatings((prev) => [
        ...prev,
        ...new Array(newTask.entries.length).fill(0),
      ]);
    }

    setNewTaskName("");
  }

  // Delete
  // async function handleDeleteTask(
  //   taskId: mongoose.Types.ObjectId,
  //   deletedTaskRatings: Status[],
  // ) {
  //   setMonthTasks((prev) => prev.filter((task) => task._id !== taskId));

  //   await deleteTask(userId, taskId);
  // }

  async function handleDeleteTask(
    taskId: mongoose.Types.ObjectId,
    deletedTaskRatings: Status[],
  ) {
    const updatedTasks = monthTasks.filter((task) => task._id !== taskId);

    setMonthTasks(updatedTasks);
    setMonthEntryRatings((prev) =>
      filterDeletedRatings(prev, deletedTaskRatings),
    );

    await deleteTask(userId, taskId);
  }

  const isCurrentMonth = today.month === data.month;

  return (
    <div className="w-fit min-w-[680px] space-y-6 rounded-xl bg-stone-100/75 p-6">
      <MonthCardHeader
        year={year}
        month={data.month}
        tasksCount={monthTasks.length}
        monthPercentage={monthPercentage}
      />

      <div>
        {monthTasks?.length === 0 && (
          <Notice text="You haven't created any tasks yet." />
        )}

        {monthTasks && monthTasks?.length > 0 && (
          <div className="flex w-full flex-col justify-center gap-2">
            <MonthCardDays year={year} month={data.month} />

            <div className="space-y-0.5">
              {monthTasks.map((task) => (
                <Task
                  task={task}
                  year={year}
                  month={data.month}
                  onDelete={handleDeleteTask}
                  key={String(task._id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Task form */}
      {isCurrentMonth && (
        <form onSubmit={(e) => handleCreateTask(e)}>
          <div className="flex gap-2">
            <Input
              name="new-task"
              value={newTaskName}
              placeholder="New task..."
              onChange={(e) => setNewTaskName(e.target.value)}
            />

            <Button>Create</Button>
          </div>
        </form>
      )}
    </div>
  );
}

// Create Task form
// interface CreateTaskFormProps {
//   onSubmit: () => void;
// }

// export function CreateTaskForm() {
//   return (
//     <form onSubmit={(e) => handleCreateTask(e)}>
//       <div className="flex gap-2">
//         <Input
//           name="new-task"
//           value={newTaskName}
//           placeholder="New task..."
//           onChange={(e) => setNewTaskName(e.target.value)}
//         />

//         <Button>Create</Button>
//       </div>
//     </form>
//   );
// }
