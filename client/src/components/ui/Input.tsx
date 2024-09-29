import { ChangeEvent } from "react";
import { cn } from "~/utils";

interface InputProps {
  name: string;
  value?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  classes?: string;
}

export function Input(props: InputProps) {
  const { name, value, placeholder, onChange, classes } = props;

  return (
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={cn("h-10 w-full rounded-md border px-4", classes || "")}
    />
  );
}
