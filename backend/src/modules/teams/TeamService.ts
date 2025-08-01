import { NewTeamRequest } from "./NewTeamRequest";
import { TeamRepository } from "./TeamRepository";
import { PlayersTeamsService } from "../playersXTeams/PXTService";
import { NewPlayersTeams } from "../playersXTeams/NewPXTRequest";

export class TeamService {
  teamRepository = new TeamRepository();
  playersTeamsService = new PlayersTeamsService();

  createTeam = async (
    creatorId: number,
    newTeam: NewTeamRequest,
    playerId: number
  ): Promise<any> => {

    const team = await this.teamRepository.createTeam(newTeam);

    const playerTeam1 = new NewPlayersTeams({
      creator: 1,
      teamId: team.id,
      playerId: creatorId,
    });
    await this.playersTeamsService.createPlayersTeams(playerTeam1);
    

    const playerTeam2 = new NewPlayersTeams({
      creator: 0,
      teamId: team.id,
      playerId: playerId,
    });
    await this.playersTeamsService.createPlayersTeams(playerTeam2);
    
    
    return team;
  };

  getAllTeams = async (): Promise<any> => {
    return await this.teamRepository.getAllTeams();
  };

  getTeamById = async (id: number): Promise<any> => {
    return await this.teamRepository.getTeamById(id);
  };
}
