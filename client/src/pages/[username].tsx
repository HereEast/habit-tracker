import { useRouter } from "next/router";
import { useEffect } from "react";

import { Timeline } from "~/components/layouts";
import { MonthContextProvider } from "~/context";
import { useAuthContext } from "~/hooks";

export default function MainPage() {
  const router = useRouter();

  const { isAuth, isAuthLoading } = useAuthContext();

  useEffect(() => {
    if (!isAuthLoading && !isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router, isAuthLoading]);

  if (isAuthLoading) {
    return null;
  }

  return (
    <MonthContextProvider>
      <Timeline />
    </MonthContextProvider>
  );
}
