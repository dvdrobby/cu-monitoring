"use client"

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
import { useTransition } from "react"


export default function AddUserPage(){
  
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues:{
      username: "",
      name:"",
      email: "",
      password: "",
      confirmPassword:"",
  }});

  const handleSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values)
  }
    return(
        <>
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Tambah User</h1>
        </div>
          <div
            className="flex flex-1 items-start justify-start rounded-lg border border-dashed shadow-sm px-2 py-4"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField 
                  control={form.control}
                  disabled={isPending}
                  name="username"
                  render={({field}) => (
                    <div className="space-y-4 w-[400px]">
                      <FormItem>
                        <FormLabel className="font-semibold">Username</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Example:johndoe..."/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    </div>
                  )}
                />
                <FormField 
                  control={form.control}
                  disabled={isPending}
                  name="name"
                  render={({field}) => (
                    <div className="space-y-4 w-[400px]">
                      <FormItem>
                        <FormLabel className="font-semibold">Nama</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Example: John Doe..."/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    </div>
                  )}
                />
                <FormField 
                  control={form.control}
                  disabled={isPending}
                  name="email"
                  render={({field}) => (
                    <div className="space-y-4 w-[400px]">
                      <FormItem>
                        <FormLabel className="font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Example: johndoe@example.com..."/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    </div>
                  )}
                />
                <FormField 
                  control={form.control}
                  disabled={isPending}
                  name="password"
                  render={({field}) => (
                    <div className="space-y-4 w-[400px]">
                      <FormItem>
                        <FormLabel className="font-semibold">Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" placeholder="Password..."/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    </div>
                  )}
                />
                <FormField 
                  control={form.control}
                  disabled={isPending}
                  name="confirmPassword"
                  render={({field}) => (
                    <div className="space-y-4 w-[400px]">
                      <FormItem>
                        <FormLabel className="font-semibold">Confirm Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" placeholder="Password..."/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    </div>
                  )}
                />
                <Button 
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
                  Submit</Button>
              </form>
            </Form>
        </div>
        </>
    )
}