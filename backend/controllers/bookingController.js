const Booking = require("../models/Booking");
const Hostel = require("../models/Hostel");

exports.requestBooking = async (req, res) => {
    console.log("Booking request for hostel:", req.params.hostelId);
    console.log("User:", req.user._id);

    try {
        const booking = new Booking({
            hostel: req.params.hostelId,
            user: req.user._id
        });

        await booking.save();
        console.log("Booking saved:", booking);
        res.json({ message: "Booking requested" });
    } catch (err) {
        console.error("Booking error:", err);
        res.status(500).json({ message: "Error booking" });
    }
};

exports.approveBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("hostel");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Check if the user is the owner of the hostel
        // Since populate("hostel") gives the hostel object, we need to care about owner type
        // The original code assumed hostel.owner is directly the ID or populated object?
        // Let's check Hostel model if needed, but original code: booking.hostel.owner.toString() !== req.user._id.toString()

        // Ensure robust check
        if (booking.hostel.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to approve this booking" });
        }

        booking.status = "approved";
        await booking.save();

        res.json({ message: "Booking approved", booking });
    } catch (err) {
        console.error("Approve error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.rejectBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("hostel");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.hostel.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to reject this booking" });
        }

        booking.status = "rejected";
        await booking.save();

        res.json({ message: "Booking rejected", booking });
    } catch (err) {
        console.error("Reject error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.cancelBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.json({ message: "Not found" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled" });
};

exports.getUserBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate("hostel");

    res.json(bookings);
};

exports.getOwnerBookings = async (req, res) => {
    const hostels = await Hostel.find({ owner: req.user._id });

    const hostelIds = hostels.map(h => h._id);

    const bookings = await Booking.find({
        hostel: { $in: hostelIds }
    }).populate("user hostel");

    res.json(bookings);
};
