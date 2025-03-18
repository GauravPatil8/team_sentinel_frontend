"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FileText, Clock, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export function ShopkeeperSidebar() {
  const { user, logout } = useAuth(); // ✅ Fetch logged-in shopkeeper details
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Shop" />
            <AvatarFallback>
              {user?.shopName ? user.shopName.charAt(0) : "QP"}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium">
            {user?.shopName || "QuickPrint Services"}
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Main
          </h2>
          <div className="space-y-1">
            <Link
              href="/dashboard/shopkeeper"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/dashboard/shopkeeper"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              }`}
            >
              <FileText className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/shopkeeper/queue"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/dashboard/shopkeeper/queue"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              }`}
            >
              <Clock className="h-4 w-4" />
              Print Queue
            </Link>
            <Link
              href="/dashboard/shopkeeper/profile"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/dashboard/shopkeeper/profile"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              }`}
            >
              <Users className="h-4 w-4" />
              Shop Profile
            </Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="space-y-1">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
