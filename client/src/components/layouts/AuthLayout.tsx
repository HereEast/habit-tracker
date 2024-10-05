import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import jwt from "jsonwebtoken";

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
      const decodedUser = jwt.decode(token);

      console.log(decodedUser);
    } else {
      console.log("Auth", isAuth);

      // router.replace("/");
    }
  }, [isAuth, router]);

  return <>{isAuth ? children : null}</>;
}
