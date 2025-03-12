import { useContext } from "react";

import { AuthContext, AuthContextProps } from "~/contexts/AuthContext";

export function useAuthContext(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "No context found. Auth context must be used within a ContextProvider.",
    );
  }
  return context;
}
