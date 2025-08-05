import Turn from "../../core/models/sequelize/Turn"

export class TurnRepository{

  createTurn=async():Promise<any>=>{
    return Turn.create({
      startDateTime:"14-42-123",
      endDateTime:"123-123-23",
      turnStateId:1,
      courtId:2
    })
  }
}