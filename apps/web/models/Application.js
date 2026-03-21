import mongoose from "mongoose";
import connectToDB from "@/lib/mongodb";

const applicationSchema = new mongoose.Schema(
  {
    course: String,
    startMonth: String,
    firstName: String,
    lastName: String,
    birthYear: Number,
    gender: String,
    address: String,
    state: String,
    country: String,
    phone: String,
    email: String,
    graduatedHS: Boolean,
    educationLevel: String,
    emergencyName: String,
    emergencyRelationship: String,
    emergencyPhone: String,
    emergencyEmail: String,
    employed: Boolean,
    remark: String,
    date: Date,
    infoConfirmed: Boolean,
    agreeToMessages: Boolean,
    fileName: String,
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

let ApplicationModel;
try {
  ApplicationModel = mongoose.model("Application");
} catch {
  ApplicationModel = mongoose.model("Application", applicationSchema);
}

export async function saveApplication(data, file) {
  await connectToDB();

  const exists = await ApplicationModel.findOne({
    email: data.email,
    course: data.course,
  });

  if (exists) {
    throw new Error("You have already submitted an application for this course");
  }

  const appData = {
    ...data,
    graduatedHS: data.graduatedHS === "Yes",
    employed: data.employed === "Yes",
    fileName: file?.originalFilename || null,
  };

  return await ApplicationModel.create(appData);
}

export default ApplicationModel;