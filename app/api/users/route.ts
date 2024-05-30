"use server"

import { auth } from "@/auth";
import { isAdmin } from "@/utils/cek-user";
import { prisma } from "@/utils/conn";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs"

export async function POST(req: Request){
    try{
        const body = await req.json()

        const {
            username,
            name,
            email,
            password,
            role
        } =  body
       
        // const session = await auth()
        const hashedPassword = bcrypt.hashSync(password, 10)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                name,
                password: hashedPassword
            }
        })
        return NextResponse.json(user)
    }catch(error){
        console.log("REGISTER_POST", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}