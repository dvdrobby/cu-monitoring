import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react"


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CU Monitoring",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TooltipProvider>
        <SessionProvider>
          <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>{children}</body>
        </SessionProvider>
      </TooltipProvider>
    </html>
  );
}
