import { NewMatchesTeams } from "./MXTRequest";
import Match from "./MatchModel";
import MatchesTeams from "./MXTModel";
import { Sequelize, Transaction } from "sequelize";
import Team from "../players/core/models/TeamModel";
import Player from "../players/core/models/PlayerModel";
import PlayersTeams from "../players/core/models/PXTModel";
import TimeSlot from "../timeSlot/TimeSlotModel";
import Category from "../players/core/models/CategoryModel";
import { MatchCreateInput } from "./MatchCreateInput";
import { Op } from "sequelize";
import WallMaterial from "../wallMaterials/core/models/WallMaterial";
import FloorMaterial from "../floorMaterials/core/FloorMaterial";
import { MatchPreferences } from "./core/models/MatchPreferences";

export class MatchRepository {
  createMatch = async (
    newMatch: MatchCreateInput,
    transaction: Transaction
  ): Promise<Match> => {
    const createdMatch = await Match.create(
      {
        roofed: newMatch.roofed,
        wallMaterialId: newMatch.wallMaterialId,
        floorMaterialId: newMatch.floorMaterialId,
        matchStateId: 1,
      },
      { transaction }
    );

    return createdMatch;
  };

  createMatchesTeams = async (
    newMatchesTeams: NewMatchesTeams,
    transaction: Transaction
  ): Promise<MatchesTeams> => {
    const createdMatchesTeams = await MatchesTeams.create(
      {
        isCreator: newMatchesTeams.isCreator,
        matchId: newMatchesTeams.matchId,
        teamId: newMatchesTeams.teamId,
      },
      { transaction }
    );

    return createdMatchesTeams;
  };

  getMatchById = async (
    id: number,
    transaction?: Transaction
  ): Promise<Match | null> => {
    const match = await Match.findByPk(id, {
      include: [
        {
          model: MatchesTeams,
          as: "MatchesTeams",
          include: [
            {
              model: Team,
              as: "team",
              include: [
                {
                  model: PlayersTeams,
                  as: "PlayersTeams",
                  include: [
                    {
                      model: Player,
                      as: "player",
                      include: [
                        {
                          model: Category,
                          as: "category",
                          attributes: ["id", "name"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { model: TimeSlot, as: "timeSlots" },
      ],
      transaction,
    });
    return match;
  };

  getMatchesWithTeams = async (
    limit: number,
    page: number,
    roofed: number | null,
    wallMaterial: number | null,
    floorMaterial: number | null,
    playerId: number
  ): Promise<Match[]> => {
    const whereClause: any = {};

    if (roofed !== null) {
      whereClause.roofed = roofed;
    }
    if (wallMaterial !== null) {
      whereClause.wallMaterialId = wallMaterial;
    }
    if (floorMaterial !== null) {
      whereClause.floorMaterialId = floorMaterial;
    }

    const matches = await Match.findAll({
      where: {
        ...whereClause,
        id: {
          [Op.notIn]: Sequelize.literal(`
          (
          SELECT m.idpartido
          FROM partido m
          JOIN equipoxpartido mt ON mt.partido_idpartido = m.idpartido
          JOIN equipo t ON t.idequipo = mt.equipo_idequipo
          JOIN jugadorxequipo pt ON pt.equipo_idequipo = t.idequipo
          WHERE pt.jugador_idjugador = ${playerId}
          UNION
          SELECT m.idpartido
          FROM partido m
          JOIN equipoxpartido mt ON mt.partido_idpartido = m.idpartido
          GROUP BY m.idpartido
          HAVING COUNT(DISTINCT mt.equipo_idequipo) > 1
          )
      `),
        },
      },
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: MatchesTeams,
          as: "MatchesTeams",
          include: [
            {
              model: Team,
              as: "team",
              include: [
                {
                  model: PlayersTeams,
                  as: "PlayersTeams",
                  include: [
                    {
                      model: Player,
                      as: "player",
                      include: [
                        {
                          model: Category,
                          as: "category",
                          attributes: ["id", "name"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: TimeSlot,
          as: "timeSlots",
          attributes: ["date", "startTime", "endTime"],
        },
      ],
    });

    // const matches = await Match.findAll({
    //   where:{
    //     ...whereClause
    //   },
    //   include: [
    //     {
    //       model: MatchesTeams,
    //       as: "MatchesTeams",
    //       include: [
    //         {
    //           model: Team,
    //           as: "team",
    //           include: [
    //             {
    //               model: PlayersTeams,
    //               as: "PlayersTeams",
    //               where: {
    //                 playerId: { [Op.ne]: playerId }
    //               },
    //               include: [
    //                 {
    //                   model: Player,
    //                   as: "player",
    //                   include: [
    //                     {
    //                       model: Category,
    //                       as: "category",
    //                       attributes: ["id", "name"],
    //                     }
    //                   ]
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       model: TimeSlot,
    //       as: "timeSlots",
    //       attributes: ["date", "startTime", "endTime"],
    //     }
    //   ],
    //   limit,
    //   offset: (page - 1) * limit,
    // })

    return matches;
  };

  getMatchTeam = async (
    matchId: number,
    teamId: number
  ): Promise<MatchesTeams | null> => {
    const matchTeam = await MatchesTeams.findOne({
      where: {
        matchId: matchId,
        teamId: teamId,
      },
    });
    return matchTeam;
  };

  teamsByMatchId = async (
    matchId: number
  ): Promise<{ count: number; rows: MatchesTeams[] }> => {
    const matchesTeams = await MatchesTeams.findAndCountAll({
      where: {
        matchId: matchId,
      },
      distinct: true,
      include: [
        {
          model: Team,
          as: "team",
          include: [
            {
              model: PlayersTeams,
              as: "PlayersTeams",
              include: [
                {
                  model: Player,
                  as: "player",
                },
              ],
            },
          ],
        },
      ],
    });
    return matchesTeams;
  };

  setMatchToPending = async (
    matchId: number,
    transaction: Transaction
  ): Promise<void> => {
    const [matchesChanged] = await Match.update(
      { matchStateId: 2 },
      {
        where: {
          id: matchId,
        },
        transaction,
      }
    );
  };

  getMatchPreferences = async (matchId: number): Promise<MatchPreferences> => {
    const match = await Match.findByPk(matchId, {
      attributes: ["roofed"],
      include: [
        {
          model: WallMaterial,
          as: "wallMaterial",
          attributes: ["id"],
        },
        {
          model: FloorMaterial,
          as: "floorMaterial",
          attributes: ["id"],
        },
        {
          model: TimeSlot,
          as: "timeSlots",
          attributes: ["date", "startTime", "endTime"],
        },
      ],
    });
    const matchPreferences = new MatchPreferences(match);
    return matchPreferences;
  };

  reserveTurn = async (
    matchId: number,
    turnId: number,
    transaction: Transaction
  ): Promise<any> => {
    return await Match.update(
      { turnId: turnId, matchStateId: 3 },
      {
        where: {
          id: matchId,
        },
        transaction,
      }
    );
  };
}
