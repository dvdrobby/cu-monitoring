import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const body = await req.json()
        return NextResponse.json(body)
    }catch(error){
        console.log("REGISTER_POST", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}