import { Court } from "./Court"

export class Club{
  
    address:string
    admisionRules:string
    cancelationRules:string
    cellNumber:number
    closingTimeTime:string
    courts?:Court[]
    id:number
    name:string
    openningTime:string
    responsableFirstName:string
    responsableLastName:string
    turnPrice:number
    
    constructor(data:any){
      this.address=data.address
      this.admisionRules=data.admisionRules
      this.cancelationRules=data.cancelationRules
      this.cellNumber=data.cellNumber
      this.closingTimeTime=data.closingTime
      this.courts= data.courts.map((court:any)=>new Court(court))
      this.id=data.id
      this.name=data.name
      this.openningTime= data.openingTime
      this.responsableFirstName=data.responsableFirstName
      this.responsableLastName= data.responsableLastName
      this.turnPrice =data.turnPrice
      

    }
 
}