import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    username: string;
    passwordHash: string;
    role: "Admin" | "Moderator" | "User";
    bannerColor: string;
    accentColor: string;
    joinDate: Date;
    description?: string;
    location?: string;
    website?: string;
    github?: string;
    twitter?: string;
    skills?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "User", enum: ["Admin", "Moderator", "User"] },
    bannerColor: { type: String, default: "#2391c4" },
    accentColor: { type: String, default: "#2391c4" },
    joinDate: { type: Date, default: Date.now() },
    description: { type: String },
    location: { type: String },
    website: { type: String },
    github: { type: String },
    twitter: { type: String },
    skills: { type: String }
}, { timestamps: true });

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: any) => {
        delete ret.passwordHash;
        return ret;
    }
});

export const UserModel = model<IUser>("User", UserSchema); 