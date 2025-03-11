// import { Button } from "../ui/Button";
// import { useAuthContext } from "~/hooks";

import { Link } from "react-router-dom";

export function Header() {
  const isAuth = true;

  // const { user, isAuth, setIsAuth } = useAuthContext();

  // Log out
  // function handleLogout() {
  //   localStorage.removeItem("token");
  //   setIsAuth(false);

  //   router.replace("/");
  // }

  return (
    <div className="fixed flex h-16 w-full items-center justify-between px-10">
      <h1 className="font-medium hover:opacity-50">
        <Link to="/">Habit Tracker</Link>
      </h1>
      <div className="flex items-center gap-2">
        <div>
          {isAuth ? (
            <div className="flex items-center gap-4">
              Hello 👋
              {/* {user && <span className="text-sm font-medium">👋 {user}</span>}
              <Button onClick={handleLogout}>Log out</Button> */}
            </div>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </div>
      </div>
    </div>
  );
}
