import Link from "next/link"
import {
  BookText,
  Home,
  LineChart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Topbar } from "@/components/Topbar"
import React from "react"
import { auth } from "@/auth"

export default async function Dashboard({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const admin = session?.user.role == "ADMIN"
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        {/* SIdebar */}
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 py-4 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex flex-col items-center font-semibold">
              <span className="text-2xl font-bold">Central Utility</span>
              <span className="text-sm text-muted-foreground font-thin">Monitoring Apps v0.1</span>
            </Link>

          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              {admin ?
                <Link
                  href="/users/add"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Users
                </Link>
                : ""}

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <BookText className="h-4 w-4" />
                Logsheets
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>

        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col">
        <Topbar />

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
