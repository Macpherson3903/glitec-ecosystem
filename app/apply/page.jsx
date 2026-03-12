"use client";

import { useState } from "react";
import { courses as courseData } from "@/data/courses";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast, Toaster } from "react-hot-toast";
import WhatsAppFloating from "@/components/WhatsAppFloating"
import ApplyDetails from "./components/ApplyDetails"

export default function ApplyPage() {
  const [form, setForm] = useState({
    course: "",
    startMonth: "",
    firstName: "",
    lastName: "",
    birthYear: "",
    gender: "",
    address: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    graduatedHS: "",
    educationLevel: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    emergencyEmail: "",
    employed: "",
    remark: "",
    date: "",
    infoConfirmed: false,
    agreeToMessages: false,
  });

  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const startMonths = ["January", "May","June", "September"];
  const educationLevels = [
    "High School",
    "Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
  ];

  const courses = courseData.flatMap((cat) =>
    cat.items.map((c) => ({ id: c.id, title: c.title }))
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size <= 500000) setFile(f);
    else {
      setFile(null);
      toast.error("File must be less than 500kb");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.infoConfirmed || !form.agreeToMessages) {
      toast.error("Please confirm all required checkboxes before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (file) data.append("file", file);

      const res = await fetch("/api/apply", { method: "POST", body: data });
      const result = await res.json();
      if (result.success) {
        toast.success("Application submitted successfully!");
        setForm({
          course: "",
          startMonth: "",
          firstName: "",
          lastName: "",
          birthYear: "",
          gender: "",
          address: "",
          state: "",
          country: "",
          phone: "",
          email: "",
          graduatedHS: "",
          educationLevel: "",
          emergencyName: "",
          emergencyRelationship: "",
          emergencyPhone: "",
          emergencyEmail: "",
          employed: "",
          remark: "",
          date: "",
          infoConfirmed: false,
          agreeToMessages: false,
        });
        setFile(null);
      } else toast.error("Error submitting application.");
    } catch {
      toast.error("Unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Toaster position="fixed top-right" />
<ApplyDetails />
      <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Apply for Admission</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          >
            <option value="">Select Course *</option>
            {courses.map((c) => (
              <option key={c.id} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>

          <select
            name="startMonth"
            value={form.startMonth}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          >
            <option value="">Select Start Month *</option>
            {startMonths.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name *"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name *"
              required
              className="border p-3 rounded flex-1"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              name="birthYear"
              value={form.birthYear}
              onChange={handleChange}
              placeholder="Year of Birth *"
              required
              className="border p-3 rounded flex-1"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="border p-3 rounded flex-1"
            >
              <option value="">Select Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address *"
            required
            className="border p-3 rounded"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State *"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country *"
              required
              className="border p-3 rounded flex-1"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Primary Phone *"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Primary Email *"
              required
              className="border p-3 rounded flex-1"
            />
          </div>

          {/* Upload CV (Optional) */}
          <div className="flex items-center gap-4">
            <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
              Upload CV
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-gray-600">
              {file ? file.name : "Optional"}
            </span>
          </div>

          <select
            name="educationLevel"
            value={form.educationLevel}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          >
            <option value="">Select Education Level *</option>
            {educationLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="emergencyName"
              value={form.emergencyName}
              onChange={handleChange}
              placeholder="Emergency Contact Name *"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="text"
              name="emergencyRelationship"
              value={form.emergencyRelationship}
              onChange={handleChange}
              placeholder="Relationship *"
              required
              className="border p-3 rounded flex-1"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="tel"
              name="emergencyPhone"
              value={form.emergencyPhone}
              onChange={handleChange}
              placeholder="Emergency Contact Phone *"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="email"
              name="emergencyEmail"
              value={form.emergencyEmail}
              onChange={handleChange}
              placeholder="Emergency Contact Email *"
              required
              className="border p-3 rounded flex-1"
            />
          </div>

          <textarea
            name="remark"
            value={form.remark}
            onChange={handleChange}
            placeholder="Remark (Optional)"
            className="border p-3 rounded"
          />

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              name="infoConfirmed"
              checked={form.infoConfirmed}
              onChange={handleChange}
              required
              className="accent-blue-600 mt-1"
            />
            I verify that the above information is accurate. <span className="text-red-600">*</span>
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          />

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              name="agreeToMessages"
              checked={form.agreeToMessages}
              onChange={handleChange}
              required
              className="accent-blue-600 mt-1"
            />
            I agree to the privacy policy and receive communications. <span className="text-red-600">*</span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white p-3 rounded mt-2 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </section>

      <WhatsAppFloating />
      <Footer />
    </>
  );
}