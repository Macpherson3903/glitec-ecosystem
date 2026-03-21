"use client"

import NavLink from "./NavLink"

export default function Navbar({ closeMenu }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/course", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/autocare", label: "AutoCare" },
    { href: "/scholarship", label: "Scholarship" },
    { href: "/jobs", label: "Jobs" },
  ]

  return (
    <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          onClick={closeMenu}
        />
      ))}
    </nav>
  )
}