"use server";

import { loginSchema, signUpSchema } from "./validations";
import { z } from "zod";
import prisma from "./db";
import bcrypt from "bcryptjs";

export async function signUp(formData: z.infer<typeof signUpSchema>) {
  const validatedFields = signUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    console.log(
      "There was an error validating fields",
      validatedFields.error.flatten().fieldErrors,
    );
  }

  const { username, email, password } = validatedFields.data;
  let passwordHash: string = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function authenticate(formData: z.infer<typeof loginSchema>) {}
