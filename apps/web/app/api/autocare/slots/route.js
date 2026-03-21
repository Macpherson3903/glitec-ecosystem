import connectDB from "@/lib/mongodb"
import Booking from "@/models/Booking"
import { serviceSlots } from "@/data/serviceSlots"

export async function GET(req) {

    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date")

    await connectDB()

    const bookings = await Booking.find({ date })

    const slotCount = {}

    bookings.forEach(b => {

        if (!slotCount[b.time]) slotCount[b.time] = 0

        slotCount[b.time]++

    })

    const availableSlots = serviceSlots.filter(slot => {

        return !slotCount[slot] || slotCount[slot] < 2

    })

    return Response.json({ availableSlots })
}