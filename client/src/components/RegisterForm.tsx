import { ChangeEvent, FormEvent, useState } from "react";

import { useCreateUser } from "~/hooks/mutations/useCreateUser";
import { Button, Input } from "./ui";

const defaultValue = { email: "", username: "", password: "" };

export function RegisterForm() {
  const [user, setUser] = useState(defaultValue);

  const { mutate, error } = useCreateUser();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // Submit
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user.email || !user.username || !user.password) {
      return;
    }

    mutate(user);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
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
          name="username"
          value={user.username}
          placeholder="Username"
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

      {error && (
        <div className="mb-6 text-center text-red-600">{error.message}</div>
      )}

      <Button size="md" className="w-full">
        Create Account ➝
      </Button>
    </form>
  );
}
