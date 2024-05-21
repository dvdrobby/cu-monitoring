import { z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters"
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters"
    }),
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1086700795.
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
    confirmPassword: z.string().min(6)
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
      });
    }
  });
