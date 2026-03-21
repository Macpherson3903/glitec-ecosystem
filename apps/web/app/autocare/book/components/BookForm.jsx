"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  autocareServices,
  getAutocareServiceBySlug,
} from "@/data/autocareServices";
import { useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";

export default function BookForm() {
  const searchParams = useSearchParams();
  const paramService = searchParams.get("service") || "";

  const [serviceSlug, setServiceSlug] = useState("");
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedService = useMemo(
    () => getAutocareServiceBySlug(serviceSlug),
    [serviceSlug]
  );

  useEffect(() => {
    setServiceSlug(paramService);
  }, [paramService]);

  useEffect(() => {
    if (!date) {
      setAvailableSlots([]);
      return;
    }
    async function loadSlots() {
      try {
        const res = await fetch(`/api/autocare/slots?date=${date}`);
        const data = await res.json();
        setAvailableSlots(data.availableSlots || []);
      } catch (err) {
        console.error(err);
        setAvailableSlots([]);
      }
    }
    loadSlots();
  }, [date]);

  const todayIso = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t.toISOString().split("T")[0];
  }, []);

  function handlePrint() {
    const form = document.querySelector("form");
    if (!form) return;
    const formData = new FormData(form);
    const svcTitle =
      selectedService?.title || formData.get("serviceTitle") || "";

    const content = `
            <html>
            <head>
                <title>AutoCare Booking Details</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 40px;
                        color: black;
                    }
                    h2 {
                        margin-bottom: 20px;
                    }
                    .row {
                        margin-bottom: 10px;
                    }
                    strong {
                        display: inline-block;
                        width: 160px;
                    }
                </style>
            </head>
            <body>
                <h2>AutoCare Booking Details</h2>

                <div class="row"><strong>Full Name:</strong> ${formData.get("name") || ""}</div>
                <div class="row"><strong>Phone:</strong> ${formData.get("phone") || ""}</div>
                <div class="row"><strong>Email:</strong> ${formData.get("email") || ""}</div>
                <div class="row"><strong>Service:</strong> ${svcTitle}</div>
                <div class="row"><strong>Vehicle Brand:</strong> ${formData.get("vehicleBrand") || ""}</div>
                <div class="row"><strong>Vehicle Model:</strong> ${formData.get("vehicleModel") || ""}</div>
                <div class="row"><strong>Vehicle Year:</strong> ${formData.get("vehicleYear") || ""}</div>
                <div class="row"><strong>Date:</strong> ${formData.get("date") || ""}</div>
                <div class="row"><strong>Time:</strong> ${formData.get("time") || ""}</div>
                <div class="row"><strong>Notes:</strong> ${formData.get("notes") || ""}</div>
            </body>
            </html>
        `;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const svc = getAutocareServiceBySlug(formData.get("serviceSlug") || "");

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      service: svc?.title || "",
      vehicleBrand: formData.get("vehicleBrand"),
      vehicleModel: formData.get("vehicleModel"),
      vehicleYear: formData.get("vehicleYear"),
      date: formData.get("date"),
      time: formData.get("time"),
      notes: formData.get("notes"),
    };

    if (!data.service) {
      toast.error("Please select a service");
      setLoading(false);
      return;
    }

    if (!data.time) {
      toast.error("Please select an available time slot");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/autocare/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Booking submitted successfully!");
      form.reset();
      setAvailableSlots([]);
      setDate("");
      setServiceSlug(paramService);
    } else {
      const error = await res.json();
      toast.error(error?.error || "Booking failed");
    }

    setLoading(false);
  }

  return (
    <section className="w-full bg-slate-50 py-12 md:py-20 px-6">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-3xl">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <Link href="/autocare" className="hover:text-blue-600">
            AutoCare
          </Link>
          <span aria-hidden>/</span>
          <span className="text-slate-900 font-medium">Book</span>
          {selectedService && (
            <>
              <span aria-hidden>/</span>
              <span className="text-slate-900 font-medium truncate max-w-[200px]">
                {selectedService.title}
              </span>
            </>
          )}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Book AutoCare Service
          </h2>
          <p className="text-slate-600 mb-8">
            Schedule a professional vehicle service. If you came from a service
            page, your selection is filled in below—you can change it anytime.
          </p>
        </motion.div>

        {selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-xl border border-blue-100 bg-blue-50/80 p-5 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Selected service
                </p>
                <h3 className="text-lg font-semibold text-slate-900 mt-1">
                  {selectedService.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                  {selectedService.description}
                </p>
              </div>
              <Link
                href={`/autocare/services/${selectedService.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
              >
                <ExternalLink size={16} />
                View full details
              </Link>
            </div>
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-slate-100"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="name"
              required
              placeholder="John Doe"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                required
                placeholder="+234..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Select Service
            </label>
            <select
              name="serviceSlug"
              required
              value={serviceSlug}
              onChange={(e) => setServiceSlug(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Choose a service</option>
              {autocareServices.map((service) => (
                <option key={service.id} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Vehicle Brand
              </label>
              <input
                name="vehicleBrand"
                required
                placeholder="Toyota"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Vehicle Model
              </label>
              <input
                name="vehicleModel"
                required
                placeholder="Camry"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Vehicle Year
              </label>
              <input
                name="vehicleYear"
                placeholder="e.g. 2018 (optional)"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none md:max-w-xs"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Calendar size={16} className="text-slate-500" />
              Select Date
            </label>
            <input
              type="date"
              name="date"
              required
              min={todayIso}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Select Time
            </label>
            <select
              name="time"
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Choose a time</option>
              {availableSlots.length ? (
                availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {date
                    ? "No slots available for this date"
                    : "Pick a date first"}
                </option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              rows={4}
              placeholder="Describe any issues..."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Book Service"}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-lg transition"
            >
              Print summary
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Tip: You can print a summary before submitting. After booking,
            check your email for confirmation.
          </p>
        </motion.form>

        <div className="mt-8 text-center">
          <Link
            href="/autocare"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to all services
          </Link>
        </div>
      </div>
    </section>
  );
}
