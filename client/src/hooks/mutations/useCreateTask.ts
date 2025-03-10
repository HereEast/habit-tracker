import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTask } from "~/api/tasks";
import { MonthTimelineData } from "~/server/utils/types";
import { getDaysInMonth, getToday } from "~/utils/helpers";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["tasks", "current-month"],
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-month"] });
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["current-month"] });
      const previousData = queryClient.getQueryData(["current-month"]);

      // Optimistically update the cache
      queryClient.setQueryData(
        ["current-month"],
        (oldData: MonthTimelineData) => {
          if (!oldData) return [];

          const tempData = getTempData(oldData, newTask.title);
          return tempData;
        },
      );

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
