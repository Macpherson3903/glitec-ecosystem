import Booking from "@/models/Booking"
import connectToDB from "@/lib/mongodb"

export async function GET(req) {
    try {
        await connectToDB()

        const url = new URL(req.url)
        const email = url.searchParams.get("email")?.toLowerCase()?.trim()

        if (!email) {
            return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 })
        }

        const bookings = await Booking.find({ email }).sort({ createdAt: -1 })
        return new Response(JSON.stringify(bookings), { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), { status: 500 })
    }
}