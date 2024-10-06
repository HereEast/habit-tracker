import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuthContext } from "~/hooks";
import { Login } from "~/components/layouts";

export default function LoginPage() {
  const router = useRouter();

  const { isAuth, isAuthLoading } = useAuthContext();

  useEffect(() => {
    if (!isAuthLoading && isAuth) {
      router.replace("/app");
    }
  }, [isAuth, router, isAuthLoading]);

  return <Login />;
}
