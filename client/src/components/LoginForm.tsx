import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";

import { login } from "~/api/users";

export function LoginForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const user = await login(email, password);

      console.log(user);

      // if (user) {
      //   router.replace(`/${user?.username}`);
      // }
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
