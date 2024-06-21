"use client"

import { useFieldArray, useForm } from "react-hook-form"
import { CustomCard } from "./custom-card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { z } from "zod"
import { addLogsheetSchema } from "@/schema/addLogsheetSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Loader2, MinusCircle } from "lucide-react"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"


export const AddLogsheet = () => {

    const [loading, setLoading] = useState(false)
    const [tipeField, setTipeField] = useState("")

    const form = useForm<z.infer<typeof addLogsheetSchema>>({
        resolver: zodResolver(addLogsheetSchema),
        defaultValues: {
            name: "",
            kolom: [{ field: "", unit: "" }]
        }
    })

    const { register, control } = form

    const { fields, append, remove } = useFieldArray({
        name: "kolom",
        control
    })

    const selectTipeField = (e: any) => {
        setTipeField(e)
    }

    return (
        <CustomCard
            title="Tambah Logsheet"
            description="Halaman untuk menambahkan form logsheet baru."
            footer={false}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => { })}>
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
                                                <Select onValueChange={selectTipeField} >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih tipe field" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="input">Input Field</SelectItem>
                                                        <SelectItem value="option">Option Field</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

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
                                                    <Button onClick={() => remove(index)}><MinusCircle className="h-4 w-4" /></Button>
                                                )
                                            }
                                        </div>
                                    )
                                })

                            }
                        </div>

                        {/* <FormField
                            control={form.control}
                            disabled={loading}
                            name="kolom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fields</FormLabel>
                                    <div className="grid grid-cols-5 gap-2">
                                        <FormControl className="col-span-3">
                                            <Input {...field} placeholder="Nama field..." />
                                        </FormControl>
                                        <FormControl className="col-span-2">
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Satuan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cond">uS/cm</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <Button><MinusCircle className="h-4 w-4" /></Button>
                                    </div>
                                </FormItem>
                            )}
                        /> */}
                        <div >
                            <Button onClick={() => append({ field: "", unit: "" })} variant="outline">Tambah Field Baru</Button>
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