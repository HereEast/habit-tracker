import { useContext } from "react";

import { AppContext, AppContextProps } from "~/contexts";

export function useAppContext(): AppContextProps {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "No context found. App's context must be used within a ContextProvider.",
    );
  }

  return context;
}
