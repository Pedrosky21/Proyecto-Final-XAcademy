

export class NewCourt{
  floorMaterialId:number
  wallMaterialId:number
  roofted:boolean

  constructor(data:any){
    this.floorMaterialId = data.floorMaterialId;
    this.wallMaterialId = data.wallMaterialId;
    this.roofted = data.roofted;
  }

  validate(){
    if(!this.floorMaterialId|| typeof(this.floorMaterialId)!=="number"){
      return "Todas las canchas deben tener un floorMaterialId válido"
    }
    if(!this.wallMaterialId|| typeof(this.wallMaterialId)!=="number"){
      return "Todas las canchas deben tener un wallMaterialId válido"
    }
    if(typeof(this.roofted)!=="boolean"){
      return "Todas las canchas deben tener un roofted válido"
    }
  }
}