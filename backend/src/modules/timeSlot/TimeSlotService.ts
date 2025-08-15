import { Transaction } from "sequelize";
import { NewTSREquest } from "./NewTSRequest";
import { TimeSlotRepository } from "./TimeSlotRepository";

export class TimeSlotService {
  timeSlotRepository = new TimeSlotRepository();

  createTimeSlot = async (
    newTS: NewTSREquest,
    transaction: Transaction
  ): Promise<any> => {
    const createdTimeSlot = await this.timeSlotRepository.createTimeSlot(
      newTS,
      transaction
    );
    return createdTimeSlot;
  };

  getTimeSlotById = async (id: number): Promise<any> => {
    const timeSlot = await this.timeSlotRepository.getTimeSlotById(id);
    return timeSlot;
  };
}
