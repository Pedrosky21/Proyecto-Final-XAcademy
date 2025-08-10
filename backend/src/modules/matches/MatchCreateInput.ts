// Existe porque en la request deben enviarse los timeSlots pero en la creacion no

export class MatchCreateInput {
  roofed: number;
  turnId: number;
  wallMaterialId: number;
  floorMaterialId: number;
  matchStateId: number;

  constructor (data:any) {
    this.roofed = data.roofed,
    this.turnId = data.turId,
    this.wallMaterialId = data.wallMaterialId
    this.floorMaterialId = data.floorMaterialId
    this.matchStateId = data.matchStateId
  }
}
