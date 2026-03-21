"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs" // Clerk hook to get current user

export default function UserBookings() {
  const { user, isSignedIn } = useUser() // get logged-in user
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBookings() {
      if (!user?.emailAddresses?.[0]?.emailAddress) {
        setLoading(false)
        return
      }

      const email = user.emailAddresses[0].emailAddress.toLowerCase().trim()

      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/bookings/user?email=${encodeURIComponent(email)}`)
        const data = await res.json()

        if (!Array.isArray(data)) throw new Error("Invalid data from API")
        setBookings(data)
      } catch (err) {
        console.error("Failed to fetch bookings:", err)
        setError("Failed to load bookings. Please try again.")
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    if (isSignedIn) fetchBookings()
  }, [user, isSignedIn])

  const incompleteCount = bookings.filter(b => b.status === "incomplete").length
  const completeCount = bookings.filter(b => b.status === "complete").length

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>

      {!isSignedIn && <p className="text-center text-gray-500">Please sign in to view your bookings.</p>}
      {loading && <p className="text-center text-gray-500">Loading your bookings...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && bookings.length === 0 && (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
          </div>

          {/* Booking List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map(booking => (
              <div
                key={booking._id}
                className={`p-4 rounded-lg shadow ${
                  booking.status === "complete" ? "bg-green-50" : "bg-white"
                }`}
              >
                <h4 className="font-semibold text-lg">{booking.service}</h4>
                <p className="text-sm text-gray-500">{booking.date} @ {booking.time}</p>
                <p className="text-sm text-gray-500">{booking.vehicleBrand} - {booking.vehicleModel}</p>
                <p className="text-sm text-gray-500">{booking.notes}</p>

                <span
                  className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === "complete"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {booking.status === "complete" ? "Completed" : "Incomplete"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}