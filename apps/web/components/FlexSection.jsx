"use client"

import Image from "next/image"
import { FaUsers } from "react-icons/fa"
import ictImg from "../public/assets/ictImg.jpeg"
import { motion } from "framer-motion"

export default function FlexSection() {
  return (
    <section className="mt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto bg-purple-200 rounded-xl p-10"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Image
              src={ictImg}
              width={500}
              alt="ICT department students"
              className="rounded-lg object-cover"
            />
          </motion.div>

          <div className="text-center md:text-left space-y-6">
            <div className="flex justify-center md:justify-start">
              <FaUsers className="text-7xl text-blue-700" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Flexible Study Schedule
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Our program operates continuously with start dates in January, May, and September.
              You can study at your convenience, choosing the time and location that works best for you.
              Coursework can be completed in as little as 10 weeks, and all practical training is conducted at the main campus.
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  )
}