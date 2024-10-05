import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { useAppContext } from "~/hooks";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  const { isAuth, isAuthLoading } = useAppContext();

  useEffect(() => {
    if (!isAuthLoading && !isAuth) {
      router.replace("/");
    }
  }, [isAuth, router, isAuthLoading]);

  return <>{isAuth ? children : null}</>;
}
