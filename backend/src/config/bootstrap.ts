import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User";
import { DefaultsConfig } from "./types";
import { CategoryModel } from "../models/Category";

export async function createDefaults() {
    const filePath = path.resolve(process.cwd(), "defaults.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed: DefaultsConfig = JSON.parse(raw);

    // Create default Categories
    const categories = await CategoryModel.find();
    if(categories.length <= 0) {
        parsed.categories?.forEach(async (c) => {
            await CategoryModel.create({ name: c.name, description: c.description });
            console.log(`📂 Created default Category ${c.name}!`);
        });
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