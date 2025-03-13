import { ChangeEvent, FormEvent, useState } from "react";

import { useLogin } from "~/hooks/mutations/useLogin";
import { Button } from "./ui/Button";

export function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });

  const { mutate } = useLogin();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // Submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate(user);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
      <div className="mb-6 space-y-2">
        <input
          name="email"
          value={user.email}
          placeholder="Email"
          required
          onChange={handleChange}
          className="h-10 w-full border px-4"
        />

        <input
          name="password"
          value={user.password}
          placeholder="Password"
          required
          onChange={handleChange}
          className="h-10 w-full border px-4"
        />
      </div>

      <Button size="md">Login</Button>
    </form>
  );
}
