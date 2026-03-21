"use client";

import Link from "next/link";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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
            className="bg-blue-50 border border-blue-100 rounded-xl p-6 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              {/* Title with inline graduation cap */}
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <span>{course.category}</span>
                <GraduationCap className="text-blue-400 w-5 h-5 flex-shrink-0" />
              </h3>

              <ul className="space-y-4">
                {course.items.map((item, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <Link
                      href="/apply"
                      className="text-blue-800 hover:text-blue-600 font-medium text-sm transition"
                    >
                      {item.title}
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* View More Button */}
            <div className="mt-6">
              <Link
                href="/course"
                className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition text-center w-full"
              >
                View More
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}