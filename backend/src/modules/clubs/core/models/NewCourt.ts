

export class NewCourt{
  floorMaterialId:number
  wallMaterialId:number
  roofted:boolean

  constructor(data:any){
    this.floorMaterialId = Number(data.floorMaterialId);
    this.wallMaterialId = Number(data.wallMaterialId);
    this.roofted = data.roofted === "true"?true:false;
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