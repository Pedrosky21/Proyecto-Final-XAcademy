import { TeamService } from "../players/services/TeamService";
import { MatchRepository } from "./MatchRepository";
import { NewMatchRequest } from "./NewMatchRequest";
import { NotFoundError } from "../../errors/NotFoundError";
import sequelize from "../../config/db.config";
import { NewMatchesTeams } from "./MXTRequest";

export class MatchService {
  matchRepository = new MatchRepository();
  teamService = new TeamService();

  createMatch = async (
    creatorTeamId: number,
    newMatch: NewMatchRequest
  ): Promise<any> => {
    const creatorTeam = await this.teamService.getTeamById(creatorTeamId);
    if (!creatorTeam) {
      throw new NotFoundError("Equipo no encontrado");
    }

    const transaction = await sequelize.transaction();

    try {
      const match = await this.matchRepository.createMatch(
        newMatch,
        transaction
      );

      const matchesTeams = new NewMatchesTeams({
        isCreator: 1,
        matchId: match.id,
        teamId: creatorTeam.id,
      });
      await this.matchRepository.createMatchesTeams(matchesTeams, transaction);

      await transaction.commit();
      return match;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  getMatchesWithTeams = async (
    limit: number,
    page: number,
    roofed: number | null,
    wallMaterial: number | null,
    floorMaterial: number | null
  ): Promise<any> => {
    const matches = this.matchRepository.getMatchesWithTeams(
      limit,
      page,
      roofed,
      wallMaterial,
      floorMaterial
    );
    return matches;
  };
}
