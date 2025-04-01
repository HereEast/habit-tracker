import { useMutation } from "@tanstack/react-query";

import { updateTaskTitle } from "~/api/tasks";
import { queryClient } from "~/services";
import { getToday } from "~/utils/helpers";
import { ITaskData, MonthTimelineData } from "~/utils/types";

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
          getCurrentMonthUpdatedData({
            taskId: input.taskId,
            title: input.title,
            data: oldData,
          }),
      );

      // Optimistically update timeline cache
      queryClient.setQueryData(
        queryKeyTimeline,
        (oldData: MonthTimelineData[]) =>
          getTimelineUpdatedData({
            taskId: input.taskId,
            title: input.title,
            data: oldData,
          }),
      );

      return { previousTimelineData, previousMonthData };
    },
  });

  return { mutate };
}

// Get updated current month data
interface UpdateCacheInput {
  taskId: string;
  title: string;
  data: MonthTimelineData | MonthTimelineData[];
}

function getCurrentMonthUpdatedData(input: UpdateCacheInput) {
  const { data: oldData, taskId, title } = input;

  if (!oldData) return [];

  const tempTasks = getUpdatedTasks({
    tasks: (oldData as MonthTimelineData).tasks,
    taskId,
    title,
  });

  const tempData = {
    ...oldData,
    tasks: tempTasks,
  };

  return tempData;
}

// Get updated timeline data
function getTimelineUpdatedData(input: UpdateCacheInput) {
  const { data: oldData, taskId, title } = input;

  if (!oldData) return [];

  const tempData = (oldData as MonthTimelineData[]).map((monthData) => {
    const tempTasks = getUpdatedTasks({
      tasks: monthData.tasks,
      taskId,
      title,
    });

    return {
      ...monthData,
      tasks: tempTasks,
    };
  });

  return tempData;
}

// Get updated tasks
interface UpdatedTasksInput {
  tasks: ITaskData[];
  taskId: string;
  title: string;
}

function getUpdatedTasks(input: UpdatedTasksInput) {
  const { tasks, taskId, title } = input;

  const updatedTasks = tasks.map((data) => {
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

  return updatedTasks;
}
