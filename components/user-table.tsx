"use client"
import { Suspense, useEffect, useRef, useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { AlertSuccess } from "./alert-success"
import { AlertError } from "./alert-error"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

export type EditedUser = {
    id: string,
    value: string
}

type UserTableProps = {
    data: User[]
    edit?: boolean
    value?: (param: EditedUser[] | null) => void
    error?: string,
    success?: string
}


export function UserTable({
    data = [],
    edit = false,
    value = () => null,
    error = "",
    success = "",

}: UserTableProps) {

    const [user, setUser] = useState<EditedUser[]>([])
    const router = useRouter()

    const handleChange = (e: any) => {
        const id = e.slice(0, 1)
        const value = e.slice(1, e.length)
        const data = {
            id, value
        }
        const newUser = user.length > 0 && [...user]

        const isDuplicate = user?.findIndex(user => user.id === id)

        if (isDuplicate == -1) {
            setUser([...user, data])
        } else {
            if (newUser) {
                newUser[isDuplicate] = data
                setUser(newUser)
            }

        }
        router.refresh()
    }

    useEffect(() => {
        value && value(user)
    }, [user, value])

    return (
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                    Menampilkan daftar user yang terdaftar, kontrol role suatu user dan juga penghapusan data user.
                </CardDescription>
                <AlertSuccess message={success} />
                <AlertError message={error} />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {data.length > 0 &&
                            data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>
                                        {edit ?
                                            <Select onValueChange={handleChange} defaultValue={user.id + user.role}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={user.role} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={user.id + "ADMIN"}>ADMIN</SelectItem>
                                                    <SelectItem value={user.id + "SUPERUSER"}>SUPERUSER</SelectItem>
                                                    <SelectItem value={user.id + "OPERATOR"}>OPERATOR</SelectItem>
                                                    <SelectItem value={user.id + "USER"}>USER</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            :

                                            user.role
                                        }

                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                </div>
            </CardFooter>
        </Card>
    )
}