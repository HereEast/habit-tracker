import { useAuthContext } from "~/hooks";
import { Button } from "../ui";

export function NotFound() {
  const { user } = useAuthContext();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6">
      <p className="text-center text-lg">Page not found. Sorry 🥴🥴🥴</p>
      <Button to={`/${user?.username}`}>Go to Dashboard</Button>
    </div>
  );
}
