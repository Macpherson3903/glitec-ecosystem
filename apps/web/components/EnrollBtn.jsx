"use client"

import Link from "next/link"

export default function EnrollBtn() {
    return (
        <Link
            href="/apply"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
            Apply Online
        </Link>
    )
}