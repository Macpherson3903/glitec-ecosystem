"use client";

import Link from "next/link";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CourseSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Courses at Glitec Advanced School of Technology
        </h2>

        <p className="text-gray-600">
          Explore a wide range of hands-on, industry-focused courses designed to
          equip you with real-world skills in technology, auto mechanics,
          business, and more.
        </p>
      </div>

      <motion.div
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {courses.map((course, index) => (
          <motion.div
            key={index}
            variants={card}
            className="bg-blue-50 border border-blue-100 rounded-xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              {course.category}
            </h3>

            <ul className="space-y-3 text-blue-800 text-sm">
              {course.items.map((item, i) => (
                <li key={i}>
                  <Link
                    href="/apply"
                    className="flex gap-2 hover:text-blue-600 transition"
                  >
                    <span className="text-blue-600">•</span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}