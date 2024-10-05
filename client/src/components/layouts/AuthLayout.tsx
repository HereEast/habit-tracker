import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { useAuth } from "~/hooks";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      const token = localStorage.getItem("token") || "";
      const decodedUser = jwt.decode(token) as JwtPayload;

      if (decodedUser) {
        router.replace(`/${decodedUser.username}`);
      }
    } else {
      router.replace("/");
    }
  }, [isAuth, router]);

  return <>{isAuth ? children : null}</>;
}
