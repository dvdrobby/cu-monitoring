import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/utils/conn"

export const {
  handlers,
  auth,
  signIn,
  signOut

} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt'},
  callbacks:{
    async jwt({ token, user }){
      if(user){
        return {
          ...token, 
          id:user.id,
          username: user.username,
          role: user.role,
        }
      }
      return token
    },
    async session({ session, token}){
        return {
          ...session,
          user:{
            ...session.user,
            id:token.id,
            username:token.username,
            role:token.role
          }
        }
    }
  },
  ...authConfig,
})