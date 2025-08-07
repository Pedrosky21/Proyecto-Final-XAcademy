import { NewMatchRequest } from "./NewMatchRequest";
import { NewMatchesTeams } from "./MXTRequest";
import Match from "./MatchModel";
import MatchesTeams from "./MXTModel";
import { Transaction } from "sequelize";
import Team from "../players/core/models/TeamModel";
import Player from "../players/core/models/PlayerModel";
import PlayersTeams from "../players/core/models/PXTModel";

export class MatchRepository {
  createMatch = async (
    newMatch: NewMatchRequest,
    transaction: Transaction
  ): Promise<Match> => {
    const createdMatch = await Match.create(
      {
        roofed: newMatch.roofed,
        wallMaterialId: newMatch.wallMaterialId,
        floorMaterialId: newMatch.floorMaterialId,
        matchStateId: newMatch.matchState,
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

  getMatchById = async (id: number): Promise<Match | null> => {
    const match = await Match.findByPk(id);
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
      whereClause.wallMaterial = wallMaterial;
    }
    if (floorMaterial !== null) {
      whereClause.floorMaterial = floorMaterial;
    }

    const matches = await Match.findAll({
      where: whereClause,
      limit: limit,
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
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return matches;
  };
}
