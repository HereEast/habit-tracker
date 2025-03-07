import { useQuery } from "@tanstack/react-query";
import { getMonthEntriesByTask } from "~/api/entries";

import { getUserTasks } from "~/api/tasks";
import { getYearData } from "~/api/timeline";
import { getUser } from "~/api/users";

import { UseMonthEntriesByTaskInput } from "~/utils/types";

// Get User
export function useUser(slug: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [slug],
    queryFn: () => getUser(slug),
  });

  return { data, isLoading, isError };
}

// Get user Tasks
export function useUserTasks(userId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [userId, "tasks"],
    queryFn: () => getUserTasks(userId),
  });

  return { data, isLoading, isError };
}

// Get month entries by Task
export function useMonthEntriesByTask(input: UseMonthEntriesByTaskInput) {
  const { userId, taskId, year, month } = input;

  const { data, isLoading, isError } = useQuery({
    queryKey: [userId, taskId, year, month, "entries"],
    queryFn: () => getMonthEntriesByTask({ userId, taskId, year, month }),
  });

  return { data, isLoading, isError };
}

// Get year data
export function useYearData(userId: string, year: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [userId, year, "timeline"],
    queryFn: () => getYearData(userId, year),
  });

  return { data, isLoading, isError };
}
