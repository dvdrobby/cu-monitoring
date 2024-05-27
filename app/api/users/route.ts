"use server"

import { isAdmin } from "@/utils/cek-user";
import { prisma } from "@/utils/conn";
import { NextResponse } from "next/server";

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

        isAdmin(username)
        const admin = await prisma.user.findFirst({
            where:{
                role
            }
        })

        if(!admin){
            return new NextResponse("Unauthorized Action", {status:401})
        }

        

        // const user = await prisma.user.create({
        //     data: {
        //         username,
        //         email,
        //         name,
        //         password
        //     }
        // })
        return NextResponse.json(admin)
    }catch(error){
        console.log("REGISTER_POST", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}