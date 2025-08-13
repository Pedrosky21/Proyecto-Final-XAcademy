import { Transaction } from "sequelize";
import { NewClubRequest } from "../../core/dtos/request/NewClubRequest";
import Court from "../../core/models/sequelize/Courts";
import TurnState from "../../core/models/sequelize/TurnState";
import FloorMaterial from "../../../floorMaterials/core/FloorMaterial";
import WallMaterial from "../../../wallMaterials/core/models/WallMaterial";
import Turn from "../../core/models/sequelize/Turn";
import Club from "../../core/models/sequelize/Club";
import { ClubByUserIdResponse } from "../../core/dtos/responses/ClubByUserIdResponse";
import { MatchPreferences } from "../../../matches/core/models/MatchPreferences";
import { Op } from "sequelize";
import sequelize from "../../../../config/db.config";
import { NotFoundError } from "../../../../errors/NotFoundError";

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
        turnPrice: newClubRequest.turnPrice.toString(),
        openningTime: newClubRequest.openningTime,
        closingTime: newClubRequest.closingTime,
        admisionRules: newClubRequest.admisionRules,
        cancelationRules: newClubRequest.cancelationRules,
        userId: newClubRequest.userId,
      },
      { transaction }
    );
  };
  getClubByUserId = async (
    userId: number
  ): Promise<ClubByUserIdResponse | null> => {
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
              attributes: ["id"],
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
    if (!club) {
      return null;
    }
    const toReturnClub: ClubByUserIdResponse = new ClubByUserIdResponse(club);
    return toReturnClub;
  };

  getClubsForMatches = async (preferences: MatchPreferences): Promise<any> => {
    console.log(preferences);
    return await Club.findAll({
      attributes: [
        "id",
        [
          sequelize.literal(`(
            SELECT COUNT(*) FROM cancha AS c
            WHERE c.club_idclub = Club.idclub
              AND c.techada = ${preferences.roofted}
              AND c.materialPared_idmaterialPared ${
                preferences.wallMaterialId
                  ? `= ${preferences.wallMaterialId}`
                  : "IS NOT NULL"
              }
              AND c.materialSuelo_idmaterialSuelo ${
                preferences.floorMaterialId
                  ? `= ${preferences.floorMaterialId}`
                  : "IS NOT NULL"
              }
          )`),
          "totalCourts",
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(*) FROM turno AS t
            INNER JOIN cancha AS c ON t.cancha_idcancha = c.idcancha
            WHERE c.club_idclub = Club.idclub
              AND c.techada = ${preferences.roofted}
              AND c.materialPared_idmaterialPared ${
                preferences.wallMaterialId
                  ? `= ${preferences.wallMaterialId}`
                  : "IS NOT NULL"
              }
              AND c.materialSuelo_idmaterialSuelo ${
                preferences.floorMaterialId
                  ? `= ${preferences.floorMaterialId}`
                  : "IS NOT NULL"
              }
              AND t.estadoturno_idestadoturno = 1
              AND (
                        ${
                          preferences.timeSlots
                            ?.map(
                              (slot) =>
                                `(t.fechaHoraInicio < CAST('${slot.endHour}' AS DATETIME) AND t.fechaHoraFin > CAST('${slot.startHour}' AS DATETIME))`
                            )
                            .join(" OR ") || "1=1"
                        }
                )
          )`),
          "totalTurns",
        ],
      ],
      order: [
        ["totalCourts", "DESC"],
        ["totalTurns", "DESC"],
      ],
    });
  };

  getCourtsForMatch = async (
    preferences: MatchPreferences,
    clubId: number
  ): Promise<any> => {
    const club: Club | null = await Club.findOne({
      where: { id: clubId },
      include: [
        {
          model: Court,
          as: "courts",
          attributes: [
            "id",
            "roofed",
            "wallMaterialId",
            "floorMaterialId",
            [
              sequelize.literal(`(
            SELECT COUNT(*) FROM turno AS t
            INNER JOIN cancha AS c ON t.cancha_idcancha = c.idcancha
            WHERE c.club_idclub = ${clubId}
              AND t.estadoturno_idestadoturno = 1
              AND (
                        ${
                          preferences.timeSlots
                            ?.map(
                              (slot) =>
                                `(t.fechaHoraInicio < CAST('${slot.endHour}' AS DATETIME) AND t.fechaHoraFin > CAST('${slot.startHour}' AS DATETIME))`
                            )
                            .join(" OR ") || "1=1"
                        }
                )
          )`),
              "totalTurns",
            ],
          ],
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
          ],
        },
      ],
    });
    if (!club) {
      throw new NotFoundError("Club no encontrado");
    }

    //problema de referencias circulares
    const plainClub = club.toJSON()
    const sortedClub = {
      ...plainClub,
      courts: plainClub.courts?.sort((a: any, b: any) => {
        const coincidencesA = this.countMatches(a, preferences);
        const coincidencesB = this.countMatches(b, preferences);
        if (coincidencesA !== coincidencesB) {
          return coincidencesB- coincidencesA;
        }
        return (
          Number(b.totalTurns) -
          Number(a.totalTurns)
        );
      }),
    };

    return sortedClub;
  };
  private countMatches(court: any, preferences: MatchPreferences) {
    let matches = 0;
    console.log(preferences)
    if (
      preferences.roofted !== undefined &&
      court.roofed === preferences.roofted
    ) {
      matches++;
    }

    if (
      preferences.floorMaterialId &&
      court.floorMaterialId === preferences.floorMaterialId
    ) {
      matches++;
    }

    if (
      preferences.wallMaterialId &&
      court.wallMaterial === preferences.wallMaterialId
    ) {
      matches++;
    }

    return matches;
  }
}
