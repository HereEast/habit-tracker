import { useEffect, useState } from "react";

import { getUserTasks } from "~/api/tasks";
import { ITask } from "~/~/models/Task";

export function useTasks() {
  const [data, setData] = useState<ITask[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      setError(false);

      try {
        const userTasks = await getUserTasks();

        setData(userTasks);
        setIsLoading(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return { data, isLoading, error };
}
