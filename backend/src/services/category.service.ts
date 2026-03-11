import { CategoryModel } from "../models/Category";

export class CategoryService {
    static async getAll() {
        const categories = await CategoryModel.find().sort({ name: 1 }).lean();
        return categories;
    }
    
    static async getById(id: string) {
        const category = await CategoryModel.findById(id).lean();
        if(!category) throw new Error("Category not found");

        return category;
    }

    static async create(name: string, description?: string) {
        const existing = await CategoryModel.findOne({ name: name as string });
        if(existing) throw new Error("Category already exists");

        const category = await CategoryModel.create({
            name: name as string,
            description: description
        });

        return category.toJSON();
    }
    
    static async update(id: string, data: { name?: string; description?: string }) {
        const category = await CategoryModel.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if(!category) throw new Error("Category not found");

        return category.toJSON();
    }
    
    static async delete(id: string) {
        const category = await CategoryModel.findByIdAndDelete(id);
        if(!category) throw new Error("Category not found");
        return true;
    }
}