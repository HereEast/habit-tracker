import { useEffect, useState } from "react";
import mongoose from "mongoose";

import { getMonthEntriesByTaskId } from "~/api/entries";
import { IEntry } from "~/~/models/Entry";

interface IUseEntriesProps {
  userId: string;
  taskId: mongoose.Types.ObjectId | undefined;
  year: number;
  month: number;
}

export function useMonthEntries(props: IUseEntriesProps) {
  const { userId, taskId, year, month } = props;

  const [data, setData] = useState<IEntry[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      setIsLoading(true);
      setError(false);

      if (!taskId) {
        return;
      }

      try {
        const entries = await getMonthEntriesByTaskId(
          userId,
          taskId,
          year,
          month,
        );

        setData(entries);
        setIsLoading(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEntries();
  }, [userId, taskId, year, month]);

  return { data, isLoading, error };
}
