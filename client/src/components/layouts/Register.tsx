import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";

import { createUser } from "~/api/users";

// Register
export function Register() {
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

// Register Form
export function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const user = await createUser(username, email, password);

      if (user) {
        router.replace(`/${user?.username}`);
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
          name="username"
          value={username}
          required
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

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

      <Button classes="w-full">Create Account</Button>
    </form>
  );
}
