import { useEffect } from "react";
import Link from "next/link";

import { LoginForm } from "../LoginForm";
import { useAuth } from "~/hooks";
import { useRouter } from "next/router";

export function Login() {
  const router = useRouter();

  // const { isAuth } = useAuth();

  // useEffect(() => {
  //   if (isAuth) {
  //     router.replace("/");
  //   }
  // }, [isAuth]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-center font-semibold">👋 Hey there!</h2>
      </div>

      <div>
        <div className="mb-6">
          <LoginForm />
        </div>

        <div className="space-x-1 text-center">
          <span>Don't have an account yet?</span>
          <Link
            href="/register"
            className="underline underline-offset-2 hover:no-underline hover:opacity-50"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
