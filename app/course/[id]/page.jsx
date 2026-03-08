// app/course/[id]/page.jsx
import Link from "next/link";
import { courses } from "@/data/courses";
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default async function CourseDetails({ params }) {
  const { id } = await params; // unwrap params if async
  const allCourses = courses.flatMap((cat) => cat.items);
  const course = allCourses.find((c) => c.id === id);

  if (!course)
    return (
      <section className="max-w-3xl mx-auto p-6 my-10 text-center">
        <p className="text-xl font-semibold text-red-600">Course not found</p>
        <Link href="/course" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Courses
        </Link>
      </section>
    );

  return (
    <>
    <Header />
    <section className="max-w-5xl mx-auto p-6 my-10">
      <Link href="/course" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Courses
      </Link>
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <p className="text-lg mb-6">{course.description}</p>

      {course.syllabus && course.syllabus.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-3">What You'll Learn</h2>
          <ul className="list-disc pl-6 mb-6">
            {course.syllabus.map((item, idx) => (
              <li key={idx} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      <Link
        href="/apply"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Apply Now
      </Link>
    </section>
    <Footer />
    </>
  );
}