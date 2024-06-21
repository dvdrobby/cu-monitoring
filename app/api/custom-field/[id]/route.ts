"use server"

import { prisma } from "@/utils/conn"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, params:{params:{id:string}} ){
    try{
        const id = params.params.id
        const res = await prisma.customField.delete({
            where:{
                id:parseInt(id)
            }
        })
        return NextResponse.json(res)
    }catch(error){
        return new NextResponse("Internal Server Error", {status:500})
    }
}
