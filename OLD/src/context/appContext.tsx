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

  const value = {
    today: {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
