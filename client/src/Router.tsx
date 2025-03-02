import { Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { TimelinePage } from "./pages/TimelinePage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./components/Layout";

import { ROUTE } from "./utils/constants";
import { AuthProvider } from "./providers/AuthProvider";

export function Router() {
  return (
    <Routes>
      <Route path={ROUTE.home} element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path=":slug">
          <Route element={<AuthProvider />}>
            <Route index element={<TimelinePage />} />
          </Route>
        </Route>

        <Route path={ROUTE.login} element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
