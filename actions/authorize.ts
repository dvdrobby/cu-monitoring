"use server"

import { signIn } from "@/auth";
import { loginSchema } from "@/schema/login";
import { AuthError } from "next-auth";
import { z } from "zod";

export const authorize =async (values: z.infer<typeof loginSchema> ) => {
    const validatedValues = loginSchema.safeParse(values)

    if(!validatedValues.success) return {error: "Invalid Fields"}

    const { username, password } = validatedValues.data

    try{
        await signIn('credentials',
            {
                username,
                password,
                redirectTo: undefined
            }
        )
    }catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Username atau Password salah"}
                default:
                    return {error: "Something went wrong"}
            }
        }
    throw error
    }
}