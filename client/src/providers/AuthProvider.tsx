import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const isAuth = true;

  if (!isAuth) {
    navigate("/login");
  }

  return isAuth && children;
}
