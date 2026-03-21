import mongoose from "mongoose";

const InstructorApplicationSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    expertise: String,
    experience: String,
    portfolio: String,
    background: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export default mongoose.models.InstructorApplication ||
  mongoose.model("InstructorApplication", InstructorApplicationSchema);
