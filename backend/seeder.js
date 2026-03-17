const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Hostel = require("./models/Hostel");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        await User.deleteMany();
        await Hostel.deleteMany();

        console.log("Data Destroyed...");

        const bcrypt = require("bcryptjs");
        const adminPassword = await bcrypt.hash("admin", 10);
        const userPassword = await bcrypt.hash("user", 10);
        const ownerPassword = await bcrypt.hash("owner", 10);

        const adminUser = await User.create({
            name: "Admin",
            email: "admin@hostel.com",
            password: adminPassword,
            role: "admin"
        });

        const userUser = await User.create({
            name: "Malik",
            email: "malik@hostel.com",
            password: userPassword,
            role: "user"
        });

        const OwnerUser = await User.create({
            name: "Anurag",
            email: "owner@hostel.com",
            password: ownerPassword,
            role: "owner"
        });

        console.log("Users Created: admin@hostel.com / admin | owner@hostel.com / owner");

        const hostels = [
            {
                name: "Backpacker Hostel",
                place: "Goa",
                price: 5000,
                amenities: ["WiFi", "AC", "Pool"],
                images: ["https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"],
                owner: adminUser._id,
                status: "approved"
            },
            {
                name: "Mountain View Hostel",
                place: "Manali",
                price: 8000,
                amenities: ["WiFi", "Heater", "Bonfire"],
                images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"],
                owner: OwnerUser._id,
                status: "approved"
            },
            {
                name: "City Center Dorms",
                place: "Bangalore",
                price: 6000,
                amenities: ["WiFi", "Laundry", "Cafe"],
                images: ["https://images.unsplash.com/photo-1768289269971-6171457bed13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvc3RlbCUyMHJvb218ZW58MHx8MHx8fDA%3D"],
                owner: OwnerUser._id,
                status: "approved"
            },
            {
                name: "Beachside Bunks",
                place: "Varkala",
                price: 7000,
                amenities: ["WiFi", "Sea View", "Yoga"],
                images: ["https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"],
                owner: OwnerUser._id,
                status: "approved"
            },
            {
                name: "Historic Heritage Hostel",
                place: "Jaipur",
                price: 4500,
                amenities: ["WiFi", "Rooftop", "Breakfast"],
                images: ["https://images.unsplash.com/photo-1596276020587-8044fe049813?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9zdGVsfGVufDB8fDB8fHww"],
                owner: OwnerUser._id,
                status: "approved"
            },
            {
                name: "Lakeside Hostel",
                place: "Udaipur",
                price: 5500,
                amenities: ["WiFi", "Lake View", "Boat Ride"],
                images: ["https://images.unsplash.com/photo-1695204905741-9d099a5989ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D"],
                owner: OwnerUser._id,
                status: "approved"
            },
            {
                name: "Forest Hideaway",
                place: "Coorg",
                price: 9000,
                amenities: ["WiFi", "Trekking", "Campfire"],
                images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
                owner: OwnerUser._id,
                status: "approved"
            },
            {
                name: "Urban Jungle Hostel",
                place: "Mumbai",
                price: 10000,
                amenities: ["WiFi", "AC", "Coworking"],
                images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"],
                owner: OwnerUser._id,
                status: "approved"
            },
            {
                name: "Beary Bestl Hostel",
                place: "Hampi",
                price: 4000,
                amenities: ["WiFi", "Cycle Rental", "Guide"],
                images: ["https://images.unsplash.com/photo-1630486440513-034ef4480384?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D"],
                owner: OwnerUser._id,
                status: "approved"
            },
            {
                name: "Hilltop Hostel",
                place: "Munnar",
                price: 7500,
                amenities: ["WiFi", "Tea Garden", "Trekking"],
                images: ["https://images.unsplash.com/photo-1705573369572-e30d26006707?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D"],
                owner: adminUser._id,
                status: "approved"
            }
        ];

        await Hostel.insertMany(hostels);
        console.log("10 Hostels Imported!");

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
