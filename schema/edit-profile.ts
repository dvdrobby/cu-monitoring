import { z } from "zod"

export const editProfileSchema = z.object({
    username: z.string(),
    name: z.string(),
    email: z.string()
})
