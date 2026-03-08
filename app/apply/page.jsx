"use client";

import { useState } from "react";
import { courses as courseData } from "@/data/courses";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast, Toaster } from "react-hot-toast";
import WhatsAppFloating from "@/components/WhatsAppFloating"

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

  const startMonths = ["January", "May", "September"];
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
    if (f && f.size <= 500000) setFile(f);
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
      <Toaster position="top-right" />
      <Header />

      <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Apply for Admission</h1>

        <div className="bg-gray-50 p-6 rounded mb-8 text-gray-800 space-y-4">
          <p>
            Please fill out the form below if you are ready to begin your online
            Admissions Application. The application takes about 10 minutes to
            complete.
          </p>
          <p>
            If you have questions or wish to speak with an Admissions
            Representative prior to completing your application, please call us at{" "}
            <a
              href="tel:+2348167375717"
              className="text-blue-600 underline"
            >
              +234-816-737-5717
            </a>{" "}
            or email us at{" "}
            <a
              href="mailto:admissions@glitecast.com"
              className="text-blue-600 underline"
            >
              admissions@glitecast.com
            </a>
          </p>
          <h2 className="font-semibold text-lg mt-2">
            Upcoming Term Dates & Enrollment Deadlines
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Winter 2026 (January – April)</strong>
              <br />
              Start Date: January 12, 2026 <br />
              Enrollment Deadline: December 30, 2025
            </li>
            <li>
              <strong>Spring 2026 (May – August)</strong>
              <br />
              Start Date: May 11, 2026 <br />
              Enrollment Deadline: April 30, 2026
            </li>
            <li>
              <strong>Fall 2026 (September – December)</strong>
              <br />
              Start Date: September 7, 2026 <br />
              Enrollment Deadline: August 31, 2026
            </li>
          </ul>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          >
            <option value="">Select Course</option>
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
            <option value="">Select Start Month</option>
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
              placeholder="First Name"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
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
              placeholder="Year of Birth"
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
              <option value="">Select Gender</option>
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
            placeholder="Address"
            required
            className="border p-3 rounded"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
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
              placeholder="Primary Phone"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Primary Email"
              required
              className="border p-3 rounded flex-1"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span>Did you graduate from High/Secondary School?</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="graduatedHS"
                  value="Yes"
                  checked={form.graduatedHS === "Yes"}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="graduatedHS"
                  value="No"
                  checked={form.graduatedHS === "No"}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                No
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span>Are you currently employed?</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="employed"
                  value="Yes"
                  checked={form.employed === "Yes"}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="employed"
                  value="No"
                  checked={form.employed === "No"}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                No
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="border p-2 rounded"
            />
            <span className="text-gray-600">{file ? file.name : "No file chosen"}</span>
          </div>

          <select
            name="educationLevel"
            value={form.educationLevel}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          >
            <option value="">Select Education Level</option>
            {educationLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          {/* Emergency Contact Inputs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="emergencyName"
              value={form.emergencyName}
              onChange={handleChange}
              placeholder="Emergency Contact Name"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="text"
              name="emergencyRelationship"
              value={form.emergencyRelationship}
              onChange={handleChange}
              placeholder="Relationship"
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
              placeholder="Emergency Contact Phone"
              required
              className="border p-3 rounded flex-1"
            />
            <input
              type="email"
              name="emergencyEmail"
              value={form.emergencyEmail}
              onChange={handleChange}
              placeholder="Emergency Contact Email"
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
            I verify that the above information is accurate. (By clicking this checkbox, the applicant acknowledges the stipulations and conditions of admission to the School and attests to the accuracy of the information provided. Please sign and date below).
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
            I verify that the above information is accurate. I agree to the privacy policy.
            By submitting this form, I agree to receive messages from or on behalf of Glitec Advanced School of Technology and its affiliates as listed in the Privacy Policy regarding furthering my education. I understand that messages may be sent using automated technology. You may opt out at any time. Please view Privacy Policy or Contact Us for more details.
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