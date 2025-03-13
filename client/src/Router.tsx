import { Route, Routes } from "react-router-dom";

import { Home } from "./components/layout/Home";
import { Timeline } from "./components/layout/Timeline";
import { Login } from "./components/layout/Login";
import { Register } from "./components/layout/Register";
import { Layout } from "./components/layout/Layout";
import { RestrictedRoute } from "./components/layout/RestrictedRoute";

import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { ROUTE } from "./utils/constants";

export function Router() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path={ROUTE.home} element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<RestrictedRoute redirectLink={ROUTE.login} />}>
            <Route path=":slug">
              <Route index element={<Timeline />} />
            </Route>
          </Route>

          <Route element={<RestrictedRoute requireAuth={false} />}>
            <Route path={ROUTE.login} element={<Login />} />
            <Route path={ROUTE.register} element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}
