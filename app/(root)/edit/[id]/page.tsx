import { auth } from "@/auth"
import { EditProfile } from "@/components/edit-profile"
import { getUserById } from "@/utils/cek-user"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {

    const session = await auth()
    const correctUser = session?.user.id == parseInt(params.id)
    const isAdmin = session?.user.role == "ADMIN"
    const user = await getUserById(session?.user.id)
    // console.log(isAdmin)
    // console.log(correctUser)
    // console.log("Session user ID:", session?.user.id)
    // console.log("Params ID:", params.id)
    if (!correctUser && !isAdmin) return redirect("/")
    return <EditProfile data={user} />
}