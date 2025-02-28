import { useContext } from "react";

import { AuthContext } from "~/context";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "No context found. App's context must be used within a AuthContextProvider.",
    );
  }
  return context;
}
