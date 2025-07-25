

export class NewPlayerRequest{
    firstName:string
    lastName:string
    birthDate:Date
    cellNumber:number
    pictureUrl:string
    userId:number
    categoryId:number
    positionId:number
    
    constructor(data:any){
      this.firstName= data.firstName
      this.lastName=data.lastName
      this.birthDate=data.birthDate
      this.cellNumber=data.cellNumber
      this.pictureUrl=data.pictureUrl
      this.userId= data.userId
      this.categoryId=data.categoryId
      this.positionId=data.positionId
    }

    public validate():string|null{
      if(!this.firstName || typeof(this.firstName)!=="string"){
        return "El firstName es un campo obligatorio y debe ser un string"
      }
      if(!this.lastName || typeof(this.lastName)!=="string"){
        return "El lastName es un campo obligatorio y debe ser un string"
      }
      if(!this.birthDate){
        return "El birthDate es un campo obligatorio y debe ser un date"
      }
      if(!this.cellNumber || typeof(this.cellNumber)!=="number"){
        return "El cellNumber es un campo obligatorio y debe ser un número"
      }
      if(!this.pictureUrl || typeof(this.pictureUrl)!=="string"){
        return "El pictureUrl es un campo obligatorio y debe ser un string"
      }
      if(!this.userId || typeof(this.userId)!=="number"){
        return "El userId es un campo obligatorio y debe ser un numero"
      }
      if(!this.positionId || typeof(this.positionId)!=="number"){
        return "El positionId es un campo obligatorio y debe ser un numero"
      }
      if(!this.categoryId || typeof(this.categoryId)!=="number"){
        return "El categoryId es un campo obligatorio y debe ser un numero"
      }
      return null
    }
}