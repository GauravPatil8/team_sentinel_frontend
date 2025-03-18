"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PerformanceCharts() {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-base">Weekly Job Volume</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[200px] w-full bg-muted/50 rounded-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                <div className="w-8 bg-primary/80 rounded-t-md" style={{ height: "30%" }}></div>
                <div className="w-8 bg-primary/80 rounded-t-md" style={{ height: "50%" }}></div>
                <div className="w-8 bg-primary/80 rounded-t-md" style={{ height: "70%" }}></div>
                <div className="w-8 bg-primary/80 rounded-t-md" style={{ height: "60%" }}></div>
                <div className="w-8 bg-primary/80 rounded-t-md" style={{ height: "80%" }}></div>
                <div className="w-8 bg-primary/80 rounded-t-md" style={{ height: "40%" }}></div>
                <div className="w-8 bg-primary/80 rounded-t-md" style={{ height: "65%" }}></div>
              </div>
              <div className="absolute bottom-0 w-full flex justify-around px-4 pb-0 text-xs text-muted-foreground">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-base">Customer Ratings</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[200px] w-full bg-muted/50 rounded-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="text-3xl font-bold text-primary">4.8</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 w-full flex justify-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="ml-2 text-xs text-muted-foreground">85%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

