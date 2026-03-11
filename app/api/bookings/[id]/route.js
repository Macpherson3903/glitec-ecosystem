import Booking from "@/models/Booking";
import connectToDB from "@/lib/mongodb";

export async function PATCH(req, { params }) {
  const { id } = await params; // ✅ unwrap the promise

  try {
    await connectToDB();
    const body = await req.json();

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true, returnDocument: 'after' } // ✅ fix deprecation warning
    );

    if (!updated) {
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to update booking:", err);
    return new Response(JSON.stringify({ error: "Failed to update booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}