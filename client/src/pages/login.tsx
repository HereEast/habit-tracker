import { useRouter } from "next/router";
import { useEffect } from "react";

import { Layout } from "~/components/layouts";

export default function LoginPage() {
  const router = useRouter();

  const isAuthenticated = true;
  const slug = "hereeast";

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`/${slug}`);
    }
  }, [isAuthenticated, router]);

  return (
    <Layout>
      <div>Login</div>
    </Layout>
  );
}
