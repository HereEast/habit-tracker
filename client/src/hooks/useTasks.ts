import { useEffect, useState } from "react";
import { getTasks } from "~/api";

import { TaskType } from "~/schemas";

export function UseTasks(userId: string) {
  const [data, setData] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      setError(false);

      try {
        const userTasks = await getTasks(userId);

        setData(userTasks);
        setIsLoading(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, [userId]);

  return { data, isLoading, error };
}
