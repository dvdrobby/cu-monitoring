"use server"

import { prisma } from "@/utils/conn";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const body = await req.json()

        const {
            name,
            desc,
            options
        } =  body
       

        const unit = await prisma.customField.create({
            data: {
                name,
                desc,
                options
            }
        })
        return NextResponse.json(unit)
    }catch(error){
        console.log("CUSTOM_FIELD POST ERROR:", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
