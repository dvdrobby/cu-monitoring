import NextAuth from "next-auth";

declare module "next-auth"{
    interface Session{
        user:{
            id:number,
            username:string,
            email:string,
            name:string,
            role:string,
            accessToken: string
        }
    }
}