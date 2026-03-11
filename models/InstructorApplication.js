import nodemailer from "nodemailer";
import connectToDB from "@/lib/mongodb";
import InstructorApplication from "@/models/InstructorApplication";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const expertise = formData.get("expertise");
    const experience = formData.get("experience");
    const portfolio = formData.get("portfolio");
    const background = formData.get("background");
    const file = formData.get("cv");

    if (!file) {
      return Response.json({ error: "CV required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.length > 500 * 1024) {
      return Response.json({ error: "File must be less than 500KB" }, { status: 400 });
    }

    await connectToDB();

    await InstructorApplication.create({
      firstName,
      lastName,
      email,
      phone,
      expertise,
      experience,
      portfolio,
      background,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.INSTRUCTOR_EMAIL_USER,
        pass: process.env.INSTRUCTOR_EMAIL_PASS,
      },
    });

   const logoUrl = `${process.env.SITE_URL}/logo.png`;
   
    await transporter.sendMail({
      from: `"GliteCast Training" <${process.env.INSTRUCTOR_EMAIL_USER}>`,
      to: process.env.INSTRUCTOR_EMAIL_USER,
      subject: "New Instructor Application",
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <img src="${logo}" width="140"/>
          <h2>New Instructor Application</h2>
          <p><b>Name:</b> ${firstName} ${lastName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Expertise:</b> ${expertise}</p>
          <p><b>Experience:</b> ${experience}</p>
          <p><b>Portfolio:</b> ${portfolio}</p>
          <p><b>Background:</b> ${background}</p>
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
      from: `"GliteCast Training" <${process.env.INSTRUCTOR_EMAIL_USER}>`,
      to: email,
      subject: "Instructor Application Received",
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <img src="${logo}" width="140"/>
          <h2>Application Received</h2>
          <p>Hello ${firstName},</p>
          <p>Your instructor application has been received.</p>
          <p>Our team will review your application and contact you if shortlisted.</p>
          <br/>
          <p>GliteCast Training Team</p>
        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}