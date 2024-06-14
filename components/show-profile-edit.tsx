import { User } from "@prisma/client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { editProfileSchema } from "@/schema/edit-profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { AlertError } from "@/components/alert-error"
import { AlertSuccess } from "@/components/alert-success"
import { z } from "zod"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"

export const ShowProfileEdit = ({
    data
}: { data: User | null }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const router = useRouter()
    const params = useParams()

    const form = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            username: data?.username,
            name: data?.name,
            email: data?.email
        }
    })

    const handleSubmit = async (values: z.infer<typeof editProfileSchema>) => {
        setError("")
        setSuccess("")

        const validatedValues = editProfileSchema.safeParse(values)

        if (validatedValues.success) {
            try {
                setLoading(true)
                const res = await axios.patch(`/api/users/${params.id}`, validatedValues.data)
                if (res.status == 200) setSuccess("Update data user berhasil")
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
        <>
            <AlertError message={error} />
            <AlertSuccess message={success} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 justify-items-start items-center">
                                <FormLabel className="font-semibold">Username</FormLabel>
                                <FormControl>
                                    <Input  {...field} className="col-span-3" defaultValue={data?.username} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 justify-items-start items-center">
                                <FormLabel className="font-semibold">Nama</FormLabel>
                                <FormControl>
                                    <Input  {...field} className="col-span-3" defaultValue={data?.name} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 justify-items-start items-center">
                                <FormLabel className="font-semibold">Email</FormLabel>
                                <FormControl>
                                    <Input  {...field} className="col-span-3" defaultValue={data?.email} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
                        Save</Button>
                </form>
            </Form>
        </>
    )
}