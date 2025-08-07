export interface Match {
  id: number;
  roofed: number;
  turnId: number;
  wallMaterialId: number;
  floorMaterialId: number;
  matchStateId: number;
}

export interface NewMatchRequest {
  teamId: number;
  roofed: number;
  turnId: number;
  wallMaterialId: number;
  floorMaterialId: number;
}
