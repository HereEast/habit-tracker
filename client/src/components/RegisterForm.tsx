import { ChangeEvent, FormEvent, useState } from "react";

import { useCreateUser } from "~/hooks/mutations/useCreateUser";

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
    // setUser(defaultValue);
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
          className="h-10 w-full rounded-md border px-4"
        />

        <input
          name="username"
          value={user.username}
          placeholder="Username"
          required
          onChange={handleChange}
          className="h-10 w-full rounded-md border px-4"
        />

        <input
          name="password"
          value={user.password}
          placeholder="Password"
          required
          onChange={handleChange}
          className="h-10 w-full rounded-md border px-4"
        />
      </div>

      {error && (
        <div className="mb-6 text-center text-red-600">{error.message}</div>
      )}

      <button className="h-10 w-full cursor-pointer rounded-md bg-zinc-800 px-5 text-zinc-50 transition hover:opacity-75">
        Create Account
      </button>
    </form>
  );
}
