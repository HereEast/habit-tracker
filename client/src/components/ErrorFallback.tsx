import { Button } from "./ui";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  console.log({ error: error.message });

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6">
      <p className="text-center text-lg">
        Ooops!.. Something went wrong 😬😬😬
      </p>
      <Button onClick={resetErrorBoundary}>Back to Home</Button>
    </div>
  );
}
