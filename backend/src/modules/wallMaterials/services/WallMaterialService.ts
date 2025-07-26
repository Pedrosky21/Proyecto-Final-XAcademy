import { WallMaterialRepository } from "../adapters/repositories/WallMaterialRepository";
import WallMaterial from "../core/models/WallMaterial";


export class WallMaterialService{
  wallMaterialRepository = new WallMaterialRepository();

  async getAllWallMaterials(): Promise<WallMaterial[]> {
    return await this.wallMaterialRepository.getAllWallMaterials();
  }

  async getWallMaterialById(id: number): Promise<WallMaterial | null> {
    return await this.wallMaterialRepository.getWallMaterialById(id);
  } 
}