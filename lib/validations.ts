import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export const signUpSchema = z.object({
  username: z.string().min(1, "Please enter a username."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter a password."),
});
