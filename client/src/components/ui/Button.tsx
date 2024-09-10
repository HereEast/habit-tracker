import { ReactNode } from "react";

import { cn } from "~/utils";

interface ButtonProps {
  children: ReactNode;
  classes?: string;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  const { children, onClick, classes } = props;

  function noop() {}

  return (
    <button
      onClick={onClick || noop}
      className={cn(
        "h-10 rounded-md bg-zinc-800 px-5 text-zinc-50",
        classes || "",
      )}
    >
      {children}
    </button>
  );
}
