import { ReactNode } from "react";

import { cn } from "~/utils/handlers";

interface ButtonProps {
  children: ReactNode;
  classes?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  const { children, onClick, disabled, classes } = props;

  function noop() {}

  return (
    <button
      onClick={onClick || noop}
      disabled={disabled}
      className={cn(
        "h-10 rounded-md bg-zinc-800 px-5 text-zinc-50",
        classes || "",
      )}
    >
      {children}
    </button>
  );
}
