import { ReactNode } from "react";

interface FormErrorMessageProps {
  children: ReactNode;
}

export function FormErrorMessage({ children }: FormErrorMessageProps) {
  return (
    <div className="mt-2 mb-4">
      <p className="text-sm text-red-600">{children}</p>
    </div>
  );
}
