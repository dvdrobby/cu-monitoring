"use server"

import { prisma } from "./conn";

export async function getUserById(sessionId: any){

    const user = await prisma.user.findFirst({
        where:{
            id: parseInt(sessionId)
        }
    })
    
    return user
}

export async function getUser(username:string){
    const user = await prisma.user.findFirst({
        where: {
            username
        }
    })

    if(!user) return false

    return user
}

export async function getAllUsers(){
    const users = await prisma.user.findMany({
        where:{
            NOT:{
                role: "ADMIN"
            }
        },
        orderBy:[
            {
                name: 'asc'
            }
        ]
    })
                    .then((data) => data)
                    .catch((error) =>error)
                    
    return users

}