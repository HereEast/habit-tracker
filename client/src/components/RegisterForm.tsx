import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateUser } from "~/hooks/mutations/useCreateUser";
import { Button, Input } from "./ui";
import { FormErrorMessage } from "./FormErrorMessage";
import { isValidPassword } from "~/utils/helpers";

const RegisterSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
  username: z.string().nonempty("Username is required."),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, { message: "Password must include at least 8 characters." })
    .refine(isValidPassword, {
      message: "Password must include A-Z, a-z, 0-9, and a special symbol.",
    }),
});

type FormInputs = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate } = useCreateUser();

  // Submit
  async function onSubmit(data: FormInputs) {
    mutate(data, {
      onError: (err) => {
        setError("root", { message: err.message });
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
      <div className="mb-6 space-y-2">
        <div>
          <Input
            placeholder="Email"
            disabled={isSubmitting}
            className="h-14 text-lg"
            {...register("email")}
          />

          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </div>

        <div>
          <Input
            placeholder="Username"
            disabled={isSubmitting}
            {...register("username")}
            className="h-14 text-lg"
          />

          {errors.username && (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            disabled={isSubmitting}
            {...register("password")}
            className="h-14 text-lg"
          />
        </div>

        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </div>

      {errors.root && (
        <FormErrorMessage>{errors.root.message}</FormErrorMessage>
      )}

      <Button disabled={isSubmitting} size="md" className="w-full">
        Create Account ➝
      </Button>
    </form>
  );
}
