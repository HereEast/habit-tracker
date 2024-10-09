import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuthContext } from "~/hooks";
import { Register } from "~/components/layouts/Register";

export default function RegisterPage() {
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

  return <Register />;
}
