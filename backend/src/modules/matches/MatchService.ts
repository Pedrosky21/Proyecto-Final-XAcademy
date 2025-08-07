import { TeamService } from "../players/services/TeamService";
import { MatchRepository } from "./MatchRepository";
import { NewMatchRequest } from "./NewMatchRequest";
import { NotFoundError } from "../../errors/NotFoundError";
import sequelize from "../../config/db.config";
import { NewMatchesTeams } from "./MXTRequest";
import { WallMaterialService } from "../wallMaterials/services/WallMaterialService";
import { FloorMaterialService } from "../floorMaterials/services/FloorMaterialService";
import { TimeSlotService } from "../timeSlot/TimeSlotService";
import { NewTSREquest } from "../timeSlot/NewTSRequest";

export class MatchService {
  matchRepository = new MatchRepository();
  teamService = new TeamService();
  wallMaterialService = new WallMaterialService();
  floorMaterialService = new FloorMaterialService();
  timeSlotService = new TimeSlotService();

  createMatch = async (
    creatorTeamId: number,
    newMatch: NewMatchRequest
  ): Promise<any> => {
    const creatorTeam = await this.teamService.getTeamById(creatorTeamId);
    if (!creatorTeam) {
      throw new NotFoundError("Equipo no encontrado");
    }
    const wallMaterial = await this.wallMaterialService.getWallMaterialById(newMatch.wallMaterialId);
    if (!wallMaterial) {
      throw new NotFoundError("Material de pared no encontrado");
    }
    const floorMaterial = await this.floorMaterialService.getFloorMaterialById(newMatch.floorMaterialId);
    if (!floorMaterial) {
      throw new NotFoundError("Material de suelo no encontrado");
    }

    const transaction = await sequelize.transaction();

    try {
      const { timeSlot, ...matchData } = newMatch;

      const timeSlotCreated = await this.timeSlotService.createTimeSlot(timeSlot, transaction);

      const match = await this.matchRepository.createMatch(
      {
        ...matchData,
        timeSlotId: timeSlotCreated.id,
      },
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
