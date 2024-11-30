import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username cannot be more than 20 characters" })
    .trim(),
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(20, { message: "Full name cannot be more than 20 characters" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const SigninFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username cannot be more than 20 characters" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
