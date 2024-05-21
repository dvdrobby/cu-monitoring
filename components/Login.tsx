import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
              <CardTitle className="text-2xl">CU Monitoring Apps</CardTitle>
              <CardDescription>
              Silahkan login untuk mengakses dashboard.
              </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
              </div>
          </CardContent>
          <CardFooter>
              <Button className="w-full">Login</Button>
          </CardFooter>
        </Card>
        <div className="text-xs font-base mb-2 mt-10">CU Monitoring Apps v0.1 <span className="text-thin"> See <a href="/" className="text-blue-500 underline">Docs</a></span>
        </div>
    </div>
    
  )
}
