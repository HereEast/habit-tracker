import { createContext } from "react";
import { IUser } from "~/utils/types";

export interface AuthContextProps {
  user: IUser | null;
  // isAuth: boolean;
  // toggleIsAuth: () => void;
  // isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
