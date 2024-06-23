"use server"

import { prisma } from "@/utils/conn";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const body = await req.json()

        const {
            name,
            kolom
        } =  body
        

        const logsheet = await prisma.logsheet.create({
            data: {
                name,
                kolom
            }
        })
        return NextResponse.json(logsheet)
    }catch(error){
        console.log("LOGSHEET POST ERROR:", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
