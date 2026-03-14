import connectToDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    await connectToDB();

    // Safety check: max 2 bookings per date + time
    const existing = await Booking.countDocuments({
      date: body.date,
      time: body.time,
    });

    if (existing >= 2) {
      return Response.json(
        { success: false, error: "Time slot full. Please choose another time." },
        { status: 400 }
      );
    }

    // Save booking
    const booking = await Booking.create(body);

    // Email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.AUTOCARE_EMAIL_USER,
        pass: process.env.AUTOCARE_EMAIL_PASS,
      },
    });

    const adminEmail = process.env.AUTOCARE_EMAIL_USER;

    // Admin notification
    const adminMessage = `
New AutoCare Booking

Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email}

Service: ${body.service}

Vehicle Brand: ${body.vehicleBrand}
Vehicle Model: ${body.vehicleModel}
Vehicle Year: ${body.vehicleYear}

Date: ${body.date}
Time: ${body.time}

Notes:
${body.notes}
`;

    await transporter.sendMail({
      from: `"Glitec AutoCare" <${process.env.AUTOCARE_EMAIL_USER}>`,
      to: adminEmail,
      subject: `New AutoCare Booking - ${body.service}`,
      text: adminMessage,
    });

    // Client confirmation
    if (body.email) {
      await transporter.sendMail({
        from: `"Glitec AutoCare" <${process.env.AUTOCARE_EMAIL_USER}>`,
        to: body.email,
        subject: "AutoCare Booking Confirmation",
        text: `
Hello ${body.name},

Your AutoCare booking has been received.

Service: ${body.service}
Date: ${body.date}
Time: ${body.time}

Our team will contact you if further details are required.

Thank you for choosing Glitec AutoCare.
        `,
      });
    }

    return Response.json({ success: true, booking });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}