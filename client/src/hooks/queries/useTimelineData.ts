import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCurrentMonthData, getTimelineData } from "~/api/timeline";
import { getToday } from "~/utils/helpers";

// Get year data
export function useTimelineData(userId: string, year: number) {
  return useQuery({
    queryKey: ["timeline", year],
    queryFn: () => getTimelineData(userId, year),
    enabled: Boolean(userId),
    placeholderData: keepPreviousData,
  });
}

// Get year data
export function useCurrentMonthData(userId: string) {
  const { currentMonth } = getToday();

  return useQuery({
    queryKey: ["current-month", currentMonth],
    queryFn: () => getCurrentMonthData(userId),
    enabled: Boolean(userId),
    placeholderData: keepPreviousData,
  });
}
