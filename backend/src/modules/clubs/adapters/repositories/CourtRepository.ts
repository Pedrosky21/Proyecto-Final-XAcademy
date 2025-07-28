import { Transaction } from "sequelize";
import Court from "../../core/models/Courts";
import { NewCourt } from "../../core/models/NewCourt";

export class CourtRepository{

  createCourt=async(newCourt: NewCourt, idClub:number, courtNumber:number, transaction: Transaction):Promise<Court>=>{
    return await Court.create({
      number: courtNumber,
      idClub: idClub,
      wallMaterialId: newCourt.wallMaterialId,
      floorMaterialId: newCourt.floorMaterialId,
      roofted: newCourt.roofted
    }, {transaction})
  }
}