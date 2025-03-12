import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "~/hooks/useAuthContext";
import { ROUTE } from "~/utils/constants";

interface ProtectedRouteProps {
  redirectLink?: string;
  requireAuth?: boolean;
}

export function RestrictedRoute({
  redirectLink,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user } = useAuthContext();

  if (requireAuth && !user) {
    return <Navigate to={redirectLink} replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to={ROUTE.home} replace />;
  }

  return <Outlet />;
}
