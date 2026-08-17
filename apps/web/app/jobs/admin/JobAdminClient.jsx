"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobStatusBadge from "@/components/JobStatusBadge";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function JobAdminClient({ authenticated, jobs: initialJobs }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [removingId, setRemovingId] = useState("");

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      const res = await fetch("/api/jobs/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }
      setPassword("");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await fetch("/api/jobs/admin/logout", { method: "POST" });
      router.refresh();
    } catch {
      toast.error("Could not log out");
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleToggle = async (jobId, nextStatus) => {
    const previous = jobs;
    setUpdatingId(jobId);
    setJobs((current) =>
      current.map((job) =>
        job.id === jobId ? { ...job, status: nextStatus } : job
      )
    );

    try {
      const res = await fetch("/api/jobs/admin/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        setJobs(previous);
        toast.error(data.error || "Could not update status");
        return;
      }
      toast.success(
        nextStatus === "open" ? "Vacancy marked open" : "Vacancy marked closed"
      );
    } catch {
      setJobs(previous);
      toast.error("Something went wrong");
    } finally {
      setUpdatingId("");
    }
  };

  const handleRemove = async (job) => {
    const confirmed = window.confirm(
      `Remove “${job.title}”? It will no longer appear on the careers page.`
    );
    if (!confirmed) return;

    const previous = jobs;
    setRemovingId(job.id);
    setJobs((current) => current.filter((item) => item.id !== job.id));

    try {
      const res = await fetch("/api/jobs/admin/jobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setJobs(previous);
        toast.error(data.error || "Could not remove job");
        return;
      }
      toast.success("Job removed");
    } catch {
      setJobs(previous);
      toast.error("Something went wrong");
    } finally {
      setRemovingId("");
    }
  };

  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <main className="bg-gray-50 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobs admin</h1>
          <p className="text-gray-600 mb-8">
            Open, close, or remove vacancies. Closed roles stay visible on the
            careers page with a Closed badge and cannot be applied to.
          </p>

          {!authenticated ? (
            <form
              onSubmit={handleLogin}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-8 max-w-md"
            >
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Admin password
              </label>
              <div className="relative mb-4">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border rounded-lg p-3 pr-12 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((open) => !open)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-60"
              >
                {loginLoading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <Link
                  href="/jobs/admin/new"
                  className="inline-flex bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-800 transition"
                >
                  Add job
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {logoutLoading ? "Signing out…" : "Sign out"}
                </button>
              </div>

              {jobs.length === 0 ? (
                <p className="text-gray-600">
                  No vacancies yet.{" "}
                  <Link href="/jobs/admin/new" className="text-blue-600 font-medium">
                    Add a job
                  </Link>
                  .
                </p>
              ) : (
                <ul className="space-y-4">
                  {jobs.map((job) => (
                    <li
                      key={job.id}
                      className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-1">
                          {job.department}
                        </p>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                          {job.title}
                        </h2>
                        <JobStatusBadge status={job.status} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={
                            updatingId === job.id || removingId === job.id
                          }
                          onClick={() =>
                            handleToggle(
                              job.id,
                              job.status === "open" ? "closed" : "open"
                            )
                          }
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition disabled:opacity-60 ${
                            job.status === "open"
                              ? "bg-gray-800 text-white hover:bg-gray-900"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {updatingId === job.id
                            ? "Updating…"
                            : job.status === "open"
                              ? "Mark closed"
                              : "Mark open"}
                        </button>
                        <button
                          type="button"
                          disabled={
                            removingId === job.id || updatingId === job.id
                          }
                          onClick={() => handleRemove(job)}
                          className="px-4 py-2 rounded-lg font-semibold text-sm border border-red-200 text-red-700 hover:bg-red-50 transition disabled:opacity-60"
                        >
                          {removingId === job.id ? "Removing…" : "Remove"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
