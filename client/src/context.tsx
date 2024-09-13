import mongoose from "mongoose";
import { createContext, ReactNode, useState } from "react";

interface ContextProps {
  userId: string;
  selectedEntry: mongoose.Types.ObjectId | null;
  setSelectedEntry: (entry: mongoose.Types.ObjectId | null) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<ContextProps | undefined>(undefined);

export function ContextProvider({ children }: ContextProviderProps) {
  const [selectedEntry, setSelectedEntry] =
    useState<mongoose.Types.ObjectId | null>(null);

  const userId = "66d0db0c810e60d1f8a7c9d8";

  const value = {
    userId,
    selectedEntry,
    setSelectedEntry,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
