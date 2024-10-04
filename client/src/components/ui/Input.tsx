import { ChangeEvent } from "react";
import { cn } from "~/utils";

interface InputProps {
  name: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  classes?: string;
}

export function Input(props: InputProps) {
  return (
    <input
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      required={props.required || false}
      onChange={props.onChange}
      className={cn("h-10 w-full rounded-md border px-4", props.classes || "")}
    />
  );
}
