import { FloorMaterialRepository } from "../adapters/repositories/FloorMaterialRepository";
import FloorMaterial from "../core/FloorMaterial";


export class FloorMaterialService {
  floorMaterialRepository= new FloorMaterialRepository()

  getAllFloorMaterials=async():Promise<FloorMaterial[]>=>{
    return await this.floorMaterialRepository.getAllFloorMaterials()
  }

  getFloorMaterialById=async(id:number):Promise<FloorMaterial|null>=>{
    return await this.floorMaterialRepository.getFloorMaterialById(id)
  }
}