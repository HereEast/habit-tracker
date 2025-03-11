import { ReactNode, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "./AuthContext";
import { IUser } from "~/utils/types";

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  function toggleIsAuth() {
    setIsAuth((prev) => !prev);
  }

  const value = {
    isAuth,
    toggleIsAuth,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
