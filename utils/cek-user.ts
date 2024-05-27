import { prisma } from "./conn";

export async function isAdmin(username:string){
    const user = await prisma.user.findFirst({
        where: {
            username
        }
    })

    return user
}