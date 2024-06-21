"use server"

import { prisma } from "@/utils/conn";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const body = await req.json()

        const {
            name,
            symbol
        } =  body
       

        const unit = await prisma.unit.create({
            data: {
                name,
                symbol
            }
        })
        return NextResponse.json(unit)
    }catch(error){
        console.log("UNIT_POST", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
