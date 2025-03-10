import { useQuery } from "@tanstack/react-query";

import { getCurrentMonthData, getTimelineData } from "~/api/timeline";

// Get user Tasks
// export function useUserTasks(userId: string) {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: [userId, "tasks"],
//     queryFn: () => getUserTasks(userId),
//   });

//   return { data, isLoading, isError };
// }

// Get month entries by Task
// export function useMonthEntriesByTask(input: UseMonthEntriesByTaskInput) {
//   const { userId, taskId, year, month } = input;

//   const { data, isLoading, isError } = useQuery({
//     queryKey: [userId, taskId, year, month, "entries"],
//     queryFn: () => getMonthEntriesByTask({ userId, taskId, year, month }),
//   });

//   return { data, isLoading, isError };
// }

// Get year data
export function useTimelineData(userId: string, year: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [userId, year, "timeline"],
    queryFn: () => getTimelineData(userId, year),
    enabled: Boolean(userId),
  });

  return { data, isLoading, isError };
}

// Get year data
export function useCurrentMonthData(userId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-month"],
    queryFn: () => getCurrentMonthData(userId),
    enabled: Boolean(userId),
  });

  return { data, isLoading, isError };
}
