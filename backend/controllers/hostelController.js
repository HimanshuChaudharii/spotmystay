const Hostel = require("../models/Hostel");

exports.getHostels = async (req, res) => {
    const { place } = req.query;

    const filter = place
        ? { place: { $regex: place, $options: "i" }, isVerified: true }
        : { isVerified: true };

    const hostels = await Hostel.find(filter).populate("owner", "name email");

    res.json(hostels);
};

exports.getMyHostels = async (req, res) => {
    const hostels = await Hostel.find({ owner: req.user._id }).populate("owner", "name email");
    res.json(hostels);
};

exports.getHostelById = async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id).populate("owner", "name email");
        if (!hostel) return res.status(404).json({ message: "Hostel not found" });
        res.json(hostel);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.addHostel = async (req, res) => {
    try {
        const hostel = new Hostel({
            ...req.body,
            owner: req.user._id,
            isVerified: false
        });

        await hostel.save();
        res.json({ message: "Hostel added", hostel });
    } catch (error) {
        console.error("Error adding hostel:", error);
        res.status(500).json({ message: "Failed to add hostel: " + error.message });
    }
};

exports.updateHostel = async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id);

        if (!hostel) return res.json({ message: "Hostel not found" });

        if (hostel.owner.toString() !== req.user._id.toString()) {
            return res.json({ message: "Not allowed" });
        }

        Object.assign(hostel, req.body);
        await hostel.save();

        res.json({ message: "Updated", hostel });
    } catch (error) {
        console.error("Error updating hostel:", error);
        res.status(500).json({ message: "Failed to update hostel: " + error.message });
    }
};

exports.deleteHostel = async (req, res) => {
    try {
        console.log("Delete request for:", req.params.id);
        console.log("Logged in user:", req.user._id);

        const hostel = await Hostel.findById(req.params.id);

        if (!hostel) {
            console.log("Hostel not found");
            return res.json({ message: "Hostel not found" });
        }

        console.log("Hostel owner:", hostel.owner);

        if (hostel.owner.toString() !== req.user._id.toString()) {
            console.log("Ownership mismatch");
            return res.json({ message: "Not allowed" });
        }

        await hostel.deleteOne();
        console.log("Deleted successfully");
        res.json({ message: "Deleted" });
    } catch (error) {
        console.error("Error deleting hostel:", error);
        res.status(500).json({ message: "Failed to delete hostel: " + error.message });
    }
};
