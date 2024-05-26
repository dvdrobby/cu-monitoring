"use server"

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

        console.log(role)
        const admin = await prisma.user.findFirst({
            where:{
                role
            }
        })

        console.log(admin)
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