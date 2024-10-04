import { createContext, ReactNode, useState } from "react";
import mongoose from "mongoose";

import { Status } from "~/~/models/Entry";

type MongooseId = mongoose.Types.ObjectId;

interface MonthContextProps {
  selectedEntryId: MongooseId | null;
  setSelectedEntryId: (entry: MongooseId | null) => void;
  selectedRating: Status | null;
  setSelectedRating: (status: Status | null) => void;
  today: {
    todayDay: number;
    todayMonth: number;
    todayYear: number;
  };
}

interface MonthContextProviderProps {
  children: ReactNode;
}

export const MonthContext = createContext<MonthContextProps | undefined>(
  undefined,
);

export function MonthContextProvider({ children }: MonthContextProviderProps) {
  const [selectedEntryId, setSelectedEntryId] = useState<MongooseId | null>(
    null,
  );
  const [selectedRating, setSelectedRating] = useState<Status | null>(null);

  const today = new Date();

  const value = {
    selectedEntryId,
    setSelectedEntryId,
    selectedRating,
    setSelectedRating,
    today: {
      todayDay: today.getDate(),
      todayMonth: today.getMonth() + 1,
      todayYear: today.getFullYear(),
    },
  };

  return (
    <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
  );
}
