"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import GroupPic from "../public/assets/groupPic.jpeg"

export default function WhoWe() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Who We Are
          </h2>

          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            Glitec Advanced School of Technology is a privately owned
            institution offering both online and in-person programs designed
            to help individuals develop in-demand hard and soft skills. With
            state-of-the-art content and equipment, Glitec ensures an enhanced
            learning experience that emphasizes hands-on training.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            Read More About Us →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={GroupPic}
              alt="Pioneer students and staff members at Glitec"
              className="object-cover w-full h-full hover:scale-105 transition duration-500"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}