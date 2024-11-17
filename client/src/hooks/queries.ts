import { useQuery } from "@tanstack/react-query";

import { getEntries } from "~/api/entries";
import { getUserTasks } from "~/api/tasks";
import { getUserYear } from "~/api/users";

// Year
export function useUserYear(year: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["year"],
    queryFn: () => getUserYear(year),
  });

  return { data, isLoading, isError };
}

// Tasks
export function useTasks() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getUserTasks(),
  });

  return { data, isLoading, isError };
}

// Entries
interface UseEntriesProps {
  taskId?: string;
  year: number;
  month: number;
  day?: number;
}

export function useEntries(props: UseEntriesProps) {
  const { taskId, year, month, day } = props;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["entires", month, day, taskId],
    queryFn: () => getEntries({ taskId, year, month, day }),
  });

  return { data, isLoading, isError };
}
