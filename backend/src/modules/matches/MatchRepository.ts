import { NewMatchRequest } from "./NewMatchRequest";
import { NewMatchesTeams } from "./MXTRequest";
import Match from "./MatchModel";
import MatchesTeams from "./MXTModel";
import { Transaction } from "sequelize";
import Team from "../players/core/models/TeamModel";
import Player from "../players/core/models/PlayerModel";
import PlayersTeams from "../players/core/models/PXTModel";
import TimeSlot from "../timeSlot/TimeSlotModel";

interface MatchCreateInput {
  roofed: number;
  turnId: number;
  wallMaterialId: number;
  floorMaterialId: number;
  matchStateId: number;
}

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
    transaction: Transaction
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
    floorMaterial: number | null
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
      where: whereClause,
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

          attributes: ["date", "startTime", "endTime"],
        },
      ],
    });

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
}
