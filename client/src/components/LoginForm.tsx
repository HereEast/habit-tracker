import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, Input } from "./ui";
import { FormErrorMessage } from "./FormErrorMessage";
import { useLogin } from "~/hooks";

const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().nonempty("Password is required."),
});

type FormInputs = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate } = useLogin();

  // Submit
  async function onSubmit(data: FormInputs) {
    mutate(data, {
      onError: (err) => {
        setError("root", { message: err.message });
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 space-y-2">
        <div>
          <Input
            placeholder="Email"
            disabled={isSubmitting}
            className="h-14"
            {...register("email")}
          />

          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            disabled={isSubmitting}
            className="h-14"
            {...register("password")}
          />

          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </div>
      </div>

      {errors.root && (
        <FormErrorMessage>{errors.root.message}</FormErrorMessage>
      )}

      <Button disabled={isSubmitting} size="md" className="w-full">
        Get in to account ➝
      </Button>
    </form>
  );
}
