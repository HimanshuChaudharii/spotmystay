require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const seedAdminUsers = require("./utils/seedAdmins");
const { MongoMemoryServer } = require("mongodb-memory-server");

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);
const localMongoUri = "mongodb://127.0.0.1:27017/spotmystay";
let memoryServer;
let seedChecked = false;

// If MONGO_URI is not set, fall back to local MongoDB for development
if (!process.env.MONGO_URI) {
    console.warn(`MONGO_URI not set — falling back to ${localMongoUri} for local development`);
    process.env.MONGO_URI = localMongoUri;
}

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Health endpoint for Render and debugging
app.get("/health", (req, res) => {
    const info = {
        status: "ok",
        env: {
            MONGO_URI: !!process.env.MONGO_URI,
            JWT_SECRET: !!process.env.JWT_SECRET,
        },
        dbConnected: mongoose.connection.readyState >= 1,
    };
    if (missingEnvVars.length > 0) {
        info.status = "warning";
        info.missing = missingEnvVars;
    }
    return res.status(200).json(info);
});

// Middleware to ensure DB connection is ready before processing API requests
const ensureDbConnected = async (req, res, next) => {
    if (missingEnvVars.length > 0) {
        return res.status(500).json({
            status: "error",
            message: `Missing required environment variables: ${missingEnvVars.join(", ")}`,
        });
    }

    if (mongoose.connection.readyState >= 1) {
        return next();
    }

    try {
        const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

        if (isProduction) {
            console.log("Connecting directly to MONGO_URI in production...");
            await connectDB();
        } else {
            const connectionTargets = [process.env.MONGO_URI, localMongoUri].filter(Boolean);
            let connected = false;

            for (const uri of connectionTargets) {
                try {
                    process.env.MONGO_URI = uri;
                    await connectDB();
                    connected = true;
                    break;
                } catch (err) {
                    console.warn(`MongoDB connection failed for ${uri}:`, err.message);
                }
            }

            if (!connected) {
                console.warn("Primary MongoDB connection failed, starting memory server...");
                if (!memoryServer) {
                    memoryServer = await MongoMemoryServer.create({
                        instance: { dbName: "spotmystay" },
                    });
                }
                process.env.MONGO_URI = memoryServer.getUri();
                await connectDB();
            }
        }

        // Seed admins if not checked already
        if (!seedChecked) {
            seedChecked = true;
            try {
                await seedAdminUsers();
            } catch (err) {
                console.error("seedAdminUsers error:", err.message);
            }
        }

        next();
    } catch (error) {
        console.error("Database connection middleware error:", error.message);
        return res.status(503).json({
            status: "error",
            message: "Database connection failed. Please check your MONGO_URI and MongoDB Atlas IP Whitelist settings.",
            details: error.message
        });
    }
};

// Mount DB connection check on all API routes
app.use("/api", ensureDbConnected);

// Mount API routes statically
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hostels", require("./routes/hostelRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

// In local development, trigger connection early so we see logs on startup
const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
if (!isProduction) {
    connectDB()
        .then(() => {
            console.log("Connected to MongoDB (development startup)");
            if (!seedChecked) {
                seedChecked = true;
                seedAdminUsers().catch(err => console.error("seedAdminUsers error:", err.message));
            }
        })
        .catch((err) => {
            console.warn("Initial development connection failed, will retry on first request:", err.message);
        });
}

const PORT = process.env.PORT || 5000;
if (require.main === module) {
    app.listen(PORT, () => console.log("Server running on port", PORT));
}

module.exports = app;
