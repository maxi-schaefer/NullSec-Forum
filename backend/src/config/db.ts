import mongoose from "mongoose";

export async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`📂 Connected to Database: ${conn.connection.host}`)
    } catch (error) {
        console.error(`❌ Failed to connect to Database: ${error}`)
    }
}