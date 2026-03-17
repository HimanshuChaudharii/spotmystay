const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
    name: String,
    place: String,
    price: Number,
    amenities: [String],
    images: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Hostel", hostelSchema);
