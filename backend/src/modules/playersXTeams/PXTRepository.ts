import { NewPlayersTeams } from "./NewPXTRequest";
import { PlayerService } from "../players/services/PlayerService";
import PlayersTeams from "../players/core/models/PXTModel";

export class PlayersTeamsRepository {
    

    getAllPlayersTeams = async (): Promise<PlayersTeams[]> => {
        return await PlayersTeams.findAll();
    };
}
