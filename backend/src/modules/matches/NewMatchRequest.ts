import { NewTSREquest } from "../timeSlot/NewTSRequest";

export class NewMatchRequest {
  roofed: number;
  turnId: number;
  wallMaterialId: number;
  floorMaterialId: number;
  matchStateId: number;
  timeSlots: NewTSREquest[];

  constructor(data: any) {
    this.roofed = data.roofed;
    this.turnId = data.turnId;
    this.wallMaterialId = data.wallMaterialId;
    this.floorMaterialId = data.floorMaterialId;
    this.matchStateId = data.matchStateId;
    this.timeSlots = Array.isArray(data.timeSlots)
      ? data.timeSlots.map((ts: any) => new NewTSREquest(ts))
      : data.timeSlots;
  }

  public validate(): string | null {
    if (!this.roofed || typeof this.roofed !== "number") {
      return "Roofed es un campo obligatorio y debe ser un numero";
    } else if (this.roofed !== 0 && this.roofed !== 1) {
      return "Roofed debe ser 1 o 0";
    }
    if (!this.turnId || typeof this.turnId !== "number") {
      return "TurnId es un campo obligatorio y debe ser un numero";
    }
    if (!this.wallMaterialId || typeof this.wallMaterialId !== "number") {
      return "WallMaterialId es un campo obligatorio y debe ser un numero";
    }
    if (!this.floorMaterialId || typeof this.floorMaterialId !== "number") {
      return "FloorMaterialId es un campo obligatorio y debe ser un numero";
    }
    if (!this.matchStateId || typeof this.matchStateId !== "number") {
      return "MatchState es un campo obligatorio y debe ser un numero";
    }
    if (!Array.isArray(this.timeSlots)) {
      return "TimeSlots es un campo obligatorio y debe ser un array";
    }
    if (this.timeSlots.length === 0) {
      return "TimeSlots no puede estar vacío";
    }

    return null;
  }
}
