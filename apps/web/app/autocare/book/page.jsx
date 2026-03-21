"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import AutocareHeader from "@/components/AutocareHeader";
import Footer from "@/components/Footer";

const BookForm = dynamic(() => import("./components/BookForm"), { ssr: false });

function BookFormFallback() {
  return (
    <section className="w-full bg-slate-50 py-20 px-6 min-h-[50vh] flex items-center justify-center">
      <p className="text-slate-600">Loading booking form…</p>
    </section>
  );
}

export default function Book() {
  return (
    <>
      <AutocareHeader />
      <Suspense fallback={<BookFormFallback />}>
        <BookForm />
      </Suspense>
      <Footer />
    </>
  );
}