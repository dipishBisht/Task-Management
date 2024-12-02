"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidation = exports.loginValidation = exports.signupValidation = void 0;
const zod_1 = require("zod");
const emailValidation = zod_1.z.string().email({ message: "Invalid email format" });
const passwordValidation = zod_1.z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/\d/, { message: "Password must include a number" })
    .regex(/[@$!%*?&]/, { message: "Password must include a special character" });
//# Signup validation schema
exports.signupValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: "First name is required" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: emailValidation,
    password: passwordValidation,
});
//# Login validation schema
exports.loginValidation = zod_1.z.object({
    email: emailValidation,
    password: passwordValidation,
});
//# Update profile validation schema
exports.updateProfileValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(1).or(zod_1.z.literal("")).optional(),
    lastName: zod_1.z.string().min(1).or(zod_1.z.literal("")).optional(),
    email: emailValidation.optional(),
});
