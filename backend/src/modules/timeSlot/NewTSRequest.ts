export class NewTSREquest {
  date: string;
  startTime: string;
  endTime: string;

  constructor(data: any) {
    this.date = data.date;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
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

    return null;
  }
}
