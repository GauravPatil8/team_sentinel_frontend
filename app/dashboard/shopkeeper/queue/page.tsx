"use client"
 
import { SetStateAction, useState } from "react"
import { motion } from "framer-motion"
 
import { ShopkeeperDashboardHeader } from "@/components/dashboard/shopkeeper/dashboard-header"
import { ShopkeeperSidebar } from "@/components/dashboard/shopkeeper/sidebar"
import { PrintQueue } from "@/components/dashboard/shopkeeper/print-queue"
import { PrintDialog } from "@/components/dashboard/shopkeeper/print-dialog"
 
export default function PrintQueuePage() {
  const [showPrintDialog, setShowPrintDialog] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
 
  const handlePrint = (job: SetStateAction<null>) => {
    setSelectedJob(job)
    setShowPrintDialog(true)
  }
 
  return (
<div className="flex min-h-screen flex-col">
<ShopkeeperDashboardHeader />
 
      <div className="flex flex-1">
<ShopkeeperSidebar />
 
        {/* Main Content */}
<main className="flex-1 overflow-auto">
<div className="container py-6">
<motion.div
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
>
<h1 className="text-3xl font-bold">Print Queue</h1>
<p className="text-muted-foreground">Manage all your print jobs in one place</p>
</motion.div>
 
            <PrintQueue onPrintClick={handlePrint} showAll={true} />
</div>
</main>
</div>
 
      <PrintDialog open={showPrintDialog} onOpenChange={setShowPrintDialog} selectedJob={selectedJob} />
</div>
  )
}