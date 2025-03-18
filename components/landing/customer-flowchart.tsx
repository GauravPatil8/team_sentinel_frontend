"use client"

import { motion } from "framer-motion"
import { Upload, Search, CreditCard, Printer, CheckCircle } from "lucide-react"

export function CustomerFlowchart() {
  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
      <h4 className="text-lg font-semibold mb-6 text-center">Customer Journey</h4>

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
            <h5 className="font-medium">Upload Document</h5>
            <p className="text-sm text-muted-foreground">Upload your document securely to our platform</p>
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
            <Search className="h-6 w-6" />
          </div>
          <div className="bg-primary/5 p-4 rounded-lg flex-1">
            <h5 className="font-medium">Find Nearby Print Shops</h5>
            <p className="text-sm text-muted-foreground">
              Select from available print shops based on location and ratings
            </p>
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
            <CreditCard className="h-6 w-6" />
          </div>
          <div className="bg-primary/5 p-4 rounded-lg flex-1">
            <h5 className="font-medium">Make Payment</h5>
            <p className="text-sm text-muted-foreground">Pay securely for your printing service</p>
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
            <h5 className="font-medium">Document Printing</h5>
            <p className="text-sm text-muted-foreground">Your document is printed at the selected shop</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
