import Link from "next/link";

import {
  Menu,
  Home,
  Users,
  BookText,
  LineChart,
  Search,
  Settings2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { UserProfile } from "./user-profile";

export type SessionUser = {
  id: number
  name: string
  username: string
  role: string
  email: string
  accessToken: string
}
export async function Topbar({ data }: { data: SessionUser | undefined }) {
  const admin = data?.role == "ADMIN"
  const superuser = data?.role == "SUPERUSER" || data?.role == "ADMIN"

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/" className="flex flex-col items-center font-semibold">
              <span className="text-2xl font-bold">Central Utility</span>
              <span className="text-sm text-muted-foreground font-thin">Monitoring Apps v0.1</span>
            </Link>
            <Link
              href="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            {admin ?
              <Link
                href="/users"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Users
              </Link>
              : ""}
            {superuser &&
              <Link
                href="/preferences"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Settings2 className="h-5 w-5" />
                Preferences
              </Link>}
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <BookText className="h-5 w-5" />
              Logsheets
              <Badge className="ml-auto flex shrink-0 h-6 w-6 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Grafik
            </Link>
          </nav>

        </SheetContent>
      </Sheet>

      {/* Search Bar */}
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      {/* End Search Bar */}
      <div>Hallo, <span className="font-bold">{data?.name}</span></div>
      <UserProfile data={data} />
    </header>
  )
}