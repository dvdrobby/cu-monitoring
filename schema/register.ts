import { z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters"
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
    confirmPassword: z.string().min(6),
    is_admin: z.boolean(),
    is_superuser:z.boolean()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
      });
    }
  });
