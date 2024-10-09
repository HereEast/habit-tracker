import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "../ui/Button";
import { useAuthContext } from "~/hooks";

export function Header() {
  const router = useRouter();

  const { user, isAuth, setIsAuth } = useAuthContext();

  // Log out
  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuth(false);

    router.replace("/");
  }

  return (
    <div className="fixed flex h-16 w-full items-center justify-between bg-stone-300 px-10">
      <h1 className="font-medium hover:opacity-50">
        <Link href="/">Habit Tracker</Link>
      </h1>
      <div className="flex items-center gap-2">
        <div>
          {isAuth ? (
            <div className="flex items-center gap-4">
              {user && <span className="text-sm font-medium">👋 {user}</span>}
              <Button onClick={handleLogout}>Log out</Button>
            </div>
          ) : (
            <Link href="/login">
              <Button>Log in</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
