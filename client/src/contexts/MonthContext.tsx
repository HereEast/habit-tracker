import { createContext } from "react";

import { Status } from "~/utils/types/data";

// Month Context
export interface MonthContextProps {
  selectedEntry: string | null;
  setSelectedEntry: (entry: string | null) => void;
  selectedStatus: Status | null;
  setSelectedStatus: (status: Status | null) => void;
}

export const MonthContext = createContext<MonthContextProps | undefined>(
  undefined,
);
