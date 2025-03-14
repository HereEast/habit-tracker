import { ChangeEvent, FocusEvent, forwardRef, Ref } from "react";

import { cn } from "~/utils/helpers";

interface InputProps {
  value: string;
  name: string;
  disabled?: boolean;
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
          "border-brown-400 placeholder:text-brown-500 focus:border-brown-900 h-10 w-full border px-4 outline-0",
          className,
        )}
        onChange={onChange}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
