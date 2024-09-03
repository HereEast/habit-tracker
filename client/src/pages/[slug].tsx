import { Layout, Dashboard } from "~/components/layouts";
import { AuthRedirect } from "~/components/layouts/AuthRedirect";

export default function DashboardPage() {
  return (
    <AuthRedirect>
      <Layout>
        <Dashboard />
      </Layout>
    </AuthRedirect>
  );
}
