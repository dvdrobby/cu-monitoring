import { auth } from "@/auth"

export default async function HomePage() {

    const session = await auth()

    return (
        <div>
            Home = {JSON.stringify(session)}
        </div>
    )
}