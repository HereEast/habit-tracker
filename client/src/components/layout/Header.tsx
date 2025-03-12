import { Link } from "react-router-dom";

import { useAuthContext } from "~/hooks/useAuthContext";
import { ROUTE } from "~/utils/constants";

export function Header() {
  const { user, isLoading, signOut } = useAuthContext();

  const isUser = !isLoading && user;

  return (
    <div className="fixed flex h-16 w-full items-center justify-between px-10">
      <h1 className="font-medium hover:opacity-50">
        <Link to={ROUTE.home}>Habit Tracker</Link>
      </h1>
      <div className="flex items-center gap-2">
        {!isUser && (
          <Link to={ROUTE.login} className="hover:opacity-50">
            Log in
          </Link>
        )}

        {isUser && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">👋 {user.username}</span>
            <button className="hover:opacity-50" onClick={signOut}>
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
