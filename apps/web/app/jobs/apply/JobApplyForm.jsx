"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { toast, Toaster } from "react-hot-toast";
import { jobs } from "@/data/jobs";

function JobApplyFormInner() {
  const searchParams = useSearchParams();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    const q = searchParams.get("jobId");
    if (q && jobs.some((j) => j.id === q)) {
      setJobId(q);
    }
  }, [searchParams]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 500 * 1024;

    if (file.size > maxSize) {
      toast.error("File must be less than 500KB");
      e.target.value = "";
      setFileName("");
      return;
    }

    setFileName(file.name);
    toast.success("CV uploaded successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const file = formData.get("cv");
    if (!file || !file.size) {
      toast.error("Please upload your CV");
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error("File must be less than 500KB");
      return;
    }

    if (!jobId) {
      toast.error("Please select a position");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/job-application", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Submission failed");
        return;
      }

      toast.success("Application submitted successfully");
      form.reset();
      setFileName("");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Toaster position="top-right" />

      <main className="bg-gray-50">
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Job application
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete the form below and upload your CV. Our training team will
            review your application and contact you if you are shortlisted.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-10">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Application form
            </h2>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-2">
                <label
                  htmlFor="jobId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Position
                </label>
                <select
                  id="jobId"
                  name="jobId"
                  required
                  value={jobId}
                  onChange={(e) => setJobId(e.target.value)}
                  className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="">Select a position</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title}
                    </option>
                  ))}
                </select>
              </div>

              <input
                name="firstName"
                type="text"
                placeholder="First name"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone number"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CV (max 500KB, PDF or Word)
                </label>
                <input
                  name="cv"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full max-w-sm bg-blue-50 border border-blue-200 text-sm rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {fileName && (
                  <p className="text-sm text-gray-500 mt-2">{fileName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="job-background"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cover letter or relevant experience{" "}
                  <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <textarea
                  id="job-background"
                  name="background"
                  rows={5}
                  placeholder="Optional — add context beyond your CV"
                  className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-60"
              >
                {loading ? "Submitting…" : "Submit application"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloating />
    </>
  );
}

export default function JobApplyForm() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] flex items-center justify-center text-gray-600">
          Loading…
        </div>
      }
    >
      <JobApplyFormInner />
    </Suspense>
  );
}
