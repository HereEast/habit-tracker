import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "../ui/Button";
import { useAuth } from "~/hooks";

export function Header() {
  const router = useRouter();

  // const { setIsAuth } = useAuth();

  function handleLogout() {
    // setIsAuth(null);

    localStorage.removeItem("token");
    router.replace("/");
  }
  return (
    <div className="fixed flex h-16 w-full items-center justify-between bg-stone-300 px-10">
      <h1 className="font-medium">Habit Tracker</h1>
      <div className="flex items-center gap-2">
        <div className="space-x-2">
          <Link href="/login">
            <Button>Log in</Button>
          </Link>

          <Button onClick={handleLogout}>Log out</Button>
        </div>

        {/* <span className="text-sm font-medium">👋 hereeast</span> */}
      </div>
    </div>
  );
}
