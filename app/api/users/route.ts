"use server"

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
            password
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

export async function PATCH(req: Request){
    try{
        const body =await req.json()
        
        const transaction = body.map((item: { id: string; value: any; }) => {
            return prisma.user.update({
                where:{
                    id:parseInt(item.id)
                },
                data:{
                    role: item.value
                }
            })
        })
        const result  = await prisma.$transaction(transaction)

        return NextResponse.json(result)
    }catch(error){
        console.log("UPDATE ROLE", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}