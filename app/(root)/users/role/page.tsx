"use client"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EditedUser, UserTable } from "@/components/user-table"
import { getAllUsers } from "@/utils/cek-user"
import { Suspense, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import Loading from "./loading"

export default function Page() {
    const [user, setUser] = useState<User[]>([])
    const [value, setValue] = useState<EditedUser[]>([])
    const [feedback, setFeedback] = useState<EditedUser[]>([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState("")
    const [success, setSuccess] = useState("")

    const router = useRouter()

    const getUser = async () => {
        const res = await getAllUsers()
        setUser(res)
    }

    const getValue = (props: any) => {
        return setFeedback(props)
    }

    const isChange = () => {
        const arr: EditedUser[] = []
        feedback.length > 0 && feedback.map(item => {
            const data = user.find(obj => obj.id === parseInt(item.id))

            if (data?.role == item.value) return null
            const obj = { id: item.id, value: item.value }
            arr.push(obj)
        })

        return arr
    }

    const handleUpdateRole = () => {

        const arr = isChange()

        setValue(arr)

    }

    const fetch = async () => {
        try {
            setLoading(true)
            const res = await axios.patch("/api/users", value)
            if (res.data.length > 0) {
                setSuccess("Role user berhasil dirubah")
                setTimeout(() => {
                    router.push("/users")
                }, 3000)
            }
        } catch (error) {
            setAlert("Terjadi kesalahan")
            setTimeout(() => {
                setAlert("")
            }, 2000)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [feedback]);

    useEffect(() => {
        if (value.length > 0) {
            fetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">

                    <div className="ml-auto flex items-center gap-2" >
                        {
                            isChange().length > 0 ?
                                <Button disabled={loading} size="sm" className="h-8" onClick={handleUpdateRole}>
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Save
                                    </span>
                                </Button> :
                                <Button size="sm" className="h-8">
                                    <Link href="/users" className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Back
                                    </Link>
                                </Button>
                        }
                    </div>
                </div>
                <TabsContent value="all">
                    <Suspense fallback={<Loading />}>
                        <UserTable data={user} edit={true} value={getValue} error={alert} success={success} />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </main>
    )
}