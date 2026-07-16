require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedAdminUsers = require("./utils/seedAdmins");
const { MongoMemoryServer } = require("mongodb-memory-server");

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);
const localMongoUri = "mongodb://127.0.0.1:27017/spotmystay";
let memoryServer;

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
        dbConnected: !!app.locals.dbConnected,
    };
    if (missingEnvVars.length > 0) {
        info.status = "warning";
        info.missing = missingEnvVars;
        return res.status(200).json(info);
    }
    return res.status(200).json(info);
});

// Only mount API routes if env vars are present. This avoids crashing the service
// when environment variables are missing or DB can't connect.
// Track DB connection state
app.locals.dbConnected = false;

const mountApiRoutes = () => {
    app.use("/api/auth", require("./routes/authRoutes"));
    app.use("/api/hostels", require("./routes/hostelRoutes"));
    app.use("/api/admin", require("./routes/adminRoutes"));
    app.use("/api/bookings", require("./routes/bookingRoutes"));
    app.use("/api/reviews", require("./routes/reviewRoutes"));
};

if (missingEnvVars.length === 0) {
    const connectWithFallbacks = async () => {
        const connectionTargets = [process.env.MONGO_URI, localMongoUri].filter(Boolean);
        let lastError;

        for (const uri of connectionTargets) {
            try {
                process.env.MONGO_URI = uri;
                await connectDB();
                return;
            } catch (err) {
                lastError = err;
                console.warn(`MongoDB connection failed for ${uri}:`, err.message);
            }
        }

        try {
            memoryServer = await MongoMemoryServer.create({
                instance: { dbName: "spotmystay" },
            });
            process.env.MONGO_URI = memoryServer.getUri();
            await connectDB();
            console.warn("Using in-memory MongoDB fallback for development");
            return;
        } catch (err) {
            lastError = err;
            throw lastError;
        }
    };

    connectWithFallbacks()
        .then(() => {
            app.locals.dbConnected = true;
            try {
                seedAdminUsers();
            } catch (err) {
                console.error("seedAdminUsers error:", err.message);
            }
            mountApiRoutes();
        })
        .catch((err) => {
            console.error("connectDB failed:", err.message);
            // Do not mount API routes if DB connection failed
        });
} else {
    console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
}

// If DB is not connected, return 503 for API requests to avoid Mongoose buffering timeouts
app.use('/api', (req, res, next) => {
    if (!app.locals.dbConnected) {
        return res.status(503).json({
            status: 'error',
            message: 'Service unavailable — database not connected',
        });
    }
    next();
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
    app.listen(PORT, () => console.log("Server running on port", PORT));
}

module.exports = app;
