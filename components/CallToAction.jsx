"use client";

import Link from "next/link";
import { FiTool } from "react-icons/fi";

export default function CallToAction() {
  return (
    <section className="flex justify-center px-4 py-20">
      <div className="relative bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 text-white p-12 rounded-3xl max-w-[1080px] w-full shadow-xl">
        {/* Top-right icon */}
        <div className="absolute top-6 right-6 text-white text-3xl">
          <FiTool />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Join Glitec Today and Shape Your Future!
        </h2>
        <p className="text-center mb-10 text-lg md:text-xl max-w-3xl mx-auto">
          Start your journey toward a successful career with Glitec! Our
          expert-led courses provide real-world skills and knowledge that
          employers are looking for. Whether you’re passionate about
          technology, mechanical fields, or AI advancements, Glitec offers
          hands-on programs tailored to today’s industries.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link
            href="/apply"
            className="w-full md:w-auto text-center bg-blue-300 text-blue-950 font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-blue-400 transition duration-300"
          >
            Apply Online
          </Link>
          <Link
            href="/instructor"
            className="w-full md:w-auto text-center bg-blue-900 text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-blue-800 transition duration-300"
          >
            Become an Instructor
          </Link>
        </div>
      </div>
    </section>
  );
}