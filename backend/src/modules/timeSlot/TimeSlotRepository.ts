import TimeSlot from "./TimeSlotModel";
import { NewTSREquest } from "./NewTSRequest";
import { Transaction } from "sequelize";

export class TimeSlotRepository {
    createTimeSlot = async (newTS:NewTSREquest, transaction:Transaction): Promise<TimeSlot> => {
        const createdTimeSlot = await TimeSlot.create({
            date: newTS.date,
            startTime: newTS.startTime,
            endTime: newTS.endTime,
            matchId: newTS.matchId
        }, { transaction });

        return createdTimeSlot;
    }

    getTimeSlotById = async (id:number): Promise<TimeSlot | null> => {
        const timeSlot = await TimeSlot.findByPk(id);
        return timeSlot;
    }
}
