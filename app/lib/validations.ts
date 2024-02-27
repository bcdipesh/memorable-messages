import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Please enter your username."),
  password: z.string().min(1, "Please enter your password."),
});

export const signUpSchema = z.object({
  username: z.string().min(1, "Please enter a username."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter a password."),
});
