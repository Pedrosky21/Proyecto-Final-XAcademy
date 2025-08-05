import { Transaction } from "sequelize";
import { TurnRepository } from "../adapters/repositories/TurnRepository";
import { DiagramTurnWeekDay } from "../core/models/classes/DiagramTurnDays";
import { DiagramTurnCourt } from "../core/models/classes/DiagramTurnCourts";
import { NewTurn } from "../core/models/classes/NewTurn";

export class TurnService{
  turnRepository= new TurnRepository()

  diagramTurns=async(court: DiagramTurnCourt,year:number,month:number,transaction:Transaction):Promise<any>=>{
    const createdTurns:NewTurn[]=[]
    for(const day of court.days){
      for(const week of [1,2,3,4,5]){
        for(const turn of day.turns){
          const turnDate= new Date(year,month,day.weekDay,week)
        }
      }
    }
  }
}