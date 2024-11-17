import { createContext, ReactNode, useState } from "react";

import { Status } from "~/utils/types";

interface MonthContextProps {
  selectedEntryId: string | null;
  setSelectedEntryId: (entry: string | null) => void;
  selectedRating: Status | null;
  setSelectedRating: (status: Status | null) => void;
}

interface MonthContextProviderProps {
  children: ReactNode;
}

export const MonthContext = createContext<MonthContextProps | undefined>(
  undefined,
);

export function MonthContextProvider({ children }: MonthContextProviderProps) {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<Status | null>(null);

  const value = {
    selectedEntryId,
    setSelectedEntryId,
    selectedRating,
    setSelectedRating,
  };

  return (
    <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
  );
}
