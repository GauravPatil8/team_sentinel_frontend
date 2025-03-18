"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function TestimonialsSection() {
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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
          </div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Testimonial 1 */}
          <motion.div
            className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-primary/10">
              <Image src="/placeholder.svg?height=64&width=64" alt="User profile" fill className="object-cover" />
            </div>
            <div>
              <p className="text-muted-foreground italic">
                "PrintConnect saved me during finals week when my printer broke down. Found a shop nearby and had my
                documents ready in 30 minutes! The security features gave me peace of mind for my research papers."
              </p>
              <div className="flex items-center justify-center gap-1 mt-4">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
              </div>
              <h4 className="text-lg font-semibold mt-2">Sarah Johnson</h4>
              <p className="text-sm text-muted-foreground">Student</p>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-primary/10">
              <Image src="/placeholder.svg?height=64&width=64" alt="User profile" fill className="object-cover" />
            </div>
            <div>
              <p className="text-muted-foreground italic">
                "As a small business owner, PrintConnect has helped me reach more customers and streamline my print shop
                operations. The automated workflow saves me hours every day, and customers love the security features."
              </p>
              <div className="flex items-center justify-center gap-1 mt-4">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
              </div>
              <h4 className="text-lg font-semibold mt-2">Michael Chen</h4>
              <p className="text-sm text-muted-foreground">Print Shop Owner</p>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div
            className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-primary/10">
              <Image src="/placeholder.svg?height=64&width=64" alt="User profile" fill className="object-cover" />
            </div>
            <div>
              <p className="text-muted-foreground italic">
                "I travel frequently for work and PrintConnect makes it easy to print documents on the go without
                carrying a printer. The document encryption is essential for my confidential business contracts."
              </p>
              <div className="flex items-center justify-center gap-1 mt-4">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
              <h4 className="text-lg font-semibold mt-2">Emily Rodriguez</h4>
              <p className="text-sm text-muted-foreground">Business Consultant</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

