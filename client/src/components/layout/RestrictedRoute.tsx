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
  const { user, isLoading } = useAuthContext();

  if (!isLoading && !user && requireAuth) {
    return <Navigate to={redirectLink || ""} replace />;
  }

  if (!isLoading && user && !requireAuth) {
    return <Navigate to={ROUTE.home} replace />;
  }

  return <Outlet />;
}
