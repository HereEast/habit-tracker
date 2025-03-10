import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTask } from "~/api/tasks";
import { MonthTimelineData } from "~/server/utils/types";

// Forever delete (w Entries)
export function useDeleteTaskFromCurrentMonth() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["tasks", "current-month"],
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-month"] });
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ["current-month"] });
      const previousData = queryClient.getQueryData(["current-month"]);

      // Optimistically update the cache
      queryClient.setQueryData(
        ["current-month"],
        (oldData: MonthTimelineData) => {
          if (!oldData) return [];

          const tempTasks = oldData.tasks.map(({ task }) => {
            if (String(task._id) === input.taskId) {
              return {
                ...task,
                deleted: true,
                deletedAt: new Date(),
              };
            }

            return task;
          });

          const tempData = {
            ...oldData,
            tasks: tempTasks,
          };

          return tempData;
        },
      );

      return previousData;
    },
  });

  return { mutate };
}

// Forever delete (w Entries)
export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["tasks", "current-month"],
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-month"] });
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ["current-month"] });
      const previousData = queryClient.getQueryData(["current-month"]);

      // Optimistically update the cache
      queryClient.setQueryData(
        ["current-month"],
        (oldData: MonthTimelineData) => {
          if (!oldData) return [];

          const tempTasks = oldData.tasks.filter(
            ({ task }) => String(task._id) !== input.taskId,
          );

          const tempData = {
            ...oldData,
            tasks: tempTasks,
          };

          return tempData;
        },
      );

      return previousData;
    },
  });

  return { mutate };
}
