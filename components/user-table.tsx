"use client"
import { useEffect, useState } from "react"
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
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import Link from "next/link"
import { Modal } from "./modal"
import axios from "axios"
import { CustomCard } from "./custom-card"

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
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [msg, setMsg] = useState("")
    const router = useRouter()

    const handleChange = (e: any) => {
        const word = e.split(" ")
        const id = word[0]
        const value = word[1]
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

    const onDelete = async (id: any) => {
        try {
            setLoading(true)
            const res = await axios.delete(`/api/users/${id}`)
            if (res) {
                router.refresh()
                setMsg("Data berhasil dihapus")
                setTimeout(() => {
                    setMsg("")
                }, 2000)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        value && value(user)
    }, [user, value])

    return (
        <CustomCard
            title="Users"
            description="Menampilkan daftar user yang terdaftar, kontrol role suatu user dan juga penghapusan data user."
            footer={false}
            footerDesc="showing 3of10"
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Role</TableHead>
                        {!edit && <TableHead>Actions
                        </TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {data.length > 0 &&
                        data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>
                                    {edit ?
                                        <Select onValueChange={handleChange} defaultValue={user.id + " " + user.role}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={user.role} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={user.id + " ADMIN"}>ADMIN</SelectItem>
                                                <SelectItem value={user.id + " SUPERUSER"}>SUPERUSER</SelectItem>
                                                <SelectItem value={user.id + " OPERATOR"}>OPERATOR</SelectItem>
                                                <SelectItem value={user.id + " USER"}>USER</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        :

                                        user.role
                                    }

                                </TableCell>
                                {!edit &&

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
                                                <DropdownMenuLabel><Link href={`/edit/${user.id}`}>Edit</Link></DropdownMenuLabel>
                                                <DropdownMenuLabel>
                                                    <div className="cursor-pointer" onClick={() => setModalOpen(true)}>Delete</div>
                                                    <Modal
                                                        title="Data yang sudah dihapus tidak dapat dikembalikan."
                                                        description="Apakah kamu yakin?"
                                                        button="Hapus"
                                                        isOpen={modalOpen}
                                                        isLoading={loading}
                                                        onClose={() => setModalOpen(false)}
                                                        action={() => onDelete(user.id)}
                                                    />
                                                </DropdownMenuLabel>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </CustomCard >

    )
}