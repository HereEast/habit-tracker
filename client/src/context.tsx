import { createContext, ReactNode, useState } from "react";
import mongoose from "mongoose";

import { Status } from "~/~/models/Entry";

// App Context
interface AppContextProps {
  userId: string;
  today: {
    day: number;
    month: number;
    year: number;
  };
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppContextProvider({ children }: AppContextProviderProps) {
  const userId = "66d0db0c810e60d1f8a7c9d8";
  // const userId = "66e9d216ea7fd7292cb6b325";

  const today = new Date();

  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const value = {
    userId,
    today: {
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Month Context
interface MonthContextProps {
  selectedEntryId: mongoose.Types.ObjectId | null;
  setSelectedEntryId: (entry: mongoose.Types.ObjectId | null) => void;
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
  const [selectedEntryId, setSelectedEntryId] =
    useState<mongoose.Types.ObjectId | null>(null);

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
