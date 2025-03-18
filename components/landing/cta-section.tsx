"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to start printing securely?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Start using Sentinel for the convenience and security of your documents.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/signup?role=customer">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto group transition-all hover:shadow-lg hover:scale-105"
              >
                Sign Up as Customer
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/signup?role=shopkeeper">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all hover:shadow-lg"
              >
                Register Your Shop
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/80 mt-8">
            <Shield className="h-4 w-4" />
            <span>Your documents are always protected with end-to-end encryption</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

