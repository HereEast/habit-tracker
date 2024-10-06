import { Timeline, AuthLayout } from "~/components/layouts";
import { MonthContextProvider } from "~/context";

export default function TimelinePage() {
  return (
    <AuthLayout>
      <MonthContextProvider>
        <Timeline />
      </MonthContextProvider>
    </AuthLayout>
  );
}
