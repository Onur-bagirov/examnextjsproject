import { z } from "zod";

export const signinFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SigninFormSchema = z.infer<typeof signinFormSchema>;