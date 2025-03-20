import { useMutation } from "@tanstack/react-query";

import { updateTaskTitle } from "~/api/tasks";
import { queryClient } from "~/services";
import { MonthTimelineData } from "~/utils/types";

// Forever delete (w Entries)
export function useUpdateTask() {
  const { mutate } = useMutation({
    mutationKey: ["tasks", "current-month"],
    mutationFn: updateTaskTitle,
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
        },
      );

      return previousData;
    },
  });

  return { mutate };
}
