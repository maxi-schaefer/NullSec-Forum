import { Schema, model, Document, Types } from "mongoose";

interface IThread extends Document {
    title: string;
    category: Types.ObjectId;
    author: Types.ObjectId;
    pinned: boolean;
    locked: boolean;
    replyCount: number;
    lastPostAt?: Date;
    lastPostBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ThreadSchema = new Schema<IThread>({
    title: { type: String, required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    pinned: { type: Boolean, default: false },
    locked: { type: Boolean, default: false },
    replyCount: { type: Number, default: 0 },
    lastPostAt: { type: Date },
    lastPostBy: { type: Types.ObjectId, ref: "User" }
}, { timestamps: true });

export const ThreadModel = model<IThread>("Thread", ThreadSchema);