import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

interface AuthRedirectProps {
  children: ReactNode;
}

export function AuthRedirect({ children }: AuthRedirectProps) {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        setIsAuth(true);
      } else {
        router.replace("/");
      }

    }
  }, [router]);

  if (isAuth === null) {
    return null;
  }

  return <>{isAuth ? children : null}</>;
}
