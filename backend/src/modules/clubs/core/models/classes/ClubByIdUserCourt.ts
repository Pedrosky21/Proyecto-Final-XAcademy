
export class CourtByIdUser{
    id:number
    number:number
    wallMaterialName:string
    floorMaterialName:string
    roofted:boolean
    availableTurns:number
    reservedTurns:number
    paidTurns:number
    totalTurns:number
    constructor(data:any){
      this.id=data.id
      this.number=data.number
      this.wallMaterialName=data.wallMaterial
      this.floorMaterialName=data.floorMaterialName
      this.roofted=data.roofted
      this.availableTurns=data.availableTurns
      this.reservedTurns=data.reservedTurns
      this.paidTurns=data.paidTurns
      this.totalTurns= data.totalTurns
    }
  }