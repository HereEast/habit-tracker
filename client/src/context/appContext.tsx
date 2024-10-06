import { createContext, ReactNode } from "react";

interface AppContextProps {
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
  const today = new Date();

  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const value = {
    today: {
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
