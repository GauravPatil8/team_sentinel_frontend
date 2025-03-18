"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-white">
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
            {/* Question 1 */}
            <AccordionItem value="item-1" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                Why is document security important when printing at a local shop?
              </AccordionTrigger>
              <AccordionContent>
                When you print documents at a local print shop, there's a risk that your personal or confidential information could be exposed. Print shops often store documents in their systems temporarily, which can lead to data theft or unauthorized access. Sentinel ensures that your documents are encrypted, keeping your information secure throughout the process.
              </AccordionContent>
            </AccordionItem>

            {/* Question 2 */}
            <AccordionItem value="item-2" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">How does Sentinel protect my documents?</AccordionTrigger>
              <AccordionContent>
                Sentinel uses end-to-end encryption for your documents, ensuring that they are secure from the moment you upload them until they are printed. Only authorized print shops can access your documents, and once printing is complete, access is automatically revoked.
              </AccordionContent>
            </AccordionItem>

            {/* Question 3 */}
            <AccordionItem value="item-3" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">What happens to my documents once they are printed?</AccordionTrigger>
              <AccordionContent>
                After printing, your documents are permanently deleted from the system to ensure no sensitive data is stored unnecessarily. This minimizes the risk of any misuse or data leak.
              </AccordionContent>
            </AccordionItem>

            {/* Question 4 */}
            <AccordionItem value="item-4" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">Are my documents safe when sending them via messaging apps like WhatsApp?</AccordionTrigger>
              <AccordionContent>
                When sharing documents through messaging apps like WhatsApp, there's a risk that your phone number and document details can be harvested by third parties. This could lead to spam calls or data misuse. Sentinel ensures that all your documents remain encrypted and secure, even if shared through messaging platforms.
              </AccordionContent>
            </AccordionItem>

            {/* Question 5 */}
            <AccordionItem value="item-5" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">Can I print my documents securely on the go?</AccordionTrigger>
              <AccordionContent>
                Yes, Sentinel allows you to securely print documents from anywhere, even when you're traveling. Our platform ensures that your documents are protected, regardless of where you are, so you can print with peace of mind.
              </AccordionContent>
            </AccordionItem>

            {/* Question 6 */}
            <AccordionItem value="item-6" className="border rounded-lg p-2 mb-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                How can I trust that print shops are handling my documents securely?
              </AccordionTrigger>
              <AccordionContent>
                Print shops that partner with Sentinel undergo a thorough verification process to ensure they meet our security standards. Only authorized shops with the right encryption protocols can access your documents, reducing the risk of data misuse.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
