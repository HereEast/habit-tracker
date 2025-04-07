import { Outlet, useParams } from "react-router-dom";

import { useAuthContext } from "~/hooks";
import { NotFound } from "./NotFound";

export function Dashboard() {
  const { slug } = useParams();

  const { user, isLoading } = useAuthContext();

  if (user && user.username !== slug) {
    return <NotFound />;
  }

  return !isLoading && <Outlet />;
}
