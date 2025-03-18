"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          </div>
        </motion.div>
        <motion.div
          className="mx-auto max-w-3xl mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                How much does it cost to use PrintConnect?
              </AccordionTrigger>
              <AccordionContent>
                PrintConnect is free to use for customers. You only pay for the printing services you use, with prices
                set by individual print shops. For shopkeepers, we charge a small commission on each transaction.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">What file formats are supported?</AccordionTrigger>
              <AccordionContent>
                We support all common document formats including PDF, DOCX, XLSX, PPTX, JPG, PNG, and many more. If you
                have a specific format not listed, please contact us.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">How do I know my documents are secure?</AccordionTrigger>
              <AccordionContent>
                We take security seriously. All documents are encrypted during upload and storage. Print shops can only
                access your documents after you've selected them for printing, and access is automatically revoked after
                printing is complete. Our encryption ensures that even if someone intercepts your files, they cannot
                read the contents.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">Can I get my documents delivered?</AccordionTrigger>
              <AccordionContent>
                Yes, some print shops offer delivery services. You can see which shops offer delivery when browsing
                nearby locations, along with any associated delivery fees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">How do I become a print shop partner?</AccordionTrigger>
              <AccordionContent>
                Simply sign up as a shopkeeper on our platform. You'll need to provide details about your shop, services
                offered, and complete a verification process. Once approved, you can start receiving print jobs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                What paper types and sizes are available?
              </AccordionTrigger>
              <AccordionContent>
                Available paper types and sizes vary by print shop, but typically include A4, Legal, Letter, A3, and
                more, in various weights and finishes (matte, glossy, etc.). You can select your preferences when
                placing an order.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

