const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedAdminUsers = async () => {
    try {
        const admins = [
            { name: "Admin", email: "admin@gmail.com" },
            { name: "Harmeet", email: "harmeet@gmail.com" },
            { name: "Ayaan", email: "ayaan@gmail.com" }
        ];

        for (const adminData of admins) {
            const exists = await User.findOne({ email: adminData.email });
            if (!exists) {
                const hashedPassword = await bcrypt.hash("admin123", 10);
                const newAdmin = new User({
                    name: adminData.name,
                    email: adminData.email,
                    password: hashedPassword,
                    role: "admin"
                });
                await newAdmin.save();
                console.log(`Admin created: ${adminData.email}`);
            }
        }
        console.log("Admin seeding check completed.");
    } catch (error) {
        console.error("Error seeding admins:", error);
    }
};

module.exports = seedAdminUsers;
