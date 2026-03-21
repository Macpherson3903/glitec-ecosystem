import nodemailer from "nodemailer";
import connectToDB from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import { getJobById } from "@/data/jobs";

function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const jobId = formData.get("jobId");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const backgroundRaw = formData.get("background");
    const background =
      typeof backgroundRaw === "string" ? backgroundRaw.trim() : "";
    const file = formData.get("cv");

    const job = typeof jobId === "string" ? getJobById(jobId) : null;
    if (!job) {
      return Response.json(
        { error: "Invalid or missing job role" },
        { status: 400 }
      );
    }

    if (!file || typeof file === "string") {
      return Response.json({ error: "CV required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.length > 500 * 1024) {
      return Response.json({ error: "File too large" }, { status: 400 });
    }

    await connectToDB();

    await JobApplication.create({
      jobId: job.id,
      jobTitle: job.title,
      firstName,
      lastName,
      email,
      phone,
      background,
    });

    const trainingUser =
      process.env.TRAINING_EMAIL_USER || process.env.INSTRUCTOR_EMAIL_USER;
    const trainingPass =
      process.env.TRAINING_EMAIL_PASS || process.env.INSTRUCTOR_EMAIL_PASS;
    const trainingTo =
      process.env.TRAINING_EMAIL_TO || "training@glitecast.com";

    if (!trainingUser || !trainingPass) {
      console.error("TRAINING_EMAIL_USER / TRAINING_EMAIL_PASS not configured");
      return Response.json({ error: "Email not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: trainingUser,
        pass: trainingPass,
      },
    });

    const logoUrl = "https://glitecast.com/logo.png";

    const safeFirst = escapeHtml(String(firstName ?? ""));
    const safeLast = escapeHtml(String(lastName ?? ""));
    const safeEmail = escapeHtml(String(email ?? ""));
    const safePhone = escapeHtml(String(phone ?? ""));
    const safeBg = escapeHtml(background);
    const safeTitle = escapeHtml(job.title);

    await transporter.sendMail({
      from: `"GliteCast Training" <${trainingUser}>`,
      to: trainingTo,
      subject: `New job application: ${job.title}`,
      html: `
      <div style="font-family:sans-serif;max-width:600px">
        <img src="${logoUrl}" width="140" alt="Glitec"/>
        <h2>New Job Application</h2>
        <p><b>Role:</b> ${safeTitle}</p>
        <p><b>Name:</b> ${safeFirst} ${safeLast}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <p><b>Cover letter / background:</b></p>
        <p style="white-space:pre-wrap">${safeBg || "(Not provided)"}</p>
      </div>
    `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    await transporter.sendMail({
      from: `"GliteCast Training" <${trainingUser}>`,
      to: email,
      subject: "Your job application was received",
      html: `
      <div style="font-family:sans-serif;max-width:600px">
        <img src="${logoUrl}" width="140" alt="Glitec"/>
        <h2>Application received</h2>
        <p>Hello ${safeFirst},</p>
        <p>Thank you for applying for the <strong>${safeTitle}</strong> position at GliteCast.</p>
        <p>Our training team will review your application and contact you if you are shortlisted.</p>
        <p>Regards,<br/>GliteCast Training Team</p>
      </div>
    `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("MongoDB URI missing")) {
      return Response.json({ error: msg }, { status: 503 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
