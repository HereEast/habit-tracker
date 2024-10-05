import { createContext, ReactNode, useEffect, useState } from "react";
import mongoose from "mongoose";

type MongooseId = mongoose.Types.ObjectId;

interface AppContextProps {
  // userId: MongooseId | null;
  // setUserId: (userId: MongooseId) => void,
  isAuth: boolean;
  setIsAuth: (state: boolean) => void,
  isAuthLoading: boolean,
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

  // const userId = "66d0db0c810e60d1f8a7c9d8";
  // const userId = "66e9d216ea7fd7292cb6b325";

  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setAuthIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthIsLoading(false);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const today = new Date();

  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const value = {
    // userId,
    // setUserId,
    isAuth,
    setIsAuth,
    isAuthLoading,
    today: {
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
