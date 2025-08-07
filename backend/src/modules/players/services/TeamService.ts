import { NewTeamRequest } from "../core/dtos/request/NewTeamRequest";
import { TeamRepository } from "../adapters/repositories/TeamRepository";
import { NewPlayersTeams } from "../../playersXTeams/NewPXTRequest";
import { PlayerService } from "./PlayerService";
import sequelize from "../../../config/db.config";
import { NotFoundError } from "../../../errors/NotFoundError";
import AppError from "../../../errors/AppError";

export class TeamService {
  teamRepository = new TeamRepository();
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

    if (playerIdCreator.id === playerIdAdd.id) {
      throw new AppError("El mismo jugador no puede ser los 2 integrantes del equipo");
    }

    // Check that players dont play on the same position or someone plays both
    // positionId 3 means both in database
    if (
      (playerIdCreator.positionId !== 3 ||
      playerIdAdd.positionId !== 3 ) &&
      playerIdCreator.positionId === playerIdAdd.positionId
    ) {
      throw new AppError("Los jugadores juegan en la misma posicion");
    }

    const sameTeamAlready = await this.teamRepository.arePlayersInSameTeam(
      playerIdCreator.id,
      playerIdAdd.id
    );
    if (sameTeamAlready) {
      throw new AppError("Los jugadores ya pertenecen a un mismo equipo");
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

  getTeamsPlayerByName = async (teamName:string, playerId:number): Promise<any> => {
    return await this.teamRepository.getTeamsPlayerByName(teamName, playerId);
  }
}
