export class NewTurn{
  startDate:Date
  endDate:Date
  courtId:number

  constructor(turnTime: Date,courtId:number){
    this.startDate= turnTime
    this.endDate = new Date(turnTime.getTime() + 90 * 60 * 1000);
    console.log(this.endDate)
    this.courtId= courtId
  }
}