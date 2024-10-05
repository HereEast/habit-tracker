import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { RegisterForm } from "../RegisterForm";
import { useAuth } from "~/hooks";

export function Register() {
  const router = useRouter();

  // const { isAuth } = useAuth();

  // useEffect(() => {
  //   if (isAuth) {
  //     router.replace("/");
  //   }
  // }, [isAuth, router]);

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
