"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, Star, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function NearbyShops() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Nearby Print Shops</h2>
        <Button variant="outline" size="sm" className="transition-all hover:shadow-md">
          <MapPin className="mr-2 h-4 w-4" />
          View Map
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Shop Card 1 */}
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 bg-primary/5">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-base">QuickPrint Services</CardTitle>
                  <CardDescription>0.5 miles away</CardDescription>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>Open now: 9AM - 6PM</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Main St, New York, NY</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group transition-all hover:shadow-md">
                <Printer className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                Send Document
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Shop Card 2 */}
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 bg-primary/5">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-base">PrintExpress</CardTitle>
                  <CardDescription>1.2 miles away</CardDescription>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>Open now: 8AM - 8PM</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>456 Park Ave, New York, NY</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group transition-all hover:shadow-md">
                <Printer className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                Send Document
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

