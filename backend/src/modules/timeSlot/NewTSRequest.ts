export class NewTSREquest {
  date: string;
  startTime: string;
  endTime: string;
  matchId: number;

  constructor(data: any) {
    this.date = data.date;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.matchId = data.matchId;
  }

  public validate(): string | null {
    if (!this.date || typeof this.date !== "string") {
      return "Date es un campo obligatorio y debe ser string";
    }
    if (!this.startTime || typeof this.startTime !== "string") {
      return "StartTime es un campo obligatorio y debe ser string";
    }
    if (!this.endTime || typeof this.endTime !== "string") {
      return "EndTime es un campo obligatorio y debe ser string";
    }
    if (!this.matchId || typeof this.matchId !== "number") {
      return "MatchId es un campo obligatorio y debe ser number";
    }

    return null;
  }
}
