import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(2, {
        message: "Username is required"
    }),
    password: z.string().min(2, {
        message: "Password is required"
    })
})
