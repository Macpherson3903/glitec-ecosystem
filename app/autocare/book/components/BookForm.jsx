"use client"

import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { autocareServices } from "@/data/autocareServices"
import { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function BookForm() {
    const searchParams = useSearchParams()
    const selectedService = searchParams.get("service") || ""

    const [date, setDate] = useState("")
    const [availableSlots, setAvailableSlots] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!date) return
        async function loadSlots() {
            try {
                const res = await fetch(`/api/autocare/slots?date=${date}`)
                const data = await res.json()
                setAvailableSlots(data.availableSlots)
            } catch (err) {
                console.error(err)
            }
        }
        loadSlots()
    }, [date])

    function handlePrint() {
        const form = document.querySelector("form")
        const formData = new FormData(form)

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
                <div class="row"><strong>Service:</strong> ${formData.get("service") || ""}</div>
                <div class="row"><strong>Vehicle Brand:</strong> ${formData.get("vehicleBrand") || ""}</div>
                <div class="row"><strong>Vehicle Model:</strong> ${formData.get("vehicleModel") || ""}</div>
                <div class="row"><strong>Date:</strong> ${formData.get("date") || ""}</div>
                <div class="row"><strong>Time:</strong> ${formData.get("time") || ""}</div>
                <div class="row"><strong>Notes:</strong> ${formData.get("notes") || ""}</div>
            </body>
            </html>
        `

        const printWindow = window.open("", "", "width=800,height=600")
        printWindow.document.write(content)
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        printWindow.close()
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            service: formData.get("service"),
            vehicleBrand: formData.get("vehicleBrand"),
            vehicleModel: formData.get("vehicleModel"),
            date: formData.get("date"),
            time: formData.get("time"),
            notes: formData.get("notes"),
        }

        if (!data.time) {
            toast.error("Please select an available time slot")
            setLoading(false)
            return
        }

        const res = await fetch("/api/autocare/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        if (res.ok) {
            toast.success("Booking submitted successfully!")
            e.target.reset()
            setAvailableSlots([])
            setDate("")
        } else {
            const error = await res.json()
            toast.error(error?.error || "Booking failed")
        }

        setLoading(false)
    }

    return (
        <section className="w-full bg-slate-50 py-20 px-6">
            <Toaster position="top-right" />
            <div className="mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Book AutoCare Service</h2>
                    <p className="text-slate-600 mb-10">Schedule a professional vehicle service.</p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white p-8 rounded-xl shadow-md"
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
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                name="phone"
                                required
                                placeholder="+234..."
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Select Service</label>
                        <select
                            name="service"
                            required
                            defaultValue={selectedService}
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Choose a service</option>
                            {autocareServices.map((service) => (
                                <option key={service.id} value={service.title}>
                                    {service.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Vehicle Brand</label>
                            <input
                                name="vehicleBrand"
                                required
                                placeholder="Toyota"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Vehicle Model</label>
                            <input
                                name="vehicleModel"
                                required
                                placeholder="Camry"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Select Date</label>
                        <input
                            type="date"
                            name="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Select Time</label>
                        <select
                            name="time"
                            required
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Choose a time</option>
                            {availableSlots.length
                                ? availableSlots.map((slot) => (
                                      <option key={slot} value={slot}>
                                          {slot}
                                      </option>
                                  ))
                                : <option disabled>No slots available for this date</option>}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Additional Notes</label>
                        <textarea
                            name="notes"
                            rows={4}
                            placeholder="Describe any issues..."
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            {loading ? "Submitting..." : "Book Service"}
                        </button>

                        <button
                            type="button"
                            onClick={handlePrint}
                            className="w-full bg-slate-800 hover:bg-slate-900 text-black font-semibold py-3 rounded-lg transition"
                        >
                            Print Details
                        </button>
                    </div>
                    <p className="text-gray-400">Note: Print before pressing submit, To print order details.</p>
                </motion.form>
            </div>
        </section>
    )
}