import { useMutation } from "@tanstack/react-query";

import { createTask } from "~/api/tasks";
import { queryClient } from "~/services";
import {
  getCurrentMonthQueryKeys,
  getDaysInMonth,
  getToday,
} from "~/utils/helpers";
import { MonthTimelineData } from "~/utils/types";

export function useCreateTask() {
  const queryKey = getCurrentMonthQueryKeys();

  const { mutate } = useMutation({
    mutationKey: ["tasks", "current-month"],
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update the cache
      queryClient.setQueryData(queryKey, (oldData: MonthTimelineData) => {
        if (!oldData) return [];

        const tempData = getTempData(oldData, newTask.title);
        return tempData;
      });

      return previousData;
    },
  });

  return { mutate };
}

// Temporary task
function getTempData(oldData: MonthTimelineData, newTaskTitle: string) {
  const tempEntries = getTempEntries();

  return {
    ...oldData,
    tasks: [
      ...oldData.tasks,
      {
        task: {
          _id: "temp-task-" + Math.random(),
          title: newTaskTitle,
          deleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        entries: tempEntries,
      },
    ],
  };
}

// Temporary entries
function getTempEntries() {
  const { currentDay, currentMonth, currentYear } = getToday();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const entriesCount = daysInMonth - currentDay + 1;

  const entries = Array.from({ length: entriesCount }, (_, i) => ({
    _id: "temp-entry-" + Math.random(),
    userId: "temp-user-" + Math.random(),
    taskId: "temp-task-" + Math.random(),
    year: currentYear,
    month: currentMonth,
    day: currentDay + i,
    status: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return entries;
}
