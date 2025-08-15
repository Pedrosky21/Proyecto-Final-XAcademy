import { Op, Transaction } from "sequelize";
import { NewTurn } from "../../core/models/classes/NewTurn";
import Turn from "../../core/models/sequelize/Turn";
import TurnState from "../../core/models/sequelize/TurnState";
import { MatchPreferences } from "../../../matches/core/models/MatchPreferences";

export class TurnRepository {
  createTurn = async (
    newTurn: NewTurn,
    transaction: Transaction
  ): Promise<any> => {
    return Turn.create(
      {
        startDateTime: newTurn.startDate,
        endDateTime: newTurn.endDate,
        turnStateId: 1,
        courtId: newTurn.courtId,
        playerName: "",
      },
      { transaction }
    );
  };

  getCourtTurnsByWeek = async (
    courtId: number,
    startDate: Date,
    endDate: Date,
    preferences?: MatchPreferences
  ): Promise<Turn[]> => {

    const preferencesConditions=preferences? {
      [Op.or]:preferences?.timeSlots?.map((slot)=>({
        [Op.and]:[
          {startDateTime:{[Op.lt]:slot.endHour}},
          {endDateTime:{[Op.gt]: slot.startHour}}
        ]
      }))
    }:[]
    const turnsByWeek = await Turn.findAll({
      where: {
        courtId: courtId,
        startDateTime: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        ...preferencesConditions
      },
      include: [
        {
          model: TurnState,
          as: "turnState",
        },
      ],
    });

    return turnsByWeek;
  };

  updateTurnState = async (
    turnId: number,
    nextState: number,
    playerName?: string,
    transaction?: Transaction
  ): Promise<any> => {
    const updateFields: any = {
      turnStateId: nextState,
    };
    if (playerName !== undefined) {
      updateFields.playerName = playerName;
    }

    const turn = await Turn.update(updateFields, {
      where: { id: turnId },
      transaction,
    });
    return turn;
  };

  getTurnById = async (turnId: number): Promise<Turn | null> => {
    return await Turn.findByPk(turnId);
  };
}
