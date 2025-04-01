import { useQuery } from "@tanstack/react-query";

import { getCurrentMonthData, getTimelineData } from "~/api/timeline";
import { getToday } from "~/utils/helpers";

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
  const { currentMonth, currentYear } = getToday();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-month", currentMonth, currentYear],
    queryFn: () => getCurrentMonthData(userId),
    enabled: Boolean(userId),
  });

  return { data, isLoading, isError };
}
