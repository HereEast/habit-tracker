import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { Button, Input } from "~/components/ui";

import { login } from "~/api/users";
import { useAuthContext } from "~/hooks";

// Login
export function Login() {
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

// Login form
export function LoginForm() {
  const router = useRouter();

  const { setIsAuth } = useAuthContext();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Login
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const token = await login(email, password);

      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // To update Header
        setIsAuth(true);

        const decodedUser = jwt.decode(token) as JwtPayload;

        if (decodedUser) {
          router.replace(`/${decodedUser.username}`);
        }
      }
    } catch (err) {
      // Err if username exists
      // Err if email exists
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex w-80 flex-col gap-2">
        <Input
          name="email"
          value={email}
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          name="password"
          value={password}
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button classes="w-full">Login</Button>
    </form>
  );
}
