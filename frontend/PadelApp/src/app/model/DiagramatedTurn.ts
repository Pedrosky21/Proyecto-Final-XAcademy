import { Court } from "./Court"

export class DiagramatingTurnsCourt{
  courtId:number
  index:number
  days:{
    weekDay:number,
    turns:string[]
  }[]

  constructor(court:Court, days:number[]){
    this.courtId=court.id
    this.index=court.index
    this.days= days.map((day)=>{return{
      weekDay:day,
      turns:[]
    }})
  }
}