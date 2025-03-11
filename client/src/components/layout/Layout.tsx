import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="flex h-full flex-col bg-stone-300">
      <Header />

      <main className="mt-16 grow px-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
