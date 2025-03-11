import { ChangeEvent, FormEvent, useState } from "react";
import { useLogin } from "~/hooks/mutations/useCreateUser";

export function LoginForm() {
  // const router = useRouter();

  // const { setIsAuth } = useAuthContext();

  const [user, setUser] = useState({ email: "", password: "" });

  const { mutate } = useLogin();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // Submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate(user);

    // try {
    //   const token = await login(email, password);

    //   if (token) {
    //     localStorage.setItem("token", token);
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    //     // To update Header
    //     setIsAuth(true);

    //     const decodedUser = jwt.decode(token) as JwtPayload;

    //     if (decodedUser) {
    //       router.replace(`/${decodedUser.username}`);
    //     }
    //   }
    // } catch (err) {
    //   // Err if username exists
    //   // Err if email exists
    //   console.log(err);
    // }
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
          name="password"
          value={user.password}
          placeholder="Password"
          required
          onChange={handleChange}
          className="h-10 w-full rounded-md border px-4"
        />
      </div>

      <button className="h-10 w-full rounded-md bg-zinc-800 px-5 text-zinc-50">
        Login
      </button>
    </form>
  );
}
