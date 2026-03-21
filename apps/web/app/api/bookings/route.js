import Booking from "@/models/Booking";
import connectToDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDB();

    const bookings = await Booking.find({}).sort({ createdAt: -1 }); // newest first
    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}