import mongoose from "mongoose";
import { createContext, ReactNode, useState } from "react";

interface ContextProps {
  userId: string;
  selectedEntryId: mongoose.Types.ObjectId | null;
  setSelectedEntryId: (entry: mongoose.Types.ObjectId | null) => void;
  today: {
    todayDay: number;
    todayMonth: number;
    todayYear: number;
  };
}

interface ContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<ContextProps | undefined>(undefined);

export function ContextProvider({ children }: ContextProviderProps) {
  const [selectedEntryId, setSelectedEntryId] =
    useState<mongoose.Types.ObjectId | null>(null);

  const userId = "66d0db0c810e60d1f8a7c9d8";
  // const userId = "66e9d216ea7fd7292cb6b325";

  const today = new Date();

  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  const value = {
    userId,
    selectedEntryId,
    setSelectedEntryId,
    today: {
      todayDay,
      todayMonth,
      todayYear
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
