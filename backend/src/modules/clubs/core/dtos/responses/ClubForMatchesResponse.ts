export class ClubForMatch{
    address:string
    admisionRules:string
    cancelationRules:string
    cellNumber:number
    closingTime:string
    id:number
    name:string
    openningTime:string
    responsableFirstName:string
    responsableLastName:string
    turnPrice:number
    coindicentCourts?:number
    coincidentTurn?:number

    
    constructor(data:any){
      this.address=data.address
      this.admisionRules=data.admisionRules
      this.cancelationRules=data.cancelationRules
      this.cellNumber=data.cellNumber
      this.closingTime=data.closingTime.slice(5)
      this.id=data.id
      this.name=data.name
      this.openningTime= data.openningTime.slice(5)
      this.responsableFirstName=data.responsableFirstName
      this.responsableLastName= data.responsableLastName
      this.turnPrice =data.turnPrice
      this.coincidentTurn=data.totalTurns
      this.coindicentCourts=data.totalCourts
    }
}