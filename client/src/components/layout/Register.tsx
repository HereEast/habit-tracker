import { Link } from "react-router-dom";

import { RegisterForm } from "~/components/RegisterForm";
import { ROUTE } from "~/utils/constants";

export function Register() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="bg-brown-100 w-fit max-w-[480px] p-10">
        <div className="mb-10">
          <h2 className="text-brown-900 text-center text-4xl font-semibold">
            Register, pls 😊
          </h2>
        </div>

        <div>
          <div className="mb-8">
            <RegisterForm />
          </div>

          <div className="space-x-1 text-center">
            <span>Have you already been here?</span>
            <Link
              to={ROUTE.login}
              className="underline underline-offset-2 hover:no-underline hover:opacity-50"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
