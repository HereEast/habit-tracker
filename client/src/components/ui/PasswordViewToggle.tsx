import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";

interface PasswordViewButtonProps {
  isHidden: boolean;
  toggleView: () => void;
}

export function PasswordViewToggle({
  isHidden,
  toggleView,
}: PasswordViewButtonProps) {
  return (
    <Button
      type="button"
      size="icon"
      className="hover:bg-brown-900/10 text-brown-900 absolute top-2 right-2 bg-transparent p-0"
      onClick={toggleView}
    >
      {isHidden ? (
        <EyeSlashIcon className="size-5" />
      ) : (
        <EyeIcon className="size-5" />
      )}
    </Button>
  );
}
