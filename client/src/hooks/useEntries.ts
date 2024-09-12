import { useEffect, useState } from "react";
import mongoose from "mongoose";

import { getMonthEntriesByTaskId, getUserEntriesByDay } from "~/api/entries";
import { IEntry } from "~/~/models/Entry";

interface IUseEntriesProps {
  userId: string;
  taskId?: mongoose.Types.ObjectId | undefined;
  year: number;
  month: number;
  day?: number;
}

export function useEntries(props: IUseEntriesProps) {
  const { userId, taskId, year, month, day } = props;

  const [data, setData] = useState<IEntry[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      setIsLoading(true);
      setError(false);

      try {
        const entries = day
          ? await getUserEntriesByDay(userId, year, month, day)
          : await getMonthEntriesByTaskId(userId, taskId, year, month);

        setData(entries);
        setIsLoading(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEntries();
  }, [userId, taskId, year, month, day]);

  return { data, isLoading, error };
}
