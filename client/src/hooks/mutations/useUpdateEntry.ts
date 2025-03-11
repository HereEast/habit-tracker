import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEntryStatus } from "~/api/entries";
import { MonthTimelineData, Status } from "~/utils/types/data";

export function useUpdateEntry() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["entries", "current-month"],
    mutationFn: updateEntryStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-month"] });
    },
    onMutate: async (updatedEntry) => {
      await queryClient.cancelQueries({ queryKey: ["current-month"] });
      const previousData = queryClient.getQueryData(["current-month"]);

      const { entryId, status } = updatedEntry;

      // Optimistically update the cache
      queryClient.setQueryData(
        ["current-month"],
        (oldData: MonthTimelineData) => {
          if (!oldData) return [];

          const tempData = getTempData(oldData, entryId, status);
          return tempData;
        },
      );

      return previousData;
    },
  });

  return { mutate };
}

// Temporary data
function getTempData(
  oldData: MonthTimelineData,
  entryId: string,
  newStatus: Status,
) {
  return {
    ...oldData,
    tasks: oldData.tasks.map((task) => ({
      ...task,
      entries: task.entries.map((entry) =>
        entry._id === entryId ? { ...entry, status: newStatus } : entry,
      ),
    })),
  };
}
