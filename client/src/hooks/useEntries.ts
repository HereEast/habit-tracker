import { useEffect, useState } from "react";
import mongoose from "mongoose";

import { getEntries } from "~/api/entries";
import { IEntry } from "~/~/models/Entry";

type MongooseId = mongoose.Types.ObjectId;

interface UseEntriesProps {
  userId?: string;
  taskId?: MongooseId;
  year: number;
  month: number;
  day?: number;
}

export function useEntries(props: UseEntriesProps) {
  const { userId, taskId, year, month, day } = props;

  const [data, setData] = useState<IEntry[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      setIsLoading(true);
      setError(false);

      try {
        const entries = await getEntries({ userId, taskId, year, month, day });

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
