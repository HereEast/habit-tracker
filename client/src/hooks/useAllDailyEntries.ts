import { useEffect, useState } from "react";

import { getAllDailyEntries } from "~/api";
import { IEntry } from "~/~/models/Entry";

export function useAllDailyEntries(
  userId: string,
  year: number,
  month: number,
  day: number,
) {
  const [data, setData] = useState<IEntry[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAllDailyEntries() {
      setIsLoading(true);
      setError(false);

      try {
        const entries = await getAllDailyEntries(userId, year, month, day);

        setData(entries);
        setIsLoading(false);
      } catch (err) {
        setError(true);
        console.log("Error", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllDailyEntries();
  }, [userId, year, month, day]);

  return { data, isLoading, error };
}
