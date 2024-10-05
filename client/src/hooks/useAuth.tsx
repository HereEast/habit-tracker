import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        setIsAuth(true);
      }
    }
  }, []);

  return { isAuth, setIsAuth };
}
