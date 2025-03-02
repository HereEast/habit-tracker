import { Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { TimelinePage } from "./pages/TimelinePage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./components/Layout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path=":slug">
          <Route index element={<TimelinePage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
