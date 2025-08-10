import { Transaction } from "sequelize";
import Court from "../../core/models/sequelize/Courts";
import { NewCourt } from "../../core/models/classes/NewCourt";
import Turn from "../../core/models/sequelize/Turn";

export class CourtRepository{

  createCourt=async(newCourt: NewCourt, idClub:number, courtNumber:number, transaction: Transaction):Promise<Court>=>{
    return await Court.create({
      number: courtNumber,
      clubId: idClub, 
      wallMaterialId: newCourt.wallMaterialId,
      floorMaterialId: newCourt.floorMaterialId,
      roofed: newCourt.roofted
    }, {transaction})
  }

  getCourtTurnCountForMonth=async(courtId:number,year:number,month:number):Promise<any>=>{
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const count = await Turn.count({
      where: {
        courtId,
        startDateTime: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    });

    return count;
  }

}
