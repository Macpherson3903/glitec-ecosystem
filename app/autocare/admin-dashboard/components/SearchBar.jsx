"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"

export default function SearchBar({
  onSearchChange = () => {},
  onStatusChange = () => {},
}) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(search)
    }, 400)
    return () => clearTimeout(timer)
  }, [search, onSearchChange])

  function handleStatusChange(value) {
    setStatus(value)
    onStatusChange(value)
  }

  return (
    <div className="mt-8 w-full flex justify-center px-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-4 bg-white p-6 rounded-xl shadow-lg">

        {/* Search Input */}
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search bookings, customers, vehicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-4 px-12 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm bg-gray-50 hover:bg-gray-100"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {showFilters && (
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Bookings</option>
              <option value="complete">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          )}
        </div>
      </div>
    </div>
  )
}