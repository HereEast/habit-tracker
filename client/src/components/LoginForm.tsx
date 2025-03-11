export function LoginForm() {
  // const router = useRouter();

  // const { setIsAuth } = useAuthContext();

  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");

  // // Login
  // async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   try {
  //     const token = await login(email, password);

  //     if (token) {
  //       localStorage.setItem("token", token);
  //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //       // To update Header
  //       setIsAuth(true);

  //       const decodedUser = jwt.decode(token) as JwtPayload;

  //       if (decodedUser) {
  //         router.replace(`/${decodedUser.username}`);
  //       }
  //     }
  //   } catch (err) {
  //     // Err if username exists
  //     // Err if email exists
  //     console.log(err);
  //   }
  // }

  return (
    <form className="mx-auto max-w-[400px]">
      <div className="mb-6 space-y-2">
        <input
          name="email"
          value=""
          placeholder="Email or username"
          required={true}
          onChange={(e) => console.log("")}
          className="h-10 w-full rounded-md border px-4"
        />

        <input
          name="password"
          value=""
          placeholder="Password"
          required={true}
          onChange={(e) => console.log("")}
          className="h-10 w-full rounded-md border px-4"
        />
      </div>

      <button className="h-10 w-full rounded-md bg-zinc-800 px-5 text-zinc-50">
        Create
      </button>
    </form>
  );
}
