"use client"

import { useEffect, useState } from "react"
import { CustomCard } from "@/components/custom-card"
import { User } from "@prisma/client"
import { ShowProfile } from "@/components/show-profile"
import { ShowProfileEdit } from "@/components/show-profile-edit"

export const UserData = ({
    data,
    isEdit
}: {
    data: User | null,
    isEdit: boolean
}) => {
    return (
        <CustomCard
            title="User Profile"
            description="Untuk mengubah data pribadi silahkan klik tombol edit."
            footer={false}
        >
            {
                isEdit ?
                    <ShowProfile data={data} />
                    :
                    <ShowProfileEdit data={data} />
            }
        </CustomCard>
    )
}