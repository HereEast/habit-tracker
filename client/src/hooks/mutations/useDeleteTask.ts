import { useMutation } from "@tanstack/react-query";

import { deleteTask } from "~/api/tasks";
import { queryClient } from "~/services";
import { getCurrentMonthQueryKeys } from "~/utils/helpers";
import { MonthTimelineData } from "~/utils/types";

export function useDeleteTask() {
  const queryKey = getCurrentMonthQueryKeys();

  const { mutate } = useMutation({
    mutationKey: ["tasks", "current-month"],
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update the cache
      queryClient.setQueryData(queryKey, (oldData: MonthTimelineData) => {
        if (!oldData) return [];

        const tempTasks = oldData.tasks.filter(
          ({ task }) => task._id !== input.taskId,
        );

        const tempData = {
          ...oldData,
          tasks: tempTasks,
        };

        return tempData;
      });

      return previousData;
    },
  });

  return { mutate };
}
