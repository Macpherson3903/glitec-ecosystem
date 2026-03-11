"use client";

import { autocareServices } from "@/data/autocareServices";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";
import AutocareHeader from "@/components/AutocareHeader";
import Footer from "@/components/Footer";

export default function ServiceDetails({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;

  const service = autocareServices.find((s) => s.id === id);
  if (!service) return notFound();

  return (
    <>
      <AutocareHeader />

      <section className="py-16 px-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">

          <Link
            href="/autocare"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={20} />
            Back to Services
          </Link>

          <h1 className="text-3xl font-bold">{service.title}</h1>

          <p className="text-gray-700">{service.description}</p>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Signs You Need This Service
            </h2>

            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {service.signs.map((sign, index) => (
                <li key={index}>{sign}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Importance of the Service
            </h2>

            <p className="text-gray-700">{service.importance}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              How Often to Get the Service Done
            </h2>

            <p className="text-gray-700">{service.frequency}</p>
          </div>

          <div className="pt-4">
            <Link
              href={`/autocare/book?service=${service.slug}`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <Wrench size={18} />
              Book This Service
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}