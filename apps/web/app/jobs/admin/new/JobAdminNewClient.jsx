"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const EMPTY_FORM = {
  title: "",
  department: "",
  location: "Port Harcourt, Rivers State, Nigeria",
  employmentType: "Full-time",
  summary: "",
  description: "",
  responsibilities: "",
  requirements: "",
};

export default function JobAdminNewClient({ authenticated }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loginLoading, setLoginLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/jobs/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not add job");
        return;
      }
      toast.success("Job added");
      router.push("/jobs/admin");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const fieldClass =
    "border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600";

  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <main className="bg-gray-50 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 py-12">
          <Link
            href="/jobs/admin"
            className="text-blue-600 hover:underline mb-6 inline-block text-sm font-medium"
          >
            ← Back to jobs admin
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add a job</h1>
          <p className="text-gray-600 mb-8">
            Create a new vacancy. It will appear on the careers page as Open.
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
            <form
              onSubmit={handleCreate}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                name="title"
                required
                placeholder="Job title"
                value={form.title}
                onChange={(e) =>
                  setForm((current) => ({ ...current, title: e.target.value }))
                }
                className={fieldClass}
              />
              <input
                name="department"
                placeholder="Department"
                value={form.department}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    department: e.target.value,
                  }))
                }
                className={fieldClass}
              />
              <input
                name="employmentType"
                placeholder="Employment type"
                value={form.employmentType}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    employmentType: e.target.value,
                  }))
                }
                className={fieldClass}
              />
              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    location: e.target.value,
                  }))
                }
                className={fieldClass}
              />
              <textarea
                name="summary"
                rows={3}
                placeholder="Short summary (shown on the job card)"
                value={form.summary}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    summary: e.target.value,
                  }))
                }
                className={`${fieldClass} md:col-span-2`}
              />
              <textarea
                name="description"
                rows={4}
                placeholder="Full description"
                value={form.description}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    description: e.target.value,
                  }))
                }
                className={`${fieldClass} md:col-span-2`}
              />
              <textarea
                name="responsibilities"
                rows={5}
                placeholder="Responsibilities (one per line)"
                value={form.responsibilities}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    responsibilities: e.target.value,
                  }))
                }
                className={fieldClass}
              />
              <textarea
                name="requirements"
                rows={5}
                placeholder="Requirements (one per line)"
                value={form.requirements}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    requirements: e.target.value,
                  }))
                }
                className={fieldClass}
              />
              <button
                type="submit"
                disabled={saving}
                className="md:col-span-2 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-60"
              >
                {saving ? "Adding…" : "Add job"}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
