import { NewPlayersTeams } from "./NewPXTRequest";
import { PlayersTeamsRepository } from "./PXTRepository";
import { PlayerService } from "../players/services/PlayerService";

export class PlayersTeamsService {
  playersTeamsRepository = new PlayersTeamsRepository();
  playerService = new PlayerService();

  createPlayersTeams = async (
    newPlayersTeams: NewPlayersTeams
  ): Promise<any> => {

    const playerByUserId = await this.playerService.getPlayerByUserId(
      newPlayersTeams.playerId
    );

    if (!playerByUserId) {
      throw new Error(
        `Jugador no encontrado para el usuario con id ${newPlayersTeams.playerId}`
      );
    }

    newPlayersTeams.playerId = playerByUserId.id;

    return await this.playersTeamsRepository.createPlayersTeams(
      newPlayersTeams
    );
  };

  getAllPlayersTeams = async (): Promise<any> => {
    return await this.playersTeamsRepository.getAllPlayersTeams();
  };
}
