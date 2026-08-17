import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobStatusBadge from "@/components/JobStatusBadge";
import { getJobById } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  const job = await getJobById(id);
  if (!job) {
    return { title: "Job not found" };
  }
  return {
    title: `${job.title} | Careers at Glitec`,
    description: job.summary,
    openGraph: {
      title: job.title,
      description: job.summary,
    },
  };
}

export default async function JobDetailPage({ params }) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  const job = await getJobById(id);

  if (!job) notFound();

  const closed = job.status === "closed";

  return (
    <>
      <Header />
      <article className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <Link
          href="/jobs"
          className="text-blue-600 hover:underline mb-6 inline-block text-sm font-medium"
        >
          ← Back to all jobs
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            {job.department}
          </p>
          <JobStatusBadge status={job.status} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {job.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8">
          <span>{job.employmentType}</span>
          <span aria-hidden>·</span>
          <span>{job.location}</span>
        </div>

        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          {job.description}
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Key responsibilities
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {job.responsibilities.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Requirements
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {job.requirements.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </section>

        {closed ? (
          <p className="inline-block bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold">
            This vacancy is closed and is not accepting applications.
          </p>
        ) : (
          <Link
            href={`/jobs/apply?jobId=${encodeURIComponent(job.id)}`}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Apply for this role
          </Link>
        )}
      </article>
      <Footer />
    </>
  );
}
