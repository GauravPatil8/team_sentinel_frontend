"use client"

import { motion } from "framer-motion"
import { Upload, Settings, ClipboardList, Printer, CheckCircle } from "lucide-react"

export function ShopkeeperFlowchart() {
  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
      <h4 className="text-lg font-semibold mb-6 text-center">Shopkeeper Journey</h4>

      <div className="space-y-12">
        {/* Step 1 */}
        <motion.div
          className="relative flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shrink-0 z-10">
            <Upload className="h-6 w-6" />
          </div>
          <div className="bg-primary/5 p-4 rounded-lg flex-1">
            <h5 className="font-medium">Receive Order</h5>
            <p className="text-sm text-muted-foreground">Get notified when customers submit their documents for printing</p>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="relative flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shrink-0 z-10">
            <Settings className="h-6 w-6" />
          </div>
          <div className="bg-primary/5 p-4 rounded-lg flex-1">
            <h5 className="font-medium">Configure Print Settings</h5>
            <p className="text-sm text-muted-foreground">Adjust print preferences based on customer requests</p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="relative flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shrink-0 z-10">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div className="bg-primary/5 p-4 rounded-lg flex-1">
            <h5 className="font-medium">Manage Orders</h5>
            <p className="text-sm text-muted-foreground">Track, update, and manage customer orders efficiently</p>
          </div>
        </motion.div>

        {/* Step 4 */}
        <motion.div
          className="relative flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shrink-0 z-10">
            <Printer className="h-6 w-6" />
          </div>
          <div className="bg-primary/5 p-4 rounded-lg flex-1">
            <h5 className="font-medium">Print Documents</h5>
            <p className="text-sm text-muted-foreground">Print the documents securely following the configured settings</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
