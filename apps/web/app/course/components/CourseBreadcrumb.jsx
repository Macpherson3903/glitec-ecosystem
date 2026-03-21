"use client";

import { courses } from "@/data/courses";
import { ChevronDown } from "lucide-react";

export default function CourseBreadcrumb({
  currentPage = 1,
  setCurrentPage,
  view,
  setView,
  coursesPerPage = 10,
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = courses.map((cat) => cat.category);

  // Filter courses by selected category
  const filteredCourses = selectedCategory
    ? courses.find((cat) => cat.category === selectedCategory)?.items || []
    : courses.flatMap((cat) => cat.items);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4">

        {/* Page Info */}
        <p className="text-sm md:text-base text-blue-700 font-medium">
          Page {currentPage} of {totalPages}
        </p>

        {/* Category Filter */}
        <div className="relative">
          <select
            className="appearance-none px-4 py-2 text-blue-700 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            value={selectedCategory || ""}
            onChange={(e) => {
              setSelectedCategory(e.target.value || null);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Dropdown Icon */}
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" size={16} />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1.5 text-sm rounded-md border transition
              ${
                view === "list"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
              }`}
          >
            List
          </button>

          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1.5 text-sm rounded-md border transition
              ${
                view === "grid"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
              }`}
          >
            Grid
          </button>
        </div>

      </div>
    </div>
  );
}