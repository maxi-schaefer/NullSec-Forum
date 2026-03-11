import { Request, Response } from "express";
import { ThreadService } from "../services/thread.service";

export class ThreadController {
    static async getAllByCategory(req: Request, res: Response) {
        try {
            const threads = await ThreadService.getThreadsByCategory(req.params.id as string);
            res.json(threads);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static async getById(req: Request, res: Response) {
        try {
            const thread = await ThreadService.getById(req.params.id as string);
            res.json(thread);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static async create(req: Request, res: Response) {
        try {
            const thread = await ThreadService.create({
                title: req.body.title as string,
                category: req.params.id as string,
                author: req.user?._id as string
            });
            res.status(201).json(thread);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static async update(req: Request, res: Response) {
        try {
            const thread = await ThreadService.update(req.params.id as string, req.body);
            res.json(thread);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static async delete(req: Request, res: Response) {
        try {
            const success = await ThreadService.delete(req.params.id as string);
            return res.json({ success });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async incrementReply(req: Request, res: Response) {
        try {
            const thread = await ThreadService.incrementReply(
                req.params.id as string,
                req.user?._id as string
            );
            res.json(thread);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}