const express = require("express");
const router = express.Router();
const {
    getUsers,
    deleteUser,
    changeRole,
    getPendingHostels,
    updateHostelStatus
} = require("../controllers/adminController");

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/users", auth, authorizeRoles("admin"), getUsers);
router.delete("/users/:id", auth, authorizeRoles("admin"), deleteUser);
router.put("/users/:id/role", auth, authorizeRoles("admin"), changeRole);

router.get("/hostels/pending", auth, authorizeRoles("admin"), getPendingHostels);
router.put("/hostels/:id/status", auth, authorizeRoles("admin"), updateHostelStatus);

module.exports = router;
