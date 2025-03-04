import { useQuery } from "@tanstack/react-query";

import { getUserTasks } from "~/api/tasks/getUserTasks";
import { getUser } from "~/api/users/getUser";

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
