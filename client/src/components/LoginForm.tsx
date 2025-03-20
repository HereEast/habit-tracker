import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, Input, PasswordViewToggle } from "./ui";
import { FormErrorMessage } from "./FormErrorMessage";

import { capitalize, cn } from "~/utils/helpers";
import { LoginSchema } from "~/utils/schemas";
import { useLogin } from "~/hooks";

type FormInputs = z.infer<typeof LoginSchema>;
type InputName = keyof FormInputs;

const INPUTS = ["email", "password"] as InputName[];

export function LoginForm() {
  const [isHidden, setIsHidden] = useState(true);

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
        {INPUTS.map((inputName) => (
          <div className="relative" key={inputName}>
            <Input
              type={inputName === "password" && isHidden ? "password" : "text"}
              placeholder={capitalize(inputName)}
              disabled={isSubmitting}
              className={cn("h-14", inputName === "password" && "pr-14")}
              {...register(inputName)}
            />

            {inputName === "password" && (
              <PasswordViewToggle
                isHidden={isHidden}
                toggleView={() => setIsHidden((prev) => !prev)}
              />
            )}

            {errors[inputName] && (
              <FormErrorMessage>{errors[inputName].message}</FormErrorMessage>
            )}
          </div>
        ))}
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
