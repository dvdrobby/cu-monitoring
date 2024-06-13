import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {

    const session = await auth()
    console.log("Session user ID:", session?.user.id)
    console.log("Params ID:", params.id)
    if (session?.user.id != parseInt(params.id)) return redirect("/")
    return <>EDIT PROFILE PAGE</>
}