"use client"

import { motion } from "framer-motion"
import { Shield, Lock, FileText } from "lucide-react"

export function SecurityFeature() {
  return (
    <section className="w-full py-12 md:py-16 bg-primary/5">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Document Security First</h2>
          <p className="max-w-[600px] text-muted-foreground">
            We encrypt all your documents before sending them to print shops, ensuring your sensitive information
            remains private and protected from unauthorized access.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">End-to-End Encryption</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your documents are encrypted from the moment you upload until they're printed
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Secure Access</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Print shops can only access your documents after verification and approval
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="font-semibold">Auto-Deletion</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Documents are automatically deleted after printing is complete
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

