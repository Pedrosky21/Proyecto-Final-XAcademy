import { Transaction } from "sequelize";
import { TurnRepository } from "../adapters/repositories/TurnRepository";
import { DiagramTurnCourt } from "../core/models/classes/DiagramTurnCourts";
import { NewTurn } from "../core/models/classes/NewTurn";

export class TurnService{
  turnRepository= new TurnRepository()

  diagramTurns=async(court: DiagramTurnCourt,year:number,month:number,transaction:Transaction):Promise<any>=>{
    for(const day of court.days){
      for(const week of [1,2,3,4,5]){
        const exactDay= this.getDateFromWeek(year, month, week, day.weekDay)

      // Evitar días fuera del mes
      if (exactDay.getMonth() !== month) continue;

      for (const turn of day.turns) {
        const[hours,minutes]=turn.split(":").map(Number)
        const turnDate = new Date(exactDay); 
        turnDate.setHours(hours,minutes,0,0)
        const newTurn=  new NewTurn(turnDate,court.id)
        await this.turnRepository.createTurn(newTurn,transaction)
      }
      }
    }
  }

  private getDateFromWeek(year: number, month: number, weekNumber: number, weekDay: number): Date {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstWeekDay = firstDayOfMonth.getDay();

    const offset = (7 * (weekNumber - 1)) + ((weekDay - firstWeekDay + 7) % 7);
    return new Date(year, month, 1 + offset);
  }
}