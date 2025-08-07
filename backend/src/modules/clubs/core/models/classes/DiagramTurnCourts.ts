import { DiagramTurnWeekDay } from "./DiagramTurnDays"

export class DiagramTurnCourt{
  id:number
  days:DiagramTurnWeekDay[]

  constructor(data:any){
    this.id=Number(data.courtId)
    this.days= data.days.map((day:any)=>new DiagramTurnWeekDay(day))
  }

  validate():string|null{
    if(!this.id || typeof(this.id)!=="number"){
      return "Todas las canchas deben tener un id numérico"
    }
    
    const seenWeekDay = new Set<number>();
    for (const day of this.days){
      if(seenWeekDay.has(day.weekDay)){
        return `La cancha ${this.id} tiene el dia ${day.weekDay} repetido`
      }
      seenWeekDay.add(day.weekDay)
      const validationError= day.validate(this.id)
      if(validationError){
        return validationError
      }
    }
    return null
  }
}