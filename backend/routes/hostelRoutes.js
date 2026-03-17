const express = require("express");
const router = express.Router();
const {
    getHostels,
    getMyHostels,
    getHostelById,
    addHostel,
    updateHostel,
    deleteHostel
} = require("../controllers/hostelController");

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/my", auth, authorizeRoles("owner"), getMyHostels);
router.get("/", getHostels);

router.post("/add", auth, authorizeRoles("owner"), addHostel);
router.get("/:id", getHostelById);
router.put("/:id", auth, authorizeRoles("owner"), updateHostel);
router.delete("/:id", auth, authorizeRoles("owner"), deleteHostel);

module.exports = router;
