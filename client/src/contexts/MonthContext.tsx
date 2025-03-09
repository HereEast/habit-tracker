import { createContext } from "react";

// Month Context
export interface MonthContextProps {
  selectedEntry: string | null;
  setSelectedEntry: (entry: string | null) => void;
  // selectedRating: Status | null;
  // setSelectedRating: (status: Status | null) => void;
}

export const MonthContext = createContext<MonthContextProps | undefined>(
  undefined,
);
