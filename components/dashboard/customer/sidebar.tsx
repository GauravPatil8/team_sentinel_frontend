"use client";

import Link from "next/link";
import { FileText, Upload, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context"; 

interface CustomerSidebarProps {
  onUploadClick?: () => void;
}

export function CustomerSidebar({ onUploadClick }: CustomerSidebarProps) {
  const { logout } = useAuth(); 

  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
      <nav className="flex-1 overflow-auto py-4">
        
        <div className="px-4 py-2">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Main</h2>
          <div className="space-y-1">
            <Link
              href="/dashboard/customer"
              className="flex items-center gap-3 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
            >
              <FileText className="h-4 w-4" />
              Dashboard
            </Link>

            <button
              onClick={onUploadClick}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Upload className="h-4 w-4" />
              Upload Document
            </button>
          </div>
        </div>

       
        <div className="px-4 py-2">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Account</h2>
          <div className="space-y-1">
            <Link
              href="/dashboard/customer/settings"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

           
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
