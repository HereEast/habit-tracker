import { useRouter } from "next/router";
import { useEffect } from "react";

import { CreateAccountForm } from "~/components/CreateAccountForm";

export default function LoginPage() {
  const router = useRouter();

  const isAuthenticated = false;
  const slug = "hereeast";

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`/${slug}`);
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-center font-semibold">Create Account</h2>
      </div>

      <CreateAccountForm />
    </div>
  );
}
