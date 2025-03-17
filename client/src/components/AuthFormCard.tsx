import { Link } from "react-router-dom";

import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { ROUTE } from "~/utils/constants";

interface AuthFormContainerProps {
  type: "login" | "register";
}

export function AuthFormContainer({ type }: AuthFormContainerProps) {
  return (
    <div className="mt-10 flex justify-center">
      <div className="bg-brown-100 w-full max-w-[480px] rounded-xl p-10">
        <div className="mb-10">
          <h2 className="text-brown-900 text-center text-5xl font-medium">
            {type === "login" ? "👋 Hey there!" : "Register, pls 😊"}
          </h2>
        </div>

        <div>
          <div className="mb-8">
            {type === "login" ? <LoginForm /> : <RegisterForm />}
          </div>

          <div className="space-x-1 text-center">
            <AuthFormFooter type={type} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Card footer
function AuthFormFooter({ type }: AuthFormContainerProps) {
  return (
    <>
      <span>
        {type === "login"
          ? "Don't have an account yet?"
          : "Have you already been here?"}
      </span>

      <Link
        to={type === "login" ? ROUTE.register : ROUTE.login}
        className="underline underline-offset-2 hover:no-underline hover:opacity-50"
      >
        {type === "login" ? "Create Account" : "Login"}
      </Link>
    </>
  );
}
