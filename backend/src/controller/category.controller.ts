import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
    static async getAll(req: Request, res: Response) {
        try {
            const categories = await CategoryService.getAll();
            res.json(categories);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const category = await CategoryService.create(req.body.name, req.body.description);
            res.status(201).json(category);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    static async getById(req: Request, res: Response) {
        try {
            const category = await CategoryService.getById(req.params.id as string);
            res.json(category);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    static async update(req: Request, res: Response) {
        try {
            const category = await CategoryService.update(req.params.id as string, req.body);
            res.json(category);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    static async delete(req: Request, res: Response) {
        try {
            const category = await CategoryService.delete(req.params.id as string);
            res.json(category);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}