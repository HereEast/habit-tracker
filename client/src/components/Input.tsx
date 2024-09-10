import { ChangeEvent } from "react";
import { cn } from "~/utils";

interface InputProps {
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  classes?: string;
}

export function Input(props: InputProps) {
  const { name, placeholder, onChange, classes } = props;

  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={cn("h-10 w-full rounded-md border px-4", classes || "")}
    />
  );
}
