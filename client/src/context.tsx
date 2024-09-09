import { createContext, ReactNode } from "react";

interface ContextProps {
  userId: string;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<ContextProps | undefined>(undefined);

export function ContextProvider({ children }: ContextProviderProps) {
  const userId = "66d0db0c810e60d1f8a7c9d8";

  return (
    <AppContext.Provider value={{ userId }}>{children}</AppContext.Provider>
  );
}
