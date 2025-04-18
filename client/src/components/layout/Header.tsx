import { Link } from "react-router-dom";

import { Button } from "../ui/Button";

import { useAuthContext } from "~/hooks";
import { ROUTE } from "~/utils/constants";

export function Header() {
  const { user, isLoading, signOut } = useAuthContext();

  const isUser = !isLoading && user;

  return (
    <div className="fixed flex h-16 w-full items-center justify-between px-3 sm:px-10">
      <h1 className="font-medium hover:opacity-50">
        <Link to={ROUTE.home}>Habit Tracker</Link>
      </h1>
      <div className="flex items-center gap-2">
        {!isUser && <Button to={ROUTE.login}>Login</Button>}

        {isUser && (
          <div className="flex items-center gap-4">
            <span className="shrink-0 text-sm font-medium">
              👋 {user.username}
            </span>
            <Button onClick={signOut}>Log out</Button>
          </div>
        )}
      </div>
    </div>
  );
}
