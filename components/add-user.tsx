"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl
} from "@/components/ui/form"
import { registerSchema } from "@/schema/register"
import { useEffect, useState } from "react"

import { AlertError } from "@/components/alert-error"
import { AlertSuccess } from "@/components/alert-success"
import { CustomCard } from "./custom-card"


export default function AddUser() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    // const role = "USER"
    const router = useRouter()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            // role
        }
    });

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            form.reset({
                username: "",
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
        }
    }, [form, success])


    const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
        setError("")
        setSuccess("")

        const validatedValues = registerSchema.safeParse(values)

        if (validatedValues.success) {
            try {
                setLoading(true)
                const res = await axios.post(`/api/users`, validatedValues.data)
                console.log(res)
                if (res.status == 200) setSuccess("User baru berhasil ditambahkan")
                router.refresh()
            } catch (err) {
                setLoading(true)
                setError("Terjadi kesalahan")
            } finally {
                setLoading(false)
            }
        } else {
            setError("Input yang dikirimkan invalid")
            return console.error("Data invalid")
        }

    }
    return (
        <CustomCard
            title="Tambah User"
            description="Menambahkan user baru untuk akses ke CU Monitoring."
            footer={false}
        >
            <AlertError message={error} />
            <AlertSuccess message={success} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="username"
                        render={({ field }) => (
                            <div className="space-y-4 w-[400px]">
                                <FormItem>
                                    <FormLabel className="font-semibold">Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Example:johndoe..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="name"
                        render={({ field }) => (
                            <div className="space-y-4 w-[400px]">
                                <FormItem>
                                    <FormLabel className="font-semibold">Nama</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Example: John Doe..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="email"
                        render={({ field }) => (
                            <div className="space-y-4 w-[400px]">
                                <FormItem>
                                    <FormLabel className="font-semibold">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="Example: johndoe@example.com..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="password"
                        render={({ field }) => (
                            <div className="space-y-4 w-[400px]">
                                <FormItem>
                                    <FormLabel className="font-semibold">Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Password..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="confirmPassword"
                        render={({ field }) => (
                            <div className="space-y-4 w-[400px]">
                                <FormItem>
                                    <FormLabel className="font-semibold">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Password..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </div>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
                        Submit</Button>
                </form>
            </Form>
        </CustomCard>

    )
}