"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-slate-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Print documents{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                securely 
              </span>
              , with Sentinel
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Connect with local print shops and get your documents printed with just a few clicks. Your files are
              encrypted for maximum security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto group transition-all hover:shadow-lg hover:scale-105">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto transition-all hover:shadow-md">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
              <Shield className="h-4 w-4 text-primary" />
              <span>Your documents are encrypted end-to-end for maximum security</span>
            </div>
          </motion.div>
          <motion.div
            className="relative h-[300px] sm:h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl transform rotate-3"></div>
            <Image
              src="https://img.freepik.com/free-vector/flat-background-safer-internet-day_23-2151127503.jpg?t=st=1742306603~exp=1742310203~hmac=082530ef146442c7113bc1f80824a46d610728b17b0d5665ced8e78ad53bc6cc&w=996"
              alt="Person picking up printed documents"
              fill
              className="object-cover rounded-2xl shadow-xl transform -rotate-3 transition-transform hover:rotate-0 duration-500"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

