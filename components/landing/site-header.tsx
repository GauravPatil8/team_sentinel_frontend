"use client"

import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Sentinel
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="#for-customers" className="text-sm font-medium hover:text-primary transition-colors">
            For Customers
          </Link>
          <Link href="#for-shopkeepers" className="text-sm font-medium hover:text-primary transition-colors">
            For Shopkeepers
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" className="transition-all hover:shadow-md">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="transition-all hover:shadow-md hover:scale-105">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

