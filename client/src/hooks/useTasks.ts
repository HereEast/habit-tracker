import { useEffect, useState } from "react";

import { getTasks } from "~/api";
import { ITask } from "~/~/models/Task";

export function useTasks(userId: string) {
  const [data, setData] = useState<ITask[] | undefined>([]);
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
      } catch (err) {
        setError(true);
        console.log("Error", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, [userId]);

  return { data, isLoading, error };
}
