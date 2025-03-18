"use client"

import { motion } from "framer-motion"
import { Upload, MapPin, Printer } from "lucide-react"

export function HowItWorks() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get your documents printed in three simple steps
            </p>
          </div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="flex flex-col items-center text-center space-y-4" variants={fadeInUp}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 relative">
              <Upload className="h-8 w-8 text-primary" />
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </div>
            </div>
            <h3 className="text-xl font-bold">Upload</h3>
            <p className="text-muted-foreground">
              Upload your documents securely to our platform in any format. Your files are encrypted immediately.
            </p>
          </motion.div>
          <motion.div className="flex flex-col items-center text-center space-y-4" variants={fadeInUp}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 relative">
              <MapPin className="h-8 w-8 text-primary" />
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </div>
            </div>
            <h3 className="text-xl font-bold">Select Shop</h3>
            <p className="text-muted-foreground">
              Choose from nearby print shops based on ratings, price, and distance. Set your printing preferences.
            </p>
          </motion.div>
          <motion.div className="flex flex-col items-center text-center space-y-4" variants={fadeInUp}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 relative">
              <Printer className="h-8 w-8 text-primary" />
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                3
              </div>
            </div>
            <h3 className="text-xl font-bold">Print</h3>
            <p className="text-muted-foreground">
              Pick up your printed documents when ready or get them delivered. Files are deleted after printing.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

