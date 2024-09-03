import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24">
      {children}
    </main>
  );
}
