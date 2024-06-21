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

type LogsheetTableProps = {
    data: User[]
    error?: string,
    success?: string
}


export function LogsheetTable({
    data = []

}: LogsheetTableProps) {

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [msg, setMsg] = useState("")
    const router = useRouter()


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

    return (
        <CustomCard
            title="Daftar Logsheet Central Utility"
            description="Menampilkan daftar form logsheet untuk monitoring mesin - mesin di Central Utility."
            footer={false}
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>
                            Actions
                        </TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>

                    {data.length > 0 &&
                        data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
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

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </CustomCard >

    )
}