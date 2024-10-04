import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";

import { useAppContext } from "~/hooks";
import { createUser } from "~/api/users";

export function CreateAccountForm() {
  const router = useRouter();

  const { setUserId } = useAppContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const user = await createUser(username, email, password);

      console.log(user);

      if (user) {
        setUserId(user?._id);
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
