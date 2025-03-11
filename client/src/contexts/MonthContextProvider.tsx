import { ReactNode, useState } from "react";

import { MonthContext } from "./MonthContext";
import { Status } from "~/utils/types/data";

interface MonthContextProviderProps {
  children: ReactNode;
}

export function MonthContextProvider({ children }: MonthContextProviderProps) {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const value = {
    selectedEntry,
    setSelectedEntry,
    selectedStatus,
    setSelectedStatus,
  };

  return (
    <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
  );
}
