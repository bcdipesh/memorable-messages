import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Please enter your username."),
  password: z
    .string()
    .min(1, "Please enter your password."),
});

loginFormSchema.required();
