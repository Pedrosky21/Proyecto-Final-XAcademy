import { NewCourt } from "../../models/classes/NewCourt"

export class NewClubRequest{
  name:string
  address:string
  cellNumber:string
  responsableFirstName:string
  responsableLastName:string
  turnPrice:number
  openningTime:string
  closingTime:string
  admisionRules:string
  cancelationRules:string
  userId:number
  courts: NewCourt[]

  constructor(data:any,userId:number){
    this.name = data.name;
    this.address = data.address;
    this.cellNumber = data.cellNumber;
    this.responsableFirstName = data.responsableFirstName;
    this.responsableLastName = data.responsableLastName;
    this.turnPrice = data.turnPrice;
    this.openningTime = data.openingTime;
    this.closingTime = data.closingTime;
    this.admisionRules = data.admisionRules;
    this.cancelationRules = data.cancelationRules;
    this.userId=userId
    this.courts = data.courts? data.courts.map((court:any)=>new NewCourt(court)):[];
  }

  válidate():string|null{
    if(!this.name || typeof(this.name)!=="string"){
      return"El name es un campo obligatorio y debe ser un string"
    }
    if(!this.address|| typeof(this.address)!=="string"){
      return"El address es un campo obligatorio y debe ser un string"
    }
    if(!this.cellNumber|| typeof(this.cellNumber)!=="number" || Number(this.cellNumber)<0){
      return"El cellNumber es un campo obligatorio y debe ser un número positivo"
    }
    if(!this.responsableFirstName|| typeof(this.responsableFirstName)!=="string"){
      return"El responsableFirstName es un campo obligatorio y debe ser un string"
    }
    if(!this.responsableLastName|| typeof(this.responsableLastName)!=="string"){
      return"El responsableLastName es un campo obligatorio y debe ser un string"
    }
    if(!this.turnPrice|| typeof(this.turnPrice)!=="number"|| Number(this.turnPrice)<0){
      return"El turnPrice es un campo obligatorio y debe ser un number"
    }
    if(!this.openningTime|| typeof(this.openningTime)!=="string" || this.verifyHours(this.openningTime)){
      return"El openingTime es un campo obligatorio y debe ser una hora válida"
    }
    if(!this.closingTime|| typeof(this.closingTime)!=="string" || this.verifyHours(this.closingTime)){
      return"El closingTime es un campo obligatorio y debe ser una hora válida"
    }
    if(!this.userId|| typeof(this.userId)!=="number"){
      return"El userId es un campo obligatorio y debe ser un number"
    }
    if(this.closingTime<=this.openningTime){
      return "El openingTime debe ser menor al closingTime"
    }
    if(this.admisionRules && typeof(this.admisionRules)!=="string"){
      return "El admisionRules debe ser un string"
    }
    if(this.cancelationRules && typeof(this.cancelationRules)!=="string"){
      return "El cancelationRules debe ser un string"
    }
    if(this.courts.length===0){
      return "Se debe registrar al menos 1 cancha para registrar un club"
    }

    for (const court of this.courts) {
    const error = court.validate();
    if (error) {
      return error;
    }
  }

    return null
  }
  verifyHours(hours:string):boolean{
    const splitedHour=hours.split(":")
    const isInvalid:boolean=Number(splitedHour[0])<0 ||Number(splitedHour[0])>24||
    Number(splitedHour[1])<0|| Number(splitedHour[1])>59
    return isInvalid
  }
}