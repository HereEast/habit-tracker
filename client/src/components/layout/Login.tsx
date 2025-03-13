import { Link } from "react-router-dom";

import { LoginForm } from "~/components/LoginForm";
import { ROUTE } from "~/utils/constants";

export function Login() {
  return (
    <div className="mt-10">
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
            to={ROUTE.register}
            className="underline underline-offset-2 hover:no-underline hover:opacity-50"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
