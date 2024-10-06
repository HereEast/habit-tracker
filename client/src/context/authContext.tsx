import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  const value = {
    isAuth,
    setIsAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
