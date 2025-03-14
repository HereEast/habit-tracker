import { ChangeEvent, FormEvent, useState } from "react";

import { useLogin } from "~/hooks/mutations/useLogin";
import { Button, Input } from "./ui";

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
    <form onSubmit={handleSubmit}>
      <div className="mb-6 space-y-2">
        <Input
          name="email"
          value={user.email}
          placeholder="Email"
          required
          onChange={handleChange}
          className="h-14 text-lg"
        />

        <Input
          name="password"
          value={user.password}
          placeholder="Password"
          required
          onChange={handleChange}
          className="h-14 text-lg"
        />
      </div>

      <Button size="md" className="w-full">
        Get in to account ➝
      </Button>
    </form>
  );
}
