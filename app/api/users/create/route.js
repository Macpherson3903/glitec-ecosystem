import connectToDB from "@/lib/mongodb";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();
    const { clerkId, firstName, lastName, email, role } = data;

    await connectToDB();

    const result = await User.updateOne(
      { clerkId },
      {
        $setOnInsert: {
          clerkId,
          firstName,
          lastName,
          email,
          role,
        },
      },
      { upsert: true }
    );

    const isNewUser = result.upsertedCount === 1;

    if (isNewUser) {
      const loginUrl = `${process.env.SITE_URL}/autocare`;

      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: true,
          auth: {
            user: process.env.AUTOCARE_EMAIL_USER,
            pass: process.env.AUTOCARE_EMAIL_PASS,
          },
          tls: { rejectUnauthorized: false },
        });

        // verify connection
        await transporter.verify();

        await transporter.sendMail({
          from: `"Glitec AutoCare" <${process.env.AUTOCARE_EMAIL_USER}>`,
          to: email,
          subject: "Welcome to Glitec AutoCare",
          html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td align="center">

<table width="600" style="background:#ffffff;margin-top:40px;border-radius:8px;overflow:hidden">

<tr>
<td style="background:#2563EB;padding:20px;text-align:center;color:#fff;font-size:22px;font-weight:bold">
Glitec AutoCare
</td>
</tr>

<tr>
<td style="padding:30px">

<h2 style="margin-top:0;color:#111">
Welcome ${firstName},
</h2>

<p style="color:#444;font-size:15px;line-height:1.6">
Your account has been successfully created with
<strong>Glitec AutoCare</strong>.
</p>

<p style="color:#444;font-size:15px;line-height:1.6">
You can now login to manage your vehicle services and track bookings.
</p>

<div style="text-align:center;margin:30px 0">
<a href="${loginUrl}"
style="
background:#2563EB;
color:#ffffff;
padding:14px 28px;
text-decoration:none;
border-radius:6px;
font-weight:bold;
font-size:15px;
display:inline-block
">
Login
</a>
</div>

<p style="font-size:13px;color:#777">
If you did not create this account, you can safely ignore this email.
</p>

<p style="margin-top:30px;color:#444">
— Glitec AutoCare Team
</p>

</td>
</tr>

<tr>
<td style="background:#f1f1f1;text-align:center;padding:15px;font-size:12px;color:#777">
© ${new Date().getFullYear()} Glitec AutoCare
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>
`,
        });

        console.log("Signup confirmation email sent to:", email);
      } catch (mailError) {
        console.error("SMTP Email Error:", mailError);
      }
    }

    return new Response(
      JSON.stringify({
        message: isNewUser ? "User created and email sent" : "User already exists",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        message: "Failed to save user",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}