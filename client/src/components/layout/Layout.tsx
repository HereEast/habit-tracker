import { Outlet, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { ErrorFallback } from "../ErrorFallback";

export function Layout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col bg-stone-300">
      <Header />

      <main className="mt-16 grow px-3 sm:px-10">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => navigate("/")}
        >
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
