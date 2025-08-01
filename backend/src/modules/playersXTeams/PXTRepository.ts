import { NewPlayersTeams } from "./NewPXTRequest";
import PlayersTeams from "./PXTModel";
import { PlayerService } from "../players/services/PlayerService";

export class PlayersTeamsRepository {
    createPlayersTeams = async (newPlayersTeams: NewPlayersTeams): Promise<PlayersTeams> => {
        const createdPlayersTeams = await PlayersTeams.create({
            creator: newPlayersTeams.creator,
            teamId: newPlayersTeams.teamId,
            playerId: newPlayersTeams.playerId
        });

        return createdPlayersTeams;
    };

    getAllPlayersTeams = async (): Promise<PlayersTeams[]> => {
        return await PlayersTeams.findAll();
    };
}
