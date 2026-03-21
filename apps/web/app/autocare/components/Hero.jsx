"use client"

import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] lg:h-[90vh] text-white p-8">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/HeroBg.jpeg"
          alt="AutoCare Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/60" /> {/* overlay */}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32 h-full flex items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
            Glitec AutoCare
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Professional Auto Care
            <span className="block text-blue-400">
              Maintenance You Can Trust
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            From oil changes and brake inspections to tire services and
            diagnostics, our certified technicians keep your vehicle safe,
            efficient, and road-ready.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/autocare/book"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition"
            >
              Book Service
            </Link>
{/* 
            <Link
              href="/autocare/services"
              className="rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold hover:bg-slate-800 transition"
            >
              View Services
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}