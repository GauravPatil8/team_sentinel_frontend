"use client";

import { Printer } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function CustomerDashboardHeader() {
  const { user } = useAuth(); // ✅ Get logged-in user details

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Printer className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Sentinel
          </span>
        </div>
        
      </div>
    </header>
  );
}
