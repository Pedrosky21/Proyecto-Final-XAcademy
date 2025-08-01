import Player from "../players/core/models/PlayerModel";
import PlayersTeams from "../playersXTeams/PXTModel";
import { NewTeamRequest } from "./NewTeamRequest";
import Team from "./TeamModel";

export class TeamRepository {
  createTeam = async (newTeam: NewTeamRequest): Promise<Team> => {
    const createdTeam = await Team.create({
      name: newTeam.name,
      description: newTeam.description,
    });
    return createdTeam;
  };

  getAllTeams = async (): Promise<Team[]> => {
    return await Team.findAll();
  };

  getTeamById = async (id: number): Promise<Team | null> => {
    return await Team.findByPk(id, {
      include: [
        { model: PlayersTeams, include: [{ model: Player, as: "player" }] },
      ],
    });
  };
}
