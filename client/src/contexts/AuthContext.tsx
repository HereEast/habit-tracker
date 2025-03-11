import { createContext } from "react";

import { IUser } from "~/utils/types";

export interface AuthContextProps {
  isAuth: boolean;
  toggleIsAuth: () => void;
  // isAuthLoading: boolean;
  user: IUser;
  setUser: (user: IUser) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
