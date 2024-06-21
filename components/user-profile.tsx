import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { CircleUser } from "lucide-react"
import { Button } from "./ui/button"

import { auth, signOut } from "@/auth"
import { SessionUser } from "./Topbar"

export const UserProfile = async ({ data }: { data: SessionUser | undefined }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hallo {data?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href={`/edit/${data?.id}`}>Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form action={async () => {
                        "use server";
                        await signOut();
                    }}>
                        <button type="submit">Logout</button >

                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}