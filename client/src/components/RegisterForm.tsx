export function RegisterForm() {
  return (
    <form className="mx-auto max-w-[400px]">
      <div className="mb-6 space-y-2">
        <input
          name="email"
          value=""
          placeholder="Email"
          required={true}
          onChange={(e) => console.log("")}
          className="h-10 w-full rounded-md border px-4"
        />

        <input
          name="username"
          value=""
          placeholder="Username"
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
        Create Account
      </button>
    </form>
  );
}
