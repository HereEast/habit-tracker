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
  size?: "base" | "md";
  variant?: "primary" | "secondary";
}

const styles = {
  size: {
    md: "h-12 px-10",
    base: "px-4 h-10",
    sm: "",
  },
  variant: {
    primary: "bg-brown-900 text-stone-50 hover:opacity-90",
    secondary: "bg-brown-300 text-stone-900 hover:opacity-90",
  },
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ onClick, className, ...rest }, ref) => {
  const classes = cn(
    "group/button inline-flex items-center outline-none relative justify-center leading-none w-fit transition text-lg",
    styles.variant.primary,
    styles.size.base,
    rest.size && styles.size[rest.size],
    rest.variant && styles.variant[rest.variant],
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
