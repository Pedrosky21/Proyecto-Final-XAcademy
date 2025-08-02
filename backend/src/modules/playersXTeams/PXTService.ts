import { PlayerService } from "../players/services/PlayerService";
import { NewPlayersTeams } from "./NewPXTRequest";
import { PlayersTeamsRepository } from "./PXTRepository";

export class PlayersTeamsService {
  playersTeamsRepository = new PlayersTeamsRepository();
  playerService = new PlayerService();

  getAllPlayersTeams = async (): Promise<any> => {
    return await this.playersTeamsRepository.getAllPlayersTeams();
  };
}
