import { Transaction } from "sequelize";
import { TurnRepository } from "../adapters/repositories/TurnRepository";
import { DiagramTurnCourt } from "../core/models/classes/DiagramTurnCourts";
import { NewTurn } from "../core/models/classes/NewTurn";
import TurnModel from "../core/models/sequelize/Turn";
import { NotFoundError } from "../../../errors/NotFoundError";
import { Turn } from "../core/models/classes/Turn";
import { UserTypeEnum } from "../../auth/core/models/enums/UserTypeEnum";

export class TurnService{
  turnRepository= new TurnRepository()

  diagramTurns=async(court: DiagramTurnCourt,year:number,month:number,transaction:Transaction):Promise<any>=>{
    for(const day of court.days){
      for(const week of [1,2,3,4,5]){
        const exactDay= this.getDateFromWeek(year, month-1, week, day.weekDay)

      // Evitar días fuera del mes
      if (exactDay.getMonth() !== month-1) continue;

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

  getCourtTurnsByWeek=async(courtId:number, startDate:Date):Promise<any>=>{
    const endDate= new Date(startDate)
    endDate.setDate(startDate.getDate()+6)
    return await this.turnRepository.getCourtTurnsByWeek(courtId,startDate,endDate)
  }

  payTurn=async(turnId:number,userType:UserTypeEnum, playerName?:string):Promise<any>=>{
    const getTurn:TurnModel|null= await this.turnRepository.getTurnById(turnId)
    if(!getTurn){
      throw new NotFoundError("Turno no encontrado")
    }
    const currentTurn = new Turn(getTurn)

    currentTurn.state.setAsPaid(userType)

    return await this.turnRepository.updateTurnState(turnId,3,playerName)

  }
  reserveTurn=async(turnId:number,userType:UserTypeEnum,playerName?:string):Promise<any>=>{
    const getTurn:TurnModel|null= await this.turnRepository.getTurnById(turnId)
    if(!getTurn){
      throw new NotFoundError("Turno no encontrado")
    }
    const currentTurn = new Turn(getTurn)

    currentTurn.state.setAsReserved(userType)

    return await this.turnRepository.updateTurnState(turnId,2,playerName)

  }

  cancelPayment=async(turnId:number,userType:UserTypeEnum):Promise<any>=>{
    const getTurn:TurnModel|null= await this.turnRepository.getTurnById(turnId)
    if(!getTurn){
      throw new NotFoundError("Turno no encontrado")
    }
    const currentTurn = new Turn(getTurn)

    currentTurn.state.cancelPayment(userType)

    return await this.turnRepository.updateTurnState(turnId,2,undefined)

  }
  cancelReserve=async(turnId:number,userType:UserTypeEnum):Promise<any>=>{
    const getTurn:TurnModel|null= await this.turnRepository.getTurnById(turnId)
    if(!getTurn){
      throw new NotFoundError("Turno no encontrado")
    }
    const currentTurn = new Turn(getTurn)

    currentTurn.state.cancelReserved(userType)

    return await this.turnRepository.updateTurnState(turnId,1,undefined)

  }
}