import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "../ui/Button";
import { useAuthContext } from "~/hooks";

export function Header() {
  const router = useRouter();

  const { isAuth, setIsAuth } = useAuthContext();

  // Log out
  function handleLogout() {
    setIsAuth(false);

    router.replace("/");
    localStorage.removeItem("token");
  }

  return (
    <div className="fixed flex h-16 w-full items-center justify-between bg-stone-300 px-10">
      <h1 className="font-medium">Habit Tracker</h1>
      <div className="flex items-center gap-2">
        <div>
          {isAuth ? (
            <Button onClick={handleLogout}>Log out</Button>
          ) : (
            <Link href="/login">
              <Button>Log in</Button>
            </Link>
          )}
        </div>

        {/* <span className="text-sm font-medium">👋 hereeast</span> */}
      </div>
    </div>
  );
}
