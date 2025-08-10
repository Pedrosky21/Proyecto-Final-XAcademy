import { WeekDayEnum } from "../components/turn-table/enums/WeekDayEnum"
import { TableTurn } from "../components/turn-table/types/TableTurn"
import { Court } from "./Court"

export class DiagramatingTurnsCourt{
  courtId:number
  index:number
  days:TableTurn[]

  constructor(court:Court, days:number[]){
    this.courtId=court.id
    this.index=court.index
    this.days= days.map((day)=>{return{
      label:WeekDayEnum[day],
      startHours:[]
    }})
  }
}