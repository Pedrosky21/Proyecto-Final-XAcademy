import { PositionRepository } from "../adapters/repositories/PositionRepository";
import Position from "../core/models/PositionModel";


export class PositionService{
  positionRepository= new PositionRepository()

  getAllPositions=async():Promise<Position[]>=>{
    return await this.positionRepository.getAllPositions()
  }

  getPositionById=async(id:number):Promise<Position|null>=>{
    return await this.positionRepository.getPositionById(id)
  }
}