import { z } from "zod";

const emailValidation = z.string().email({ message: "Invalid email format" });
const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
  .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
  .regex(/\d/, { message: "Password must include a number" })
  .regex(/[@$!%*?&]/, { message: "Password must include a special character" });


//# Signup validation schema

export const signupValidation = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: emailValidation,
  password: passwordValidation,
});


//# Login validation schema

export const loginValidation = z.object({
  email: emailValidation,
  password: passwordValidation,
});


//# Update profile validation schema

export const updateProfileValidation = z.object({
  firstName: z.string().min(1).or(z.literal("")).optional(),
  lastName: z.string().min(1).or(z.literal("")).optional(),
  email: emailValidation.optional(),
});
