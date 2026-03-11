"use client"
import dynamic from "next/dynamic"
import AutocareHeader from "@/components/AutocareHeader"
import Footer from "@/components/Footer"

const BookForm = dynamic(() => import("./components/BookForm"), { ssr: false })

export default function Book() {
  return (
    <>
      <AutocareHeader />
      <BookForm />
      <Footer />
    </>
  )
}