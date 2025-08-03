import Position from "../../core/models/PositionModel";


export class PositionRepository{
  getAllPositions=async():Promise<any>=>{
    return await Position.findAll();
  }

  getPositionById=async(id:number):Promise<Position|null>=>{
    return await Position.findByPk(id)
  }
}