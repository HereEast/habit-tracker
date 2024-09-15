import { useEffect, useState } from "react";

import { getEntries } from "~/api/entries";
import { IEntry } from "~/~/models/Entry";

interface IUseEntriesProps {
  userId: string;
  year: number;
  month: number;
  day: number;
}

export function useDayEntries(props: IUseEntriesProps) {
  const { userId, year, month, day } = props;

  const [data, setData] = useState<IEntry[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      setIsLoading(true);
      setError(false);

      try {
        const entries = await getEntries(userId, year, month, day);

        setData(entries);
        setIsLoading(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEntries();
  }, [userId, year, month, day]);

  return { data, isLoading, error };
}
