"use server"

import { prisma } from "@/utils/conn"

export const getCustomFields = async () => {
    const res = await prisma.customField.findMany()
    return res
}