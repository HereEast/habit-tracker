import { useContext } from "react";

import { AppContext } from "~/context";

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "No context found. App's context must be used within a ContextProvider.",
    );
  }
  return context;
}
