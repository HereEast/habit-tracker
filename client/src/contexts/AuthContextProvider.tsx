import { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";

import { AuthContext } from "./AuthContext";
import { IUser } from "~/utils/types";
import { mapDecodedUser } from "~/utils/helpers";
import { ROUTE } from "~/utils/constants";

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const decodedUser = jwtDecode(token) as JwtPayload;
      setUser(mapDecodedUser(decodedUser));
    } else {
      setUser(null);
    }

    setIsLoading(false);
  }, []);

  function signOut() {
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];
    window.location.replace(ROUTE.home);
  }

  const value = {
    user,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
