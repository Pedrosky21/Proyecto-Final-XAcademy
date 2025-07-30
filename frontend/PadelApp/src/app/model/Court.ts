export class Court{
  id:number
  index:number
  wallMaterialId:number
  floorMaterialId:number
  roofted: boolean

  constructor(data:any){
    this.id=data.id
    this.index=data.index
    this.wallMaterialId=data.wallMaterialId
    this.floorMaterialId = data.floorMaterialId
    this.roofted= data.roofed
  }

}