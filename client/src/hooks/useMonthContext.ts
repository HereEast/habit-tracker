import { useContext } from "react";

import { MonthContext, MonthContextProps } from "~/contexts/MonthContext";

export function useMonthContext(): MonthContextProps {
  const context = useContext(MonthContext);

  if (!context) {
    throw new Error(
      "No context found. Month context must be used within a ContextProvider.",
    );
  }
  return context;
}
