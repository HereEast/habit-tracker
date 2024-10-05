import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppContext } from "~/hooks";
import { Login } from "~/components/layouts";

export default function LoginPage() {
  const router = useRouter();

  const { isAuth } = useAppContext();

  useEffect(() => {
    if (isAuth) {
      router.replace("/");
    }
  }, [isAuth, router]);

  return <Login />;
}
