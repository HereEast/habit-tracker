import { useContext } from "react";

import { AppContext, AuthContext, MonthContext } from "~/context";

// App Context
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "No context found. App's context must be used within a ContextProvider.",
    );
  }
  return context;
}

// Auth Context
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "No context found. App's context must be used within a AuthContextProvider.",
    );
  }
  return context;
}

// Month Context
export function useMonthContext() {
  const context = useContext(MonthContext);

  if (!context) {
    throw new Error(
      "No context found. Month context must be used within a ContextProvider.",
    );
  }
  return context;
}
