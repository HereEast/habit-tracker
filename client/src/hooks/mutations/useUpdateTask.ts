import { useMutation } from "@tanstack/react-query";

import { updateTaskTitle } from "~/api/tasks";
import { queryClient } from "~/services";
import { getCurrentMonthQueryKeys } from "~/utils/helpers";
import { MonthTimelineData } from "~/utils/types";

// Forever delete (w Entries)
export function useUpdateTask() {
  const queryKey = getCurrentMonthQueryKeys();

  const { mutate } = useMutation({
    mutationKey: ["tasks", "current-month"],
    mutationFn: updateTaskTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update the cache
      queryClient.setQueryData(queryKey, (oldData: MonthTimelineData) => {
        if (!oldData) return [];

        const tempTasks = oldData.tasks.map(({ task }) => {
          if (task._id === input.taskId) {
            return {
              ...task,
              title: input.title,
            };
          }

          return task;
        });

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
