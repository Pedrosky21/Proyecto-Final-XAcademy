export class NewPlayersTeams {
  creator: number;
  teamId: number;
  playerId: number;

  constructor(data: any) {
    this.creator = data.creator;
    this.teamId = data.teamId;
    this.playerId = data.playerId;
  }

  public validate(): string | null {
    if (!this.creator || typeof this.creator !== "number") {
      return "Creator es un campo obligatorio y debe ser un string";
    } else if (this.creator !== 0 && this.creator !== 1) {
      return "Creator debe ser 1 o 0";
    }
    if (!this.teamId || typeof this.teamId !== "number") {
      return "TeamId es un campo obligatorio y debe ser un numero";
    }
    if (!this.playerId || typeof this.playerId !== "number") {
      return "PlayerId es un campo obligatorio y debe ser un numero";
    }

    return null;
  }
}
