"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLink({ href, label, onClick }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive
          ? "text-blue-600 bg-blue-50"
          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
        }`}
    >
      {label}
    </Link>
  )
}