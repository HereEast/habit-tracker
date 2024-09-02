import { cn } from "~/utils";

interface ButtonProps {
  name: string;
  onClick?: () => void;
  classes?: string;
}

export function Button(props: ButtonProps) {
  const { name, onClick, classes } = props;

  function noop() {}

  return (
    <button
      onClick={onClick || noop}
      className={cn(
        "h-10 rounded-md bg-zinc-800 px-5 text-zinc-50",
        classes || "",
      )}
    >
      {name}
    </button>
  );
}
