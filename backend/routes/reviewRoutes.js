const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addReview, getReviews } = require("../controllers/reviewController");

router.post("/:hostelId", auth, addReview);
router.get("/:hostelId", getReviews);

module.exports = router;
