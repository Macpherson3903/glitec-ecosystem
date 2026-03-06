"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function EventBanner() {
    const targetDate = new Date("2026-05-31T23:59:59")
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            const diff = targetDate - now
            if (diff <= 0) {
                clearInterval(timer)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                return
            }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-xl max-w-7xl mx-auto p-6 md:p-10 mt-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
            <div className="flex-1 mb-6 md:mb-0 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Boot Camp 2026</h2>
                <p className="mb-3 text-sm sm:text-base md:text-lg">
                    Register before June to get an exclusive <span className="font-semibold underline">20% discount</span>!
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-center">
                    <div>
                        <span className="block text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.days}</span>
                        <span className="text-xs sm:text-sm md:text-base">Days</span>
                    </div>
                    <div>
                        <span className="block text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.hours}</span>
                        <span className="text-xs sm:text-sm md:text-base">Hours</span>
                    </div>
                    <div>
                        <span className="block text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.minutes}</span>
                        <span className="text-xs sm:text-sm md:text-base">Minutes</span>
                    </div>
                    <div>
                        <span className="block text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.seconds}</span>
                        <span className="text-xs sm:text-sm md:text-base">Seconds</span>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-end">
                <Link href="/apply">
                    <button className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                        Apply Now
                    </button>
                </Link>
            </div>
        </section>
    )
}