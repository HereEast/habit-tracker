import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { useAuthContext } from "~/hooks";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (!isAuth) {
      // router.replace("/");
    }
  }, [isAuth, router]);

  return <>{isAuth ? children : null}</>;
}
