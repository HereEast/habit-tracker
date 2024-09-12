import { useEffect, useState } from "react";
import mongoose from "mongoose";

import { getMonthEntriesByTaskId } from "~/api/entries";
import { IEntry } from "~/~/models/Entry";

export function useEntries(
  userId: string,
  taskId: mongoose.Types.ObjectId | undefined,
  year: number,
  month: number,
) {
  const [data, setData] = useState<IEntry[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      setIsLoading(true);
      setError(false);

      try {
        const entries = await getMonthEntriesByTaskId(
          userId,
          taskId,
          year,
          month,
        );

        setData(entries);
        setIsLoading(false);
      } catch (err) {
        setError(true);
        console.log("Error", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEntries();
  }, [userId, taskId, year, month]);

  return { data, isLoading, error };
}
