"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { autocareServices } from "@/data/autocareServices"

export default function SearchBar({
  onSearchChange = () => { },
  onStatusChange = () => { },
  onDateChange = () => { },
  onCategoryChange = () => { },
}) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")

  const [dateFilter, setDateFilter] = useState("")
  const [monthFilter, setMonthFilter] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [category, setCategory] = useState("all")

  const serviceTitles = autocareServices.map(service => service.title)

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

  function handleDateChange(value) {
    setDateFilter(value)
    onDateChange({ day: value, month: monthFilter, year: yearFilter })
  }

  function handleMonthChange(value) {
    setMonthFilter(value)
    onDateChange({ day: dateFilter, month: value, year: yearFilter })
  }

  function handleYearChange(value) {
    setYearFilter(value)
    onDateChange({ day: dateFilter, month: monthFilter, year: value })
  }

  function handleCategoryChange(value) {
    setCategory(value)
    onCategoryChange(value)
  }

  return (
    <div className="mt-8 w-full flex justify-center px-4">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-4 bg-white p-6 rounded-xl shadow-lg flex-wrap">

        <div className="relative w-full lg:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pl-10 pr-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-4 py-3 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Bookings</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => handleDateChange(e.target.value)}
          className="px-4 py-3 border rounded-lg text-sm"
        />

        <select
          value={monthFilter}
          onChange={(e) => handleMonthChange(e.target.value)}
          className="px-4 py-3 border rounded-lg text-sm"
        >
          <option value="">Month</option>
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">Jun</option>
          <option value="07">Jul</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>

        <input
          type="number"
          placeholder="Year"
          value={yearFilter}
          onChange={(e) => handleYearChange(e.target.value)}
          className="px-4 py-3 border rounded-lg text-sm w-24"
        />

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-4 py-3 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Services</option>
          {serviceTitles.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>

      </div>
    </div>
  )
}