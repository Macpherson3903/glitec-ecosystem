"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { jobs, searchJobs } from "@/data/jobs";
import { Search } from "lucide-react";

export default function JobsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => searchJobs(query), [query]);

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <section className="relative w-full min-h-[320px] md:min-h-[380px] flex items-center justify-center text-center overflow-hidden">
          <Image
            src="/assets/instructor-heroImg.png"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0A2540]/75" />
          <div className="relative z-10 text-white px-6 max-w-3xl py-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Careers at Glitec
            </h1>
            <p className="text-lg md:text-xl text-gray-100">
              Help shape the next generation of technicians and professionals.
              Explore open roles and find a position that matches your skills.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
            Open positions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Use the search below to filter by job title, department, or
            keywords. Click a role to read the full description and apply.
          </p>

          <div className="relative max-w-xl mx-auto mb-12">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
              aria-hidden
            />
            <label htmlFor="job-search" className="sr-only">
              Search jobs
            </label>
            <input
              id="job-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, department, or skill…"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-left"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-600 py-8">
              No roles match &ldquo;{query}&rdquo;. Try a different keyword.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {filtered.map((job) => (
                <li key={job.id}>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="block bg-white rounded-xl shadow-md border border-gray-100 p-6 h-full hover:border-blue-300 hover:shadow-lg transition-all"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">
                      {job.department}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {job.summary}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span>{job.employmentType}</span>
                      <span aria-hidden>·</span>
                      <span>{job.location}</span>
                    </div>
                    <span className="inline-block mt-4 text-blue-600 font-medium">
                      View details →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-12 text-sm text-gray-500">
            Showing {filtered.length} of {jobs.length} role
            {jobs.length === 1 ? "" : "s"}
          </p>
        </section>
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
