import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AuthProvider() {
  const navigate = useNavigate();

  const isAuth = true;

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return isAuth && <Outlet />;
}
