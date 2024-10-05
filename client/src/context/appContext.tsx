import { createContext, ReactNode, useState } from "react";
import mongoose from "mongoose";

type MongooseId = mongoose.Types.ObjectId;

interface AppContextProps {
  // userId: MongooseId | null;
  // setUserId: (userId: MongooseId) => void,
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
  // const [userId, setUserId] = useState<MongooseId | null>(null);

  // const userId = "66d0db0c810e60d1f8a7c9d8";
  // const userId = "66e9d216ea7fd7292cb6b325";

  const today = new Date();

  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const value = {
    // userId,
    // setUserId,
    today: {
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
