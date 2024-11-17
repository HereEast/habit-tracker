import { useEffect, useState } from "react";

import { MonthCardDays } from "./MonthCardDays";
import { MonthCardHeader } from "./MonthCardHeader";
import { Notice } from "./Notice";
import { Task } from "./Task";
import { CreateTaskForm } from "./CreateTaskForm";

import { useAppContext, useEntries, useMonthRating } from "~/hooks";
import { IMonthData } from "~/api/users";
import { deleteTask } from "~/api/tasks";

import {
  calculateStatusPercentage,
  filterDeletedRatings,
} from "~/utils/handlers";
import { Status, type ITask } from "~/utils/types";

interface MonthCardProps {
  year: number;
  monthData: IMonthData;
}

export function MonthCard({ year, monthData }: MonthCardProps) {
  const { today } = useAppContext();

  const [monthTasks, setMonthTasks] = useState<ITask[]>(monthData.tasks);
  const [monthEntryRatings, setMonthEntryRatings] = useState<Status[]>([]);

  const { data: entriesMonthData, isLoading: isEntriesLoading } = useEntries({
    year,
    month: monthData.month,
  });

  const { monthPercentage, setMonthPercentage } = useMonthRating({
    entriesMonthData: entriesMonthData || [],
    monthEntryRatings,
  });

  // Ratings array
  useEffect(() => {
    const ratings = entriesMonthData?.map((entry) => entry.status);

    if (ratings) {
      setMonthEntryRatings(ratings);
    }
  }, [entriesMonthData, setMonthEntryRatings]);

  // Percentage
  useEffect(() => {
    const percentage = calculateStatusPercentage(monthEntryRatings);

    setMonthPercentage(percentage);
  }, [monthEntryRatings, setMonthPercentage]);

  // On Create
  function handleOnCreate(newTask: ITask) {
    setMonthTasks((prevTasks) => [...prevTasks, newTask]);
    setMonthEntryRatings((prev) => [
      ...prev,
      ...new Array(newTask.entries.length).fill(0),
    ]);
  }

  // Delete
  async function handleDeleteTask(
    taskId: string,
    deletedTaskRatings: Status[],
  ) {
    const updatedTasks = monthTasks.filter((task) => task._id !== taskId);

    setMonthTasks(updatedTasks);
    setMonthEntryRatings((prev) =>
      filterDeletedRatings(prev, deletedTaskRatings),
    );

    await deleteTask(taskId);
  }

  const isCurrentMonth = today.month === monthData.month;

  return (
    <div className="w-fit min-w-[680px] space-y-6 rounded-xl bg-stone-100/75 p-6">
      <MonthCardHeader
        year={year}
        month={monthData.month}
        tasksCount={monthTasks.length}
        monthPercentage={monthPercentage}
      />

      <div>
        {monthTasks?.length === 0 && (
          <Notice text="You haven't created any tasks yet." />
        )}

        {monthTasks && monthTasks?.length > 0 && (
          <div className="flex w-full flex-col justify-center gap-2">
            <MonthCardDays year={year} month={monthData.month} />

            <div className="space-y-0.5">
              {monthTasks.map((task) => (
                <Task
                  task={task}
                  year={year}
                  month={monthData.month}
                  onDelete={handleDeleteTask}
                  key={String(task._id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Task form */}
      {isCurrentMonth && <CreateTaskForm handleOnCreate={handleOnCreate} />}
    </div>
  );
}
