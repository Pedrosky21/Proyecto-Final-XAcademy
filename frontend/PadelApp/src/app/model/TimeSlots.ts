export class TimeSlots {
  id: number;
  index: number;
  date: string;
  startTime: string;
  endTime: string;

  constructor(data: any) {
    this.id = data.id;
    this.index = data.index;
    this.date = data.date;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
  }
}
