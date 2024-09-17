import mongoose from "mongoose";
import { createContext, ReactNode, useState } from "react";

interface ContextProps {
  userId: string;
  selectedEntryId: mongoose.Types.ObjectId | null;
  setSelectedEntryId: (entry: mongoose.Types.ObjectId | null) => void;
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

  const value = {
    userId,
    selectedEntryId,
    setSelectedEntryId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
