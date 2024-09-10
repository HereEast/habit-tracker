import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center bg-stone-400/50 p-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
