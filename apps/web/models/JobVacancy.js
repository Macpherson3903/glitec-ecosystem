import mongoose from "mongoose";

const JobVacancySchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, unique: true },
    title: { type: String, default: "" },
    summary: { type: String, default: "" },
    description: { type: String, default: "" },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    employmentType: { type: String, default: "Full-time" },
    location: { type: String, default: "Port Harcourt, Rivers State, Nigeria" },
    department: { type: String, default: "" },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

if (mongoose.models.JobVacancy) {
  delete mongoose.models.JobVacancy;
}

export default mongoose.model("JobVacancy", JobVacancySchema);
