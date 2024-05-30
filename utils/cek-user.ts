import { prisma } from "./conn";

export async function isAdmin(username:string){
    const user = await prisma.user.findFirst({
        where: {
            username
        }
    })

    if(user?.role == "ADMIN") return true

    return false
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