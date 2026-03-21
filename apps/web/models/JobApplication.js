import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    background: { type: String, default: "" },
  },
  { timestamps: true }
);

JobApplicationSchema.index({ jobId: 1, createdAt: -1 });

export default mongoose.models.JobApplication ||
  mongoose.model("JobApplication", JobApplicationSchema);
