import { z } from "zod";

import { isValidPassword } from "~/utils/helpers";

export const RegisterSchema = z.object({
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

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().nonempty("Password is required."),
});
