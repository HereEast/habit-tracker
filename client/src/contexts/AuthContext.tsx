import { createContext } from "react";

import { IUser } from "~/utils/types";

export interface AuthContextProps {
  user: IUser | null;
  isLoading: boolean;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
