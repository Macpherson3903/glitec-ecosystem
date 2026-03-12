"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SearchBar from "./SearchBar"

export default function BookingCard() {
  const router = useRouter()

  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState({ day: "", month: "", year: "" })
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/bookings")
        const data = await res.json()

        if (!Array.isArray(data)) throw new Error("Invalid data format from API")
        setBookings(data)
      } catch (err) {
        console.error("Failed to fetch bookings:", err)
        setError("Failed to load bookings. Please try again.")
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  useEffect(() => {
    let filtered = [...bookings]

    if (statusFilter !== "all") filtered = filtered.filter(b => b.status === statusFilter)
    if (categoryFilter !== "all") filtered = filtered.filter(b => b.service?.toLowerCase() === categoryFilter.toLowerCase())
    if (dateFilter.day) filtered = filtered.filter(b => b.date === dateFilter.day)
    if (dateFilter.month)
      filtered = filtered.filter(b => {
        if (!b.date) return false
        const month = new Date(b.date).getMonth() + 1
        return month === parseInt(dateFilter.month)
      })
    if (dateFilter.year)
      filtered = filtered.filter(b => {
        if (!b.date) return false
        const year = new Date(b.date).getFullYear()
        return year === parseInt(dateFilter.year)
      })
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        b =>
          b.name?.toLowerCase().includes(query) ||
          b.service?.toLowerCase().includes(query) ||
          b.vehicleBrand?.toLowerCase().includes(query) ||
          b.vehicleModel?.toLowerCase().includes(query) ||
          b.phone?.toLowerCase().includes(query) ||
          b.email?.toLowerCase().includes(query)
      )
    }

    setFilteredBookings(filtered)
  }, [bookings, searchQuery, statusFilter, dateFilter, categoryFilter])

  async function markComplete(id) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "complete" }),
      })
      if (!res.ok) throw new Error("Failed to update booking")
      setBookings(prev => prev.map(b => (b._id === id ? { ...b, status: "complete" } : b)))
    } catch (err) {
      console.error(err)
      alert("Failed to mark booking as complete. Please try again.")
    }
  }

  function printBooking(booking) {
    const printWindow = window.open("", "_blank")
    const html = `
      <html>
        <head>
          <title>Booking Details</title>
          <style>
            body { font-family: Arial; padding:40px; color:#000 }
            h2 { margin-bottom:20px }
            p { margin:6px 0; font-size:14px }
            strong { display:inline-block; width:140px }
          </style>
        </head>
        <body>
          <h2>AutoCare Booking Details</h2>
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Service:</strong> ${booking.service}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Vehicle:</strong> ${booking.vehicleBrand} ${booking.vehicleModel}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Notes:</strong> ${booking.notes || "-"}</p>
          <p><strong>Status:</strong> ${booking.status}</p>
          <script>
            window.onload=function(){window.print();window.onafterprint=()=>window.close()}
          </script>
        </body>
      </html>
    `
    printWindow.document.open()
    printWindow.document.write(html)
    printWindow.document.close()
  }

  const incompleteCount = bookings.filter(b => b.status === "incomplete").length
  const completeCount = bookings.filter(b => b.status === "complete").length
  const serviceFilteredCount = bookings.filter(b => b.service?.toLowerCase() === categoryFilter.toLowerCase())

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchBar
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
          onDateChange={setDateFilter}
          onCategoryChange={setCategoryFilter}
        />
        <button
          onClick={() => router.push("/autocare/book")}
          className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Book Service
        </button>
      </div>

      {loading && <p className="text-center mt-10 text-gray-500">Loading bookings...</p>}
      {error && <p className="text-center mt-10 text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8 mb-8">
            <div className="p-6 bg-blue-100 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-blue-800">Incomplete</h3>
              <p className="mt-2 text-3xl font-bold">{incompleteCount}</p>
            </div>
            <div className="p-6 bg-green-100 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-green-800">Complete</h3>
              <p className="mt-2 text-3xl font-bold">{completeCount}</p>
            </div>
            <div className="p-6 bg-purple-100 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-purple-800">Total Bookings</h3>
              <p className="mt-2 text-3xl font-bold">{bookings.length}</p>
            </div>
            <div className="p-6 bg-yellow-100 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-yellow-800">Pending Action</h3>
              <p className="mt-2 text-3xl font-bold">{incompleteCount}</p>
            </div>
            {categoryFilter !== "all" && (
              <div className="p-6 bg-indigo-100 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-indigo-800">Service: {categoryFilter}</h3>
                <p className="mt-1 text-sm text-gray-700">
                  Incomplete: {serviceFilteredCount.filter(b => b.status === "incomplete").length}
                </p>
                <p className="text-sm text-gray-700">
                  Complete: {serviceFilteredCount.filter(b => b.status === "complete").length}
                </p>
                <p className="mt-2 text-3xl font-bold">Total: {serviceFilteredCount.length}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map(booking => (
              <div
                key={booking._id}
                className={`p-4 rounded-lg shadow ${
                  booking.status === "complete" ? "bg-green-50" : "bg-white"
                }`}
              >
                <h4 className="font-semibold text-lg">{booking.name}</h4>
                <p className="text-sm text-gray-600">{booking.service}</p>
                <p className="text-sm text-gray-500">{booking.date} @ {booking.time}</p>
                <p className="text-sm text-gray-500">{booking.vehicleBrand} - {booking.vehicleModel}</p>
                <p className="text-sm text-gray-500">{booking.phone} | {booking.email}</p>
                <p className="mt-2 text-sm">{booking.notes}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => printBooking(booking)}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black transition"
                  >
                    Print
                  </button>

                  {booking.status === "incomplete" && (
                    <button
                      onClick={() => markComplete(booking._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Mark Complete
                    </button>
                  )}

                  {booking.status === "complete" && (
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))}

            {filteredBookings.length === 0 && (
              <p className="col-span-full text-center text-gray-500 mt-6">
                No bookings match your search or filter.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}