"use client"

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/2347078116598"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 p-3 sm:p-4 md:p-5"
    >
      <FaWhatsapp className="text-xl sm:text-2xl md:text-3xl" />
    </a>
  );
}