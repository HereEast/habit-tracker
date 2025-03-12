import { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";

import { AuthContext } from "./AuthContext";
import { IUser } from "~/utils/types";
import { mapDecodedUser } from "~/utils/helpers";

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const decodedUser = jwtDecode(token) as JwtPayload;
      setUser(mapDecodedUser(decodedUser));
    } else {
      setUser(null);
    }
  }, []);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
