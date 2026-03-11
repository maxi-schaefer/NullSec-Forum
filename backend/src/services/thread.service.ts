import { ThreadModel } from "../models/Thread";

export class ThreadService {
    static async getThreadsByCategory(categoryId: string) {
        return ThreadModel.find({ category: categoryId })
        .sort({ pinned: -1, lastPostAt: -1, createdAt: -1 })
        .populate("author", "username")
        .lean()
    }

    static async getById(threadId: string) {
        const thread = await ThreadModel.findById(threadId)
            .populate("author", "username")
            .populate("category", "name")
            .lean();

        if (!thread) throw new Error("Thread not found");
        return thread;
    }

    static async create(data: {
        title: string;
        category: string;
        author: string;
    }) {
        const thread = await ThreadModel.create({
            title: data.title,
            category: data.category,
            author: data.author
        });

        return thread.toJSON();
    }

    static async update(threadId: string, data: Partial<{ title: string; pinned: boolean; locked: boolean; }>) {
        const thread = await ThreadModel.findByIdAndUpdate(threadId, data, { new: true });
        if (!thread) throw new Error("Thread not found");
        return thread.toJSON();
    }

    static async delete(threadId: string) {
        const thread = await ThreadModel.findByIdAndDelete(threadId);
        if (!thread) throw new Error("Thread not found");
        return true;
    }

    static async incrementReply(threadId: string, userId: string) {
        const thread = await ThreadModel.findByIdAndUpdate(
            threadId,
            { 
                $inc: { replyCount: 1 },
                lastPostAt: new Date(),
                lastPostBy: userId
            },
            { new: true }
        );
        if (!thread) throw new Error("Thread not found");
        return thread.toJSON();
    }
}