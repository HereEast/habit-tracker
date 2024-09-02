import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input(props: InputProps) {
  const { name, placeholder, onChange } = props;

  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="h-10 rounded-md border px-4"
    />
  );
}
