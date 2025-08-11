import { Transaction } from "sequelize";
import { NewClubRequest } from "../../core/dtos/request/NewClubRequest";
import Court from "../../core/models/sequelize/Courts";
import TurnState from "../../core/models/sequelize/TurnState";
import FloorMaterial from "../../../floorMaterials/core/FloorMaterial";
import WallMaterial from "../../../wallMaterials/core/models/WallMaterial";
import Turn from "../../core/models/sequelize/Turn";
import Club from "../../core/models/sequelize/Club";
import { ClubByUserIdResponse } from "../../core/dtos/responses/ClubByUserIdResponse";

export class ClubRepository {
  getClubById = async (id: number): Promise<Club | null> => {
    return await Club.findByPk(id);
  };

  createClub = async (
    newClubRequest: NewClubRequest,
    transaction: Transaction
  ): Promise<Club> => {
    return await Club.create(
      {
        name: newClubRequest.name,
        address: newClubRequest.address,
        cellNumber: Number(newClubRequest.cellNumber),
        responsableFirstName: newClubRequest.responsableFirstName,
        responsableLastName: newClubRequest.responsableLastName,
        turnPrice:newClubRequest.turnPrice.toString(),
        openningTime: newClubRequest.openningTime,
        closingTime: newClubRequest.closingTime,
        admisionRules: newClubRequest.admisionRules,
        cancelationRules: newClubRequest.cancelationRules,
        userId: newClubRequest.userId,
      },
      { transaction }
    );
  };
  getClubByUserId = async (userId: number): Promise<ClubByUserIdResponse|null> => {
    const club = await Club.findOne({

      where: { userId: userId },
      include: [
        {
          model: Court,
          as: "courts",
          attributes: ["id", "roofed"],
          include: [
            {
              model: FloorMaterial,
              as: "floorMaterial",
              attributes: ["name"],
            },
            {
              model: WallMaterial,
              as: "wallMaterial",
              attributes: ["name"],
            },
            {
              model: Turn,
              as: "turns",
              separate: true,
              attributes:["id"],
              include: [
                {
                  model: TurnState,
                  as: "turnState",
                  where: {
                    name: ["Disponible", "Reservado", "Cobrado"],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    if(!club){
      return null
    }
    const toReturnClub:ClubByUserIdResponse= new ClubByUserIdResponse(club)
    return toReturnClub;
  };

  
}
