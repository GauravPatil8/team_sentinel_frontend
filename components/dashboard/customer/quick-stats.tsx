"use client"

import { motion } from "framer-motion"
import { FileText, Clock, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickStats() {
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-3 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary/5">
          <CardTitle className="text-sm font-medium">Documents Printed</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary/5">
          <CardTitle className="text-sm font-medium">Pending Prints</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">Ready for pickup soon</p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary/5">
          <CardTitle className="text-sm font-medium">Favorite Shops</CardTitle>
          <Star className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">Across 2 locations</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

