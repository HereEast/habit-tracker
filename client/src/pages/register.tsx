import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuthContext } from "~/hooks";
import { Register } from "~/components/layouts/Register";

export default function RegisterPage() {
  const router = useRouter();

  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (isAuth) {
      router.replace("/");
    }
  }, [isAuth, router]);

  return <Register />;
}
