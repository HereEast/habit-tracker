import { ChangeEvent, FocusEvent, forwardRef, Ref } from "react";

import { cn } from "~/utils/helpers";

interface InputProps {
  value?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?: "text" | "password";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, className, ...rest }, ref) => {
    return (
      <input
        ref={ref as Ref<HTMLInputElement>}
        className={cn(
          "border-brown-400 placeholder:text-brown-500/75 focus:border-brown-900 h-10 w-full rounded-md border px-5 outline-0",
          className,
        )}
        onChange={onChange}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
