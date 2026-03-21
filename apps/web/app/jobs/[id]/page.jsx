import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getJobById, jobs } from "@/data/jobs";

export async function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = getJobById(id);
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
  const { id } = await params;
  const job = getJobById(id);

  if (!job) notFound();

  return (
    <>
      <Header />
      <article className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <Link
          href="/jobs"
          className="text-blue-600 hover:underline mb-6 inline-block text-sm font-medium"
        >
          ← Back to all jobs
        </Link>

        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">
          {job.department}
        </p>
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

        <Link
          href={`/jobs/apply?jobId=${encodeURIComponent(job.id)}`}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Apply for this role
        </Link>
      </article>
      <Footer />
    </>
  );
}
