import WallMaterial from "../../core/models/WallMaterial";

export class WallMaterialRepository{

  getAllWallMaterials = async(): Promise <WallMaterial[]>=>{
    return await WallMaterial.findAll()
  }

  getWallMaterialById= async(id:number):Promise<WallMaterial|null>=>{
    return await WallMaterial.findByPk(id)
  }
}