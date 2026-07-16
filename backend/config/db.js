const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI not provided');
    }
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Error:", error.message);
        throw error;
    }
};

module.exports = connectDB;
