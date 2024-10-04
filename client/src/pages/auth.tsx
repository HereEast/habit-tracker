import { useRouter } from "next/router";
import { useEffect } from "react";

import { CreateAccountForm } from "~/components/CreateAccountForm";
import { LoginForm } from "~/components/LoginForm";

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

      <div className="space-y-10">
        <CreateAccountForm />

        <LoginForm />
      </div>
    </div>
  );
}
