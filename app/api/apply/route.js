import { saveApplication } from "@/models/Application";
import transporter from "@/lib/mailer";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

    // Extract file if uploaded
    const fileField = formData.get("file");
    let file = null;

    if (fileField && fileField.size > 0) {
      file = {
        originalFilename: fileField.name,
        buffer: Buffer.from(await fileField.arrayBuffer()),
        type: fileField.type || "application/octet-stream",
      };
    }

    // Save application
    await saveApplication(data, file);

    // Format applicant data for admin email
    const applicantDetails = Object.entries(data)
      .map(([key, value]) => {
        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());

        return `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;font-weight:bold;">${label}</td>
          <td style="padding:8px;border:1px solid #ddd;">${value}</td>
        </tr>
      `;
      })
      .join("");

    try {
      // Email to applicant
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Application Received - Glitec Advanced School of Technology",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <img src="${SITE_URL}/assets/logo.png" alt="Glitec Logo" width="180" />
          
          <h2>Application Received</h2>
          
          <p>Dear ${data.firstName},</p>

          <p>
          We have successfully received your application for the course 
          <strong>${data.course}</strong>.
          </p>

          <p>Your application is currently under review by our admissions team.</p>

          <p>
          <strong>
          A follow-up email will be sent to you once your application has been confirmed.
          </strong>
          </p>

          <p>
          Thank you for choosing 
          <strong>Glitec Advanced School of Technology</strong>.
          </p>

          <p style="margin-top:20px;">
          Best regards,<br/>
          Admissions Team<br/>
          Glitec Advanced School of Technology
          </p>
        </div>
        `,
      });

      // Email to site owner
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Application - ${data.course}`,
        html: `
        <div style="font-family:Arial,sans-serif;max-width:800px;margin:auto;">
          <h2>New Application Submitted</h2>

          <p><strong>Applicant:</strong> ${data.firstName} ${data.lastName}</p>

          <table style="border-collapse:collapse;width:100%;margin-top:20px;">
            ${applicantDetails}
          </table>

          <p style="margin-top:20px;">
          <strong>Uploaded File:</strong> ${
            file?.originalFilename || "No file uploaded"
          }
          </p>

          <p style="margin-top:20px;">
          Submitted on: ${new Date().toLocaleString()}
          </p>
        </div>
        `,
        attachments: file
          ? [
              {
                filename: file.originalFilename,
                content: file.buffer,
                contentType: file.type,
              },
            ]
          : [],
      });
    } catch (mailError) {
      console.error("Email sending failed:", mailError);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Application error:", error);

    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};