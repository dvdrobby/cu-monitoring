import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { loginSchema } from "./schema/login"
import { getUser } from "./utils/cek-user"
import bcrypt from "bcryptjs"
 
export default { 
    providers: [
        Credentials({
            async authorize(credentials){
                const validatedFields = loginSchema.safeParse(credentials)

                if(validatedFields.success){
                    const { username, password } = validatedFields.data

                    const user = await getUser(username)

                    if(!user) return null
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    )

                    if(passwordMatch)return user
                }
                return null
            }
        })
    ] 
} satisfies NextAuthConfig