export class NewTeamRequest {
  name: string;
  description: string;
  playerId: number

  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
    this.playerId = data.playerId
  }

  public validate(): string | null {
    if (!this.name || typeof this.name !== "string") {
      return "El name es un campo obligatorio y debe ser un string";
    }
    if (this.description && typeof this.description !== "string") {
      return "Description debe ser un string";
    }
    if (!this.playerId || typeof this.playerId !== "number") {
      return "PlayerId es un campo obligatorio y debe ser number"
    }
    return null;
  }
}
