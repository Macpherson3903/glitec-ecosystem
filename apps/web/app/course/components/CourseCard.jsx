// components/CourseCard.js
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function CourseCard({ course, view }) {
  return (
    <div
      className={`relative bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 cursor-pointer ${view === "grid"
        ? "aspect-square flex flex-col justify-between"
        : "flex flex-col sm:flex-row sm:items-center sm:justify-between"
        }`}
    >
      <div>
        <p className="text-xs text-gray-500 mb-1">{course.category}</p>
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-4">{course.description}</p>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Link
          href="/apply"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Apply →
        </Link>
        <Link
          href={`/course/${course.id}`}
          className="text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          View More
        </Link>
      </div>

      {view === "grid" && (
        <GraduationCap
          size={28}
          className="text-gray-400 absolute bottom-4 right-4"
        />
      )}
    </div>
  );
}