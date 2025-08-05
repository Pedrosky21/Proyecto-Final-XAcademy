import { Transaction } from "sequelize"
import { NewTurn } from "../../core/models/classes/NewTurn"
import Turn from "../../core/models/sequelize/Turn"

export class TurnRepository{

  createTurn=async(newTurn:NewTurn,transaction:Transaction):Promise<any>=>{
    return Turn.create({
      startDateTime:newTurn.startDate,
      endDateTime:newTurn.endDate,
      turnStateId:1,
      courtId:newTurn.courtId
    },{transaction})
  }
}