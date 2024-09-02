import { cn } from "~/utils";

interface ButtonProps {
  name: string;
  callback?: () => void;
  classes?: string;
}

export function Button(props: ButtonProps) {
  const { name, callback, classes } = props;

  function noop() {}

  return (
    <button
      onClick={callback || noop}
      className={cn(
        "h-10 rounded-md bg-zinc-800 px-5 text-zinc-50",
        classes || "",
      )}
    >
      {name}
    </button>
  );
}
