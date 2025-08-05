export class NewMatchesTeams {
    isCreator: number;
    matchId: number;
    teamId: number;

    constructor (data: any) {
        this.isCreator = data.isCreator
        this.matchId = data.matchId
        this.teamId = data.teamId
    }

    public validate(): string | null {
    if (!this.isCreator || typeof this.isCreator !== "number") {
      return "Creator es un campo obligatorio y debe ser un string";
    } else if (this.isCreator !== 0 && this.isCreator !== 1) {
      return "Creator debe ser 1 o 0";
    }
    if (!this.teamId || typeof this.teamId !== "number") {
      return "TeamId es un campo obligatorio y debe ser un numero";
    }
    if (!this.matchId || typeof this.matchId !== "number") {
      return "MatchId es un campo obligatorio y debe ser un numero";
    }

    return null;
  }
}