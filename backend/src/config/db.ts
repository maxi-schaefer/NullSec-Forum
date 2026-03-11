import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserModel } from "../models/User";

export async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`📂 Connected to Database: ${conn.connection.host}`)
    } catch (error) {
        console.error(`❌ Failed to connect to Database: ${error}`)
    }
}

export async function bootstrapAdmin() {
    const users = await UserModel.find();
    if(users.length <= 0) {
        const admin_username = process.env.ADMIN_USERNAME!;
        const admin_password = process.env.ADMIN_PASSWORD!;
        const passwordHash = await bcrypt.hash(admin_password, 12);
        await UserModel.create({ username: admin_username, passwordHash, role: "Admin" });

        console.log(`👤 Created default Admin user: ${admin_username}:${admin_password}`)
    }
}