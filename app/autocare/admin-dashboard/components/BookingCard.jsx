"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SearchBar from "./SearchBar"

export default function BookingCard() {
  const router = useRouter() // Next.js router for navigation

  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Fetch bookings from API
  useEffect(() => {
    async function fetchBookings() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/bookings")
        const data = await res.json()

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from API")
        }

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

  // Apply search and status filters
  useEffect(() => {
    let filtered = bookings

    if (statusFilter !== "all") {
      filtered = filtered.filter(b => b.status === statusFilter)
    }

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
  }, [bookings, searchQuery, statusFilter])

  // Mark a booking as complete
  async function markComplete(id) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "complete" }),
      })

      if (!res.ok) throw new Error("Failed to update booking")

      setBookings(prev =>
        prev.map(b => (b._id === id ? { ...b, status: "complete" } : b))
      )
    } catch (err) {
      console.error(err)
      alert("Failed to mark booking as complete. Please try again.")
    }
  }

  const incompleteCount = bookings.filter(b => b.status === "incomplete").length
  const completeCount = bookings.filter(b => b.status === "complete").length

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top controls: Search + Book Service button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchBar
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
        />
        <button
          onClick={() => router.push("/autocare/book")}
          className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Book Service
        </button>
      </div>

      {/* Loading or Error */}
      {loading && <p className="text-center mt-10 text-gray-500">Loading bookings...</p>}
      {error && <p className="text-center mt-10 text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-8">
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
          </div>

          {/* Booking List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map(booking => (
              <div
                key={booking._id}
                className={`p-4 rounded-lg shadow ${booking.status === "complete" ? "bg-green-50" : "bg-white"
                  }`}
              >
                <h4 className="font-semibold text-lg">{booking.name}</h4>
                <p className="text-sm text-gray-600">{booking.service}</p>
                <p className="text-sm text-gray-500">{booking.date} @ {booking.time}</p>
                <p className="text-sm text-gray-500">{booking.vehicleBrand} - {booking.vehicleModel}</p>
                <p className="text-sm text-gray-500">{booking.phone} | {booking.email}</p>
                <p className="mt-2 text-sm">{booking.notes}</p>

                {booking.status === "incomplete" && (
                  <button
                    onClick={() => markComplete(booking._id)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Mark Complete
                  </button>
                )}

                {booking.status === "complete" && (
                  <span className="mt-4 inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                    Completed
                  </span>
                )}
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