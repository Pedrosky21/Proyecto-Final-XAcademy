import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../../services/CategoryService';

export class CategoryController{
    categoryService = new CategoryService();
    
    getAllCategories = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            next(error)
        }
    }
}

