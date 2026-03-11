import bcrypt from "bcrypt";
import { UserModel } from "../models/User";

// Register function
export async function register(username: string, password: string) {
    const existing = await UserModel.findOne({ username: username as string });
    if(existing) throw new Error("An user with the username already exists");

    const passowrdHash = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
        username: username as string,
        passwordHash: passowrdHash
    });

    return user;
}

// Login function
export async function login(username: string, password: string) {
    const user = await UserModel.findOne({ username: username as string });
    if(!user) throw new Error("User not found");

    const verifyPassword = await bcrypt.compare(password, user.passwordHash);
    if(!verifyPassword) throw new Error("Invalid credentials");

    return user;
}

// Get Self function
export async function getSelf(userId: string) {
    const user = await UserModel.findById(userId);
    if(!user) throw new Error("User not found");

    return user;
} 