export interface Match {
  id: number;
  roofed: number;
  turnId: number;
  wallMaterialId: number;
  floorMaterialId: number;
  matchStateId: number;
}

export interface TimeSlotRequest {
  date: string;
  startTime: string;
  endTime: string;
}

export interface NewMatchRequest {
  teamId: number;
  roofed: number;

  wallMaterialId: number;
  floorMaterialId: number;

  timeSlot: TimeSlotRequest;
}
