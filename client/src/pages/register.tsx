import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { RegisterForm } from "~/components/RegisterForm";

export default function RegisterPage() {
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
        <h2 className="text-center font-semibold">Register, please 😊</h2>
      </div>

      <div>
        <div className="mb-6">
          <RegisterForm />
        </div>

        <div className="space-x-1 text-center">
          <span>Been there already?</span>
          <Link
            href="/login"
            className="underline underline-offset-2 hover:no-underline hover:opacity-50"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
