"use server"

import { prisma } from "@/utils/conn"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, params:{params:{id:string}} ){
    try{
        const id = params.params.id
        const res = await prisma.unit.delete({
            where:{
                id:parseInt(id)
            }
        })
        return NextResponse.json(res)
    }catch(error){
        return new NextResponse("Internal Server Error", {status:500})
    }
}

export async function PATCH (req: Request, params: {params: {id:string}}){
    try{
        const body = await req.json()
        const id = params.params.id
        const res = await prisma.unit.update({
            where: {
                id:parseInt(id)
            },
            data:{
                name: body.name
            }
        })
        return NextResponse.json(res)
    }catch(error){
        return new NextResponse("Internal Server Error", {status:500})
    }
}