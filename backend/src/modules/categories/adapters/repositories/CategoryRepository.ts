import Category from "../../core/models/CategoryModel";



export class CategoryRepository {
  getAllCategories=async():Promise<Category[]> => {
       return await Category.findAll();
}
  getCategoryById= async(id:number):Promise<Category|null>=>{
    return await Category.findByPk(id)
  }
}