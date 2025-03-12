import { forwardRef, MouseEvent, ReactNode, Ref } from "react";
import { Link } from "react-router-dom";

import { cn } from "~/utils/helpers";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
  to?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const styles = {
  size: {
    md: "h-12 px-10",
    base: "px-6 h-10",
    sm: "",
  },
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ onClick, className, ...rest }, ref) => {
  const classes = cn(
    "group/button inline-flex items-center outline-none relative justify-center leading-none bg-brown-900 text-stone-50 w-fit py-4 px-4 transition text-sm hover:opacity-90 font-mono",
    styles.size.base,
    className,
  );

  if (rest.to) {
    return (
      <Link
        to={rest.to}
        className={classes}
        ref={ref as Ref<HTMLAnchorElement>}
      >
        {rest.children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {rest.children}
    </button>
  );
});

Button.displayName = "Button";
