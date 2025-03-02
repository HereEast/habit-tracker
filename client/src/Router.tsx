import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Timeline } from "./pages/Timeline";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";

import { ROUTE } from "./utils/constants";
import { AuthProvider } from "./providers/AuthProvider";

export function Router() {
  return (
    <Routes>
      <Route path={ROUTE.home} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path=":slug">
          <Route element={<AuthProvider />}>
            <Route index element={<Timeline />} />
          </Route>
        </Route>

        <Route path={ROUTE.login} element={<Login />} />
      </Route>
    </Routes>
  );
}
