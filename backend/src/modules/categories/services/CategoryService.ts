
import { CategoryRepository } from "../adapters/repositories/CategoryRepository";
import Categoria from "../core/models/CategoryModel";

export class CategoryService{
  categoriaRepository = new CategoryRepository();
  
  getAllCategories = async (): Promise<any> => {
    return await this.categoriaRepository.getAllCategories();
  }

  getCategoryById= async(id:number):Promise<Categoria|null>=>{
    return await this.categoriaRepository.getCategoryById(id)
  }
}