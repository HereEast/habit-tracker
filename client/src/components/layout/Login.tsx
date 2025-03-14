import { Link } from "react-router-dom";

import { LoginForm } from "~/components/LoginForm";
import { ROUTE } from "~/utils/constants";

export function Login() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="bg-brown-100 w-fit max-w-[480px] p-10">
        <div className="mb-10">
          <h2 className="text-brown-900 text-center text-4xl font-semibold">
            👋 Hey there!
          </h2>
        </div>

        <div>
          <div className="mb-8">
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
    </div>
  );
}
