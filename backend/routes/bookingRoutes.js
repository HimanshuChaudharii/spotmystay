const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    requestBooking,
    approveBooking,
    rejectBooking,
    cancelBooking,
    getUserBookings,
    getOwnerBookings
} = require("../controllers/bookingController");

router.get("/user", auth, getUserBookings);
router.get("/owner", auth, getOwnerBookings);
router.post("/:hostelId", auth, requestBooking);
router.put("/approve/:id", auth, approveBooking);
router.put("/reject/:id", auth, rejectBooking);
router.put("/cancel/:id", auth, cancelBooking);

module.exports = router;
