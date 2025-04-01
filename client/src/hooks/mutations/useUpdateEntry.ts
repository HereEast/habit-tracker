import { useMutation } from "@tanstack/react-query";

import { updateEntryStatus } from "~/api/entries";
import { queryClient } from "~/services";
import { getCurrentMonthQueryKeys } from "~/utils/helpers";
import { MonthTimelineData, Status } from "~/utils/types";

export function useUpdateEntry() {
  const queryKey = getCurrentMonthQueryKeys();

  const { mutate } = useMutation({
    mutationKey: ["entries", "current-month"],
    mutationFn: updateEntryStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onMutate: async (updatedEntry) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      const { entryId, status } = updatedEntry;

      // Optimistically update the cache
      queryClient.setQueryData(queryKey, (oldData: MonthTimelineData) => {
        if (!oldData) return [];

        const tempData = getTempData(oldData, entryId, status);
        return tempData;
      });

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
