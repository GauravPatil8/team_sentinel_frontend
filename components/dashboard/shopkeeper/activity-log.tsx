"use client"

import { motion } from "framer-motion"
import { CheckCircle, FileText, AlertCircle, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ActivityLog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="bg-primary/5">
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Job Completed</p>
                <p className="text-sm text-muted-foreground">
                  Quarterly Report.pdf for Sarah Johnson has been completed
                </p>
                <p className="text-xs text-muted-foreground">Today, 10:42 AM</p>
              </div>
            </motion.div>
            <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">New Job Received</p>
                <p className="text-sm text-muted-foreground">Business Proposal.pdf from John Doe has been received</p>
                <p className="text-xs text-muted-foreground">Today, 9:15 AM</p>
              </div>
            </motion.div>
            <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                <AlertCircle className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">Low Paper Warning</p>
                <p className="text-sm text-muted-foreground">Printer 2 is running low on A4 paper</p>
                <p className="text-xs text-muted-foreground">Today, 8:30 AM</p>
              </div>
            </motion.div>
            <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">New Customer</p>
                <p className="text-sm text-muted-foreground">Emily Rodriguez has registered as a new customer</p>
                <p className="text-xs text-muted-foreground">Yesterday, 4:23 PM</p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

