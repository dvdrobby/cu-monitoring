"use client"

import { useEffect, useState } from "react"
import { CustomCard } from "./custom-card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Loader2, MinusCircle, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Separator } from "./ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import axios from "axios"
import { useRouter } from "next/navigation"
import { getCustomFields } from "@/actions/general-fetching"
import { CustomField } from "@prisma/client"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select"

import { Modal } from "./modal"

export const CustomOptionField = () => {

    const [options, setOptions] = useState<String[]>([])
    const [fields, setFields] = useState<CustomField[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            name: "",
            desc: "",
        }
    })

    const addOption = () => {
        const option = document.getElementById("option") as HTMLInputElement
        const optionValue = option.value
        const arr = [...options]
        arr.push(optionValue)
        setOptions(arr)
        option.value = ""
    }

    const removeOption = (e: any) => {
        const arr = [...options]
        arr.splice(e, 1)
        setOptions(arr)
    }

    const handleSubmit = async (e: any) => {
        const { name, desc } = e
        const data = {
            name,
            desc,
            options
        }

        try {
            setLoading(true)
            const res = await axios.post("/api/custom-field", data)
            if (res.status == 200) {
                setOptions([])
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async (id: any) => {
        try {
            setLoading(true)
            const res = await axios.delete(`/api/custom-field/${id}`)
            if (res) {
                router.refresh()
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchField = async () => {
        const res = await getCustomFields()
        setFields(res)
    }

    useEffect(() => {
        fetchField()
    }, [])

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            form.reset({
                name: "",
                desc: "",
            })
        }
    }, [options, form])

    return (
        <CustomCard
            title="Option Field Custom"
            description="Membuat option field baru sesuai kebutuhan yang akan ditambahkan pada logsheet."
            footer={false}
        >
            <Form {...form}>

                <form className="flex flex-col space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Nama field..." />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="desc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Deskripsi</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Masukkan deskripsi apabila ada..." />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Label>Option</Label>
                    <div className="flex space-x-2">
                        <Input id="option" type="text flex-1" />
                        <Button type="button" onClick={addOption}>Add</Button>
                    </div>

                    <div className="flex flex-col space-y-1 w-80 bg-gray-50 items-between pl-4">
                        {
                            options.map((option, index) => (
                                <div key={index} className="flex text-sm font-semibold items-center">
                                    <div className="flex-1">{option}</div>

                                    <Button type="button" size="sm" variant={"outline"} onClick={() => removeOption(index)}>
                                        <MinusCircle />
                                    </Button>

                                </div>
                            ))
                        }
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 />}
                        Simpan
                    </Button>
                </form>
                <Separator className="my-4" />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Custom Field</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead>Options</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            fields?.map(field => (
                                <TableRow key={field.id}>
                                    <TableCell>{field.name}</TableCell>
                                    <TableCell>{field.desc}</TableCell>
                                    <TableCell>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.options[0]} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    field.options.map(i => (
                                                        <SelectItem key={i} value={i}>{i}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>

                                    </TableCell>
                                    <TableCell>
                                        <div className="cursor-pointer" onClick={() => setModalOpen(true)}><Trash2 className="w-3 h-3" /></div>
                                        <Modal
                                            title="Data yang sudah dihapus tidak dapat dikembalikan."
                                            description="Apakah kamu yakin?"
                                            button="Hapus"
                                            isOpen={modalOpen}
                                            isLoading={loading}
                                            onClose={() => setModalOpen(false)}
                                            action={() => onDelete(field.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Form>
        </CustomCard>
    )
}