import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { useAuthContext } from "~/hooks";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  const { isAuth, isAuthLoading } = useAuthContext();

  useEffect(() => {
    if (!isAuthLoading && !isAuth) {
      router.replace("/login");
    }
  }, [isAuth, isAuthLoading, router]);

  // if !user return 404

  return <>{isAuth ? children : null}</>;
}
