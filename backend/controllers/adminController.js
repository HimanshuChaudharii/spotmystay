const User = require("../models/User");
const Hostel = require("../models/Hostel");

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
};

exports.changeRole = async (req, res) => {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { returnDocument: 'after' }
    );

    res.json({ message: "Role updated", user });
};

exports.getPendingHostels = async (req, res) => {
    const hostels = await Hostel.find({ isVerified: false }).populate("owner", "name email");
    res.json(hostels);
};

exports.updateHostelStatus = async (req, res) => {
    const { status } = req.body;

    if (status === "approved") {
        const hostel = await Hostel.findByIdAndUpdate(
            req.params.id,
            { isVerified: true },
            { returnDocument: 'after' }
        );
        res.json({ message: "Hostel approved successfully", hostel });
    } else if (status === "rejected") {
        await Hostel.findByIdAndDelete(req.params.id);
        res.json({ message: "Hostel rejected and deleted successfully" });
    } else {
        res.status(400).json({ message: "Invalid status update" });
    }
};
