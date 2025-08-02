import { NewTeamRequest } from "../core/dtos/request/NewTeamRequest";
import { TeamRepository } from "../adapters/repositories/TeamRepository";
import { PlayersTeamsService } from "../../playersXTeams/PXTService";
import { NewPlayersTeams } from "../../playersXTeams/NewPXTRequest";
import { PlayerService } from "./PlayerService";
import sequelize from "../../../config/db.config";
import { NotFoundError } from "../../../errors/NotFoundError";

export class TeamService {
  teamRepository = new TeamRepository();
  playersTeamsService = new PlayersTeamsService();
  playerService = new PlayerService();

  createTeam = async (
    creatorId: number,
    newTeam: NewTeamRequest
  ): Promise<any> => {
    const playerIdCreator = await this.playerService.getPlayerByUserId(
      creatorId
    );
    if (!playerIdCreator) {
      throw new NotFoundError("Jugador no encontrado");
    }

    const playerIdAdd = await this.playerService.getPlayerById(
      newTeam.playerId
    );
    if (!playerIdAdd) {
      throw new NotFoundError("Jugador no encontradod");
    }

    const transaction = await sequelize.transaction();

    try {
      const team = await this.teamRepository.createTeam(newTeam, transaction);

      const playerTeam1 = new NewPlayersTeams({
        creator: 1,
        teamId: team.id,
        playerId: playerIdCreator.id,
      });
      await this.teamRepository.createPlayersTeams(playerTeam1, transaction);

      const playerTeam2 = new NewPlayersTeams({
        creator: 0,
        teamId: team.id,
        playerId: newTeam.playerId,
      });
      await this.teamRepository.createPlayersTeams(playerTeam2, transaction);

      await transaction.commit();
      return team;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  getTeamById = async (id: number): Promise<any> => {
    return await this.teamRepository.getTeamById(id);
  };
}
