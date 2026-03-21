"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseBreadcrumb from "./components/CourseBreadcrumb";
import { courses } from "@/data/courses";
import CourseCard from "./components/CourseCard";
import Pagination from "./components/Pagination";
import WhatsAppFloating from "@/components/WhatsAppFloating"

export default function Courses() {
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid"); // grid | list
  const [selectedCategory, setSelectedCategory] = useState(null); // category filter
  const itemsPerPage = 9;

  // Flatten courses correctly
  const allCourses = courses
    .filter((category) =>
      selectedCategory ? category.category === selectedCategory : true
    )
    .flatMap((category) =>
      category.items.map((course) => ({
        ...course, // spread title & description
        category: category.category,
      }))
    );

  const totalPages = Math.ceil(allCourses.length / itemsPerPage);
  const paginatedCourses = allCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />

      <CourseBreadcrumb
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        view={view}
        setView={setView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        coursesPerPage={itemsPerPage}
      />

      <section className="w-full flex justify-center px-4 py-8">
        <div
          className={`w-full max-w-7xl ${
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }`}
        >
          {paginatedCourses.map((course, index) => (
            <CourseCard key={index} course={course} view={view} />
          ))}
        </div>
      </section>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Footer />
      <WhatsAppFloating />
    </>
  );
}