import { Dashboard, AuthLayout } from "~/components/layouts";
import { MonthContextProvider } from "~/context";

export default function DashboardPage() {
  return (
    <AuthLayout>
      <MonthContextProvider>
        <Dashboard />
      </MonthContextProvider>
    </AuthLayout>
  );
}
