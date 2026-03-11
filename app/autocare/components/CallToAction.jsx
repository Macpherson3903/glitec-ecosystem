"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 px-6 bg-blue-50 flex justify-center mx-auto">
      <motion.div
        className=" max-w-5xl  w-full text-center bg-white rounded-xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Keep Your Vehicle Running Smoothly!
        </h2>
        <p className="text-gray-700 mb-6">
          Schedule your AutoCare service today and ensure your car stays safe, efficient, and reliable.
        </p>
        <Link
          href="/autocare/book"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Book Now
        </Link>
      </motion.div>
    </section>
  );
}