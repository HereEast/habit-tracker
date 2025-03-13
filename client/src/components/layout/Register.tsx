import { Link } from "react-router-dom";

import { RegisterForm } from "~/components/RegisterForm";
import { ROUTE } from "~/utils/constants";

export function Register() {
  return (
    <div className="mt-10">
      <div className="mb-6">
        <h2 className="text-center font-semibold">Register, please 😊</h2>
      </div>

      <div>
        <div className="mb-6">
          <RegisterForm />
        </div>

        <div className="space-x-1 text-center">
          <span>Already been here?</span>
          <Link
            to={ROUTE.login}
            className="underline underline-offset-2 hover:no-underline hover:opacity-50"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
