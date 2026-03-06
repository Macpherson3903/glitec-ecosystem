"use client"

import Image from "next/image"
import Link from "next/link"
import { FaHome, FaBook, FaInfoCircle, FaCar, FaGraduationCap, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import Logo from "../public/assets/logo.png"

export default function Footer() {
  const links = [
    { href: "/", label: "Home", icon: <FaHome className="inline mr-2" /> },
    { href: "/course", label: "Courses", icon: <FaBook className="inline mr-2" /> },
    { href: "/about", label: "About", icon: <FaInfoCircle className="inline mr-2" /> },
    { href: "/autocare", label: "AutoCare", icon: <FaCar className="inline mr-2" /> },
    { href: "/scholarship", label: "Scholarship", icon: <FaGraduationCap className="inline mr-2" /> },
    { href: "/contact", label: "Contact", icon: <FaEnvelope className="inline mr-2" /> },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="flex flex-col gap-4">
          <Image src={Logo} alt="Glitec Logo" width={150} height={50} />
          <p className="flex items-center gap-2"><FaPhone /> +234-816-737-5717</p>
          <p className="flex items-center gap-2"><FaEnvelope /> admissions@glitecast.com</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> Plot 11 New Jerusalem City Estate, Igbo Etche Road, Rivers State, Nigeria</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href} className="hover:text-blue-500 transition-colors">
                <Link href={link.href}>
                  {link.icon}{link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            href="/apply" 
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-6 py-3 rounded-md mt-4 inline-block text-center"
          >
            Apply Now
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Our Location</h3>
          <div className="w-full h-48 md:h-60 rounded-md overflow-hidden border border-gray-700">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d63608.739928715084!2d7.038375977271004!3d4.847682547490453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPlot%2011%20New%20Jerusalem%20City%20Estate%2C%20Igbo%20Etche%20Road%2C%20Rivers%20State%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1772818516942!5m2!1sen!2sng"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Glitec Advanced School of Technology. All rights reserved.
      </div>
    </footer>
  )
}