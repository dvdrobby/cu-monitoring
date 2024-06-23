"use client"

import { useFieldArray, useForm } from "react-hook-form"
import { CustomCard } from "./custom-card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { z } from "zod"
import { addLogsheetSchema } from "@/schema/addLogsheetSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Loader2, MinusCircle } from "lucide-react"
import { Separator } from "./ui/separator"
import { getCustomFields } from "@/actions/general-fetching"
import { CustomField } from "@prisma/client"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { AlertSuccess } from "./alert-success"
import { AlertError } from "./alert-error"
import axios from "axios"

type DataProps = {
    name: string | ""
    kolom: any[]
}

export const AddLogsheet = () => {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [saveBtn, setSaveBtn] = useState(false)
    const [data, setData] = useState<DataProps>({
        name: "",
        kolom: [""]
    })
    const [tipeField, setTipeField] = useState<String[]>([])
    const [options, setOptions] = useState<CustomField[]>([])

    const fetchField = async () => {
        const res = await getCustomFields()
        setOptions(res)
    }


    const form = useForm<z.infer<typeof addLogsheetSchema>>({
        resolver: zodResolver(addLogsheetSchema),
        defaultValues: {
            name: "",
            kolom: [{ name: "", desc: "", unit: "" }]
        }
    })

    const { register, control } = form

    const { fields, append, remove, update } = useFieldArray({
        name: "kolom",
        control
    })

    const handleTipeField = (e: any) => {
        const divide = e.split(" ")
        const value = divide[0]
        const index = divide[1]
        const arr = [...tipeField]
        arr[index] = value

        setTipeField(arr)
    }

    const removeField = (index: number) => {
        const arr = [...tipeField]
        arr.splice(index, 1)
        setTipeField(arr)
    }

    const submitData = async (data: any) => {
        setError("")
        setSuccess("")

        try {
            setLoading(true)
            const res = await axios.post("/api/logsheet", data)

            if (res.status == 200) {
                setSuccess("Logsheet berhasil dibuat.")
                setSaveBtn(false)
                fields.map((i, index) => {
                    if (index > 0) {
                        remove(index)
                    }
                })

            }
        } catch (error) {
            setError("terjadi kesalahan!")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchField()
        // console.log(fields)
    }, [])

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            form.reset({
                name: "",
                kolom: [{ name: "", desc: "", unit: "" }]
            })
        }
    }, [options, form])

    useEffect(() => {
        if (saveBtn) {
            const value = {
                name: data.name,
                kolom: fields
            }

            submitData(value)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveBtn])

    const save = (values: any) => {

        tipeField.map((item, index) => {
            if (item !== "input") {
                options.map(option => {
                    if (item == option.id.toString()) {
                        update(index, {
                            name: option.name,
                            desc: option.desc,
                            options: option.options
                        })
                    }
                }
                )

            }
        })

        setSaveBtn(true)
        setData(values)
        console.log("data submitted: ", values)
        console.log("fields submitted: ", fields)
    }

    return (
        <CustomCard
            title="Tambah Logsheet"
            description="Halaman untuk menambahkan form logsheet baru."
            footer={false}
        >
            <AlertSuccess message={success} />
            <AlertError message={error} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(save)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            disabled={loading}
                            name="name"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel>Nama Logsheet</FormLabel>
                                    <div className="lg:grid grid-cols-5 gap-4">
                                        <FormControl className="lg:col-span-3">
                                            <Input {...field} placeholder="Nama logsheet..." />
                                        </FormControl>
                                    </div>
                                </FormItem>

                            )}
                        />
                        <div className="space-y-4">
                            <Separator />
                            {
                                fields.map((field, index) => {
                                    return (
                                        <div key={field.id} className="space-y-4">
                                            <div className="grid grid-cols-2">
                                                <label className="font-semibold">Tipe Field</label>
                                                <Select onValueChange={(e: any) => handleTipeField(e)} >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih tipe field" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={`input ${index}`}>Input Field</SelectItem>
                                                        {
                                                            options?.map((option) => (
                                                                <SelectItem key={option.id} value={`${option.id} ${index}`}>{option.name}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {
                                                tipeField[index] == "input" && (
                                                    <div className="space-y-2">
                                                        <Label>Name</Label>
                                                        <Input placeholder="Name kolom..." type="text" {...register(`kolom.${index}.name` as const)} />
                                                        <Label>Deskripsi</Label>
                                                        <Textarea placeholder="Masukan deskripsi seperti kode sensor dll..." {...register(`kolom.${index}.desc` as const)} />
                                                        <Label>Satuan</Label>
                                                        <Input placeholder="Masukan satuan seperti psi, celcius dll..." {...register(`kolom.${index}.unit` as const)} />
                                                    </div>
                                                )
                                            }
                                            {
                                                options?.map((option) => {
                                                    return tipeField[index] == option.id.toString() && (
                                                        <div key={option.id} className="space-y-2">
                                                            <Label>Name</Label>
                                                            <Input value={option.name} type="text" disabled />
                                                            {option.desc && <Label>Deskripsi</Label>}
                                                            {option.desc && <Textarea value={option.desc} disabled />}

                                                        </div>

                                                    )
                                                }
                                                )
                                            }


                                            {/* <Input type="text" {...register(`kolom.${index}.field` as const)} className="col-span-3" placeholder="Nama fields..." />
                                            <Select {...register(`kolom.${index}.unit` as const)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Satuan" />
                                                </SelectTrigger>
                                                <SelectContent>

                                                </SelectContent>
                                            </Select> */}
                                            {
                                                index > 0 && (
                                                    <Button onClick={() => {
                                                        remove(index)
                                                        removeField(index)
                                                    }}><MinusCircle className="h-4 w-4" /></Button>
                                                )
                                            }
                                        </div>
                                    )
                                })

                            }
                        </div>
                        <div >
                            <Button type="button" onClick={() => append({ name: "", desc: "", unit: "" })} variant="outline">Tambah Field Baru</Button>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
                            Simpan Logsheet</Button>
                    </div>
                </form>
            </Form >
        </CustomCard >
    )
}