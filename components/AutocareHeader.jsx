"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { HiOutlineMenu, HiOutlineX, HiOutlineUserCircle } from "react-icons/hi"
import Logo from "@/public/assets/logo.png"
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function AutoCareHeader() {
  const [open, setOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { isSignedIn, user, isLoaded } = useUser()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "AutoCare", href: "/autocare" },
  ]

  const isActive = (href) => pathname === href

  const handleDashboardRedirect = () => {
    if (!isLoaded || !user) return
    const role = user.publicMetadata?.role || "user"
    router.push(role === "admin" ? "/autocare/admin-dashboard" : "/autocare/user-dashboard")
    setAccountOpen(false)
  }

  const toggleAccount = useCallback(() => setAccountOpen((prev) => !prev), [])
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), [])

  useEffect(() => {
  if (!isLoaded || !isSignedIn || !user) return

  const syncKey = `glitec_user_synced_${user.id}`

  // Prevent repeated calls on refresh or navigation
  if (sessionStorage.getItem(syncKey)) return

  const createUser = async () => {
    try {
      await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emailAddresses[0].emailAddress,
          role: user.publicMetadata?.role || "user",
        }),
      })

      // Mark user as synced for this session
      sessionStorage.setItem(syncKey, "true")
    } catch (error) {
      console.error("User sync failed:", error)
    }
  }

  createUser()
}, [isLoaded, isSignedIn, user])

  return (
    <header className="sticky top-0 z-[9999] w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4 relative">
        <Link href="/" className="flex items-center z-[9999]">
          <Image src={Logo} alt="Glitec Logo" width={65} priority />
        </Link>

        {/* Right container: nav items + account button together */}
        <div className="flex items-center gap-6 relative z-[9999]">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-md transition ${isActive(item.href)
                    ? "bg-blue-50 text-blue-800 font-semibold"
                    : "text-gray-700 hover:bg-blue-100"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Account button */}
          <div className="relative">
            <button
              onClick={toggleAccount}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold ${isSignedIn ? "bg-gray-50 text-gray-800 hover:bg-gray-300" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } transition`}
            >
              <HiOutlineUserCircle className="text-xl" />
              Account
            </button>

            {accountOpen && (
              <div className="absolute right-0 mt-2 w-[240px] bg-white shadow-lg rounded-md z-[9999] flex flex-col">
                {isSignedIn ? (
                  <>
                    <button
                      onClick={handleDashboardRedirect}
                      className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-t-md font-medium"
                    >
                      Dashboard
                    </button>
                    <div className="px-4 py-2">
                      <UserButton
                        appearance={{
                          elements: {
                            userButtonPopover: "shadow-lg",
                            userButtonRoot: "w-full",
                          },
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-gray-700 ml-2"
            aria-label="Toggle Menu"
          >
            {open ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden flex flex-col items-center gap-4 px-6 py-6 border-t bg-white relative z-[9998]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`w-full max-w-[220px] text-center px-4 py-2 rounded-md transition ${isActive(item.href)
                  ? "bg-blue-50 text-blue-800 font-semibold"
                  : "text-gray-700 hover:bg-blue-100"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}