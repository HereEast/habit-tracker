import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface AuthRedirectProps {
  children: ReactNode;
}

export function AuthRedirect({ children }: AuthRedirectProps) {
  const router = useRouter();

  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return <>{isAuthenticated ? children : null}</>;
}
