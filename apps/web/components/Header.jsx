"use client"

import { useState } from "react"
import Image from "next/image"
import Logo from "../public/assets/logo.png"
import Navbar from "@/components/Navbar"
import EnrollBtn from "@/components/EnrollBtn"
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"

export default function Header() {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const closeMenu = () => setIsMobileOpen(false)

    return (
        <header className="sticky top-0 z-[9999] w-full border-b bg-white shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo */}
                <div>
                    <Image src={Logo} alt="Glitec Logo" width={70} priority />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <Navbar closeMenu={closeMenu} />
                    <EnrollBtn />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white border-t shadow-sm overflow-hidden transition-all duration-300 ${isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col items-center gap-4 py-4">
                    <Navbar closeMenu={closeMenu} />
                    <div onClick={closeMenu}>
                        <EnrollBtn />
                    </div>
                </div>
            </div>
        </header>
    )
}