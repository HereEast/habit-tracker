import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuthContext } from "~/hooks";
import { Login } from "~/components/layouts";

export default function LoginPage() {
  const router = useRouter();

  const { user, isAuthLoading } = useAuthContext();

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.replace(`/${user}`);
    }
  }, [user, router, isAuthLoading]);

  if (isAuthLoading) {
    return null;
  }

  return <Login />;
}
