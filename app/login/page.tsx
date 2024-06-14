"use client"

import { AlertError } from "@/components/alert-error"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/schema/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { authorize } from "@/actions/authorize"

export default function LoginPage() {

    const [error, setError] = useState("")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
        startTransition(() => {
            authorize(values)
                .then((data) => {
                    if (data) setError(data.error)
                })
        })
    }

    useEffect(() => {
    }, [error])

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">CU Monitoring Apps</CardTitle>
                    <CardDescription>
                        Silahkan login untuk mengakses dashboard.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <CardContent className="grid gap-4">
                            <AlertError message={error} />

                            <FormField
                                control={form.control}
                                disabled={isPending}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Your username..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                disabled={isPending}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="Your password..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit" disabled={isPending}>
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            <div className="text-xs font-base mb-2 mt-10">CU Monitoring Apps v0.1 <span className="text-thin"> See <a href="/" className="text-blue-500 underline">Docs</a></span>
            </div>
        </div>

    )
}
