import { useEffect, useState } from "react";

import { getUserYear, IYearData } from "~/api/users";
import { useAppContext } from "./useAppContext";

export function useUserYear(year: number) {
  const { userId } = useAppContext();

  const [data, setData] = useState<IYearData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      setError(false);

      try {
        const userTasks = await getUserYear(userId, year);

        setData(userTasks);
        setIsLoading(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, [userId, year]);

  return { data, isLoading, error };
}
