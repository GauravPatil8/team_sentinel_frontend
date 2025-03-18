"use client"

import Image from "next/image"
import { motion } from "framer-motion"

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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What is the Need of Sentinel?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            In today's digital world, privacy and security are more important than ever. When printing sensitive documents at local print shops, there are several risks involved, including data theft and unauthorized access. Sentinel is here to address these concerns and ensure your documents are protected.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Need 1 */}
          <motion.div
            className="flex flex-col items-center text-center space-y-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            variants={fadeInUp}
          >
            <div className="relative h-48 w-48 overflow-hidden rounded-lg">
              <Image
                src="https://img.freepik.com/premium-vector/file-protection-concept-illustration_108061-1667.jpg?ga=GA1.1.325641321.1742306281&semt=ais_hybrid"
                alt="Secure printing"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-xl font-semibold">Protect Your Documents</h4>
            <p className="text-muted-foreground">
              When printing at a local shop, your sensitive documents are often stored in their system. Without encryption, there's a risk of data exposure, misuse, or even unauthorized sale. Sentinel ensures your documents stay safe and secure during the printing process.
            </p>
          </motion.div>

          {/* Need 2 */}
          <motion.div
            className="flex flex-col items-center text-center space-y-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            variants={fadeInUp}
          >
            <div className="relative h-48 w-48 overflow-hidden rounded-lg">
              <Image
                src="https://img.freepik.com/free-vector/hacker-fishing-credit-card_24908-81650.jpg?t=st=1742310868~exp=1742314468~hmac=aef878be87427bf2b482fb6f43d8a45064c123d3b89f46406f604351e6eae629&w=740"
                alt="Data encryption"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-xl font-semibold">Prevent Data Misuse</h4>
            <p className="text-muted-foreground">
              Print shops often handle personal data, and without proper encryption, there’s a chance your documents could be accessed or sold by malicious actors. Sentinel encrypts your documents to protect your privacy and prevent misuse, keeping your data where it belongs – with you.
            </p>
          </motion.div>

          {/* Need 3 */}
          <motion.div
            className="flex flex-col items-center text-center space-y-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            variants={fadeInUp}
          >
            <div className="relative h-48 w-48 overflow-hidden rounded-lg">
              <Image
                src="https://img.freepik.com/free-vector/alert-concept-illustration_114360-30287.jpg?t=st=1742311319~exp=1742314919~hmac=c4a0479828b5ad8510e7e07862c7eb5d0bf13a27df17d6054f6b3637dbe92028&w=740"
                alt="Safe printing on the go"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-xl font-semibold">Print Securely AnywhereSafeguard Your Privacy on Messaging Platforms</h4>
            <p className="text-muted-foreground">
              Whether you're traveling for business or working remotely, printing sensitive documents from any location can expose you to risks. For instance, if you're sending documents via WhatsApp, there's a chance that your phone number may be harvested and used for spam calls. Sentinel ensures your documents remain encrypted and safe, whether you're at home or on the go.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
