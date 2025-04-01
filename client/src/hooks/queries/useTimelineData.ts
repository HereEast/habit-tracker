import { useQuery } from "@tanstack/react-query";

import { getCurrentMonthData, getTimelineData } from "~/api/timeline";
import { getToday } from "~/utils/helpers";

// Get year data
export function useTimelineData(userId: string, year: number) {
  return useQuery({
    queryKey: [userId, year, "timeline"],
    queryFn: () => getTimelineData(userId, year),
    enabled: Boolean(userId),
  });
}

// Get year data
export function useCurrentMonthData(userId: string) {
  const { currentMonth, currentYear } = getToday();

  return useQuery({
    queryKey: ["current-month", currentMonth, currentYear],
    queryFn: () => getCurrentMonthData(userId),
    enabled: Boolean(userId),
  });
}
