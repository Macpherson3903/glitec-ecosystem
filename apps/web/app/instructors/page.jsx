"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";

export default function InstructorApplication() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!file) {
      toast.error("Please upload your CV");
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error("File must be less than 500KB");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/instructor-application", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Submission failed");
        return;
      }

      toast.success("Application submitted successfully");

      // Clear the form after successful submission
      form.reset();
      setFileName("");

    } catch (error) {
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
        {/* Hero */}
        <section className="relative w-full h-[420px] flex items-center justify-center text-center">
          <Image
            src="/assets/instructor-heroImg.png"
            alt="Instructor teaching students"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-white px-6 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Become an Instructor
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Share your expertise and help train the next generation of tech professionals.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Join Our Training Team
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We are always looking for experienced professionals to join our instructor
            network. If you have industry experience and a passion for teaching,
            submit your application below and our team will review it.
          </p>
        </section>

        {/* Form */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-10">
            <h3 className="text-2xl font-semibold mb-8 text-center">
              Instructor Application Form
            </h3>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="expertise"
                type="text"
                placeholder="Area of Expertise"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="experience"
                type="text"
                placeholder="Years of Experience"
                required
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="portfolio"
                type="text"
                placeholder="LinkedIn or Portfolio"
                className="border rounded-lg p-3 w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              {/* CV upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CV (Max 500KB)
                </label>
                <input
                  name="cv"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-[240px] bg-blue-50 border border-blue-200 text-sm rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {fileName && (
                  <p className="text-sm text-gray-500 mt-2">{fileName}</p>
                )}
              </div>

              <textarea
                name="background"
                rows="5"
                placeholder="Tell us about your teaching experience or background"
                required
                className="border rounded-lg p-3 w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Application"}
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