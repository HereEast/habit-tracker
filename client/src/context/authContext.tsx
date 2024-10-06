import { createContext, ReactNode, useEffect, useState } from "react";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
  isAuthLoading: boolean;
  user: null | string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        setIsAuth(true);

        const decodedUser = jwt.decode(token) as JwtPayload;
        setUser(decodedUser.username);
      }

      setIsAuthLoading(false);
    }
  }, []);

  const value = {
    isAuth,
    setIsAuth,
    isAuthLoading,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
