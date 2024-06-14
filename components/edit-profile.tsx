"use client"

import { User } from "@prisma/client"


import { useEffect, useState } from "react"
import { Tabs, TabsContent } from "./ui/tabs"
import { Button } from "./ui/button"
import { UserData } from "./user-data"


export type EditProfileProps = {
    data: User | null
}

export const EditProfile = ({
    data
}: EditProfileProps) => {

    const [edit, setEdit] = useState(true)
    const [loading, setLoading] = useState(false)
    return <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
            <div className="flex items-center">

                <div className="ml-auto flex items-center gap-2" >
                    {
                        edit ?
                            <Button disabled={loading} size="sm" className="h-8" onClick={() => setEdit(false)}>
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Edit
                                </span>
                            </Button> :
                            <Button disabled={loading} size="sm" className="h-8" onClick={() => setEdit(true)}>
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Back
                                </span>
                            </Button>
                    }
                </div>
            </div>
            <TabsContent value="all">

                <UserData data={data} isEdit={edit} />

            </TabsContent>
        </Tabs>
    </main>
}