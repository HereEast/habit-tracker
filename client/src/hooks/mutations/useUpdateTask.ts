import { useMutation } from "@tanstack/react-query";

import { updateTaskTitle } from "~/api/tasks";
import { queryClient } from "~/services";
import { getToday } from "~/utils/helpers";
import { MonthTimelineData } from "~/utils/types";

// Forever delete (w Entries)
export function useUpdateTask() {
  const { currentMonth, currentYear } = getToday();

  const queryKeyCurrentMonth = ["current-month", currentMonth];
  const queryKeyTimeline = ["timeline", currentYear];

  const { mutate } = useMutation({
    mutationKey: ["current-month"],
    mutationFn: updateTaskTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyCurrentMonth });
      queryClient.invalidateQueries({ queryKey: queryKeyTimeline });
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: queryKeyTimeline });
      await queryClient.cancelQueries({ queryKey: queryKeyCurrentMonth });

      const previousTimelineData = queryClient.getQueryData(queryKeyTimeline);
      const previousMonthData = queryClient.getQueryData(queryKeyCurrentMonth);

      // Optimistically update current month cache
      queryClient.setQueryData(
        queryKeyCurrentMonth,
        (oldData: MonthTimelineData) =>
          updateCurrentMonthCacheData(input.taskId, input.title, oldData),
      );

      // Optimistically update timeline cache
      queryClient.setQueryData(
        queryKeyTimeline,
        (oldData: MonthTimelineData[]) =>
          updateTimelineCacheData(input.taskId, input.title, oldData),
      );

      return { previousTimelineData, previousMonthData };
    },
  });

  return { mutate };
}

// Update timeline cache
function updateCurrentMonthCacheData(
  taskId: string,
  title: string,
  oldData: MonthTimelineData,
) {
  if (!oldData) return [];

  const tempTasks = oldData.tasks.map((data) => {
    if (data.task._id === taskId) {
      const updatedTask = {
        ...data.task,
        title,
      };

      return {
        ...data,
        task: updatedTask,
      };
    }

    return data;
  });

  const tempData = {
    ...oldData,
    tasks: tempTasks,
  };

  return tempData;
}

// Update timeline cache
function updateTimelineCacheData(
  taskId: string,
  title: string,
  oldData: MonthTimelineData[],
) {
  if (!oldData) return [];

  const tempTasks = oldData.map((monthData) => {
    const tasks = monthData.tasks.map((data) => {
      if (data.task._id === taskId) {
        const updatedTask = {
          ...data.task,
          title,
        };

        return {
          ...data,
          task: updatedTask,
        };
      }

      return data;
    });

    return {
      ...monthData,
      tasks,
    };
  });

  return tempTasks;
}
