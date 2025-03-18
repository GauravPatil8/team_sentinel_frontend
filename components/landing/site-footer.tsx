import Link from "next/link"
import { Printer } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0 bg-slate-50">
      <div className="container flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:h-24">
        <div className="flex items-center gap-2">
          <Printer className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Sentinel
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">© 2025 PrintConnect. All rights reserved.</div>
      </div>
    </footer>
  )
}

