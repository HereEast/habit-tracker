import { ReactNode, useState } from "react";
import { MonthContext } from "./MonthContext";

interface MonthContextProviderProps {
  children: ReactNode;
}

export function MonthContextProvider({ children }: MonthContextProviderProps) {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  // const [selectedRating, setSelectedRating] = useState<Status | null>(null);

  const value = {
    selectedEntry,
    setSelectedEntry,
    // selectedRating,
    // setSelectedRating,
  };

  return (
    <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
  );
}
