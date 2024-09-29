import { useContext } from "react";

import { MonthContext } from "~/context";

export function useMonthContext() {
  const context = useContext(MonthContext);

  if (!context) {
    throw new Error(
      "No context found. Month context must be used within a ContextProvider.",
    );
  }
  return context;
}
