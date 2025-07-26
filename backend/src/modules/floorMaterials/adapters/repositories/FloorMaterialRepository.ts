import FloorMaterial from "../../core/FloorMaterial";


export class FloorMaterialRepository{
  getAllFloorMaterials=async():Promise<FloorMaterial[]>=>{
    return await FloorMaterial.findAll()
  }

  getFloorMaterialById=async(id:number):Promise<FloorMaterial|null>=>{
    return await FloorMaterial.findByPk(id)
  }
}