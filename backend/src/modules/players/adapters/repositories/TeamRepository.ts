import Player from "../../core/models/PlayerModel";
import { NewPlayersTeams } from "../../../playersXTeams/NewPXTRequest";
import { NewTeamRequest } from "../../core/dtos/request/NewTeamRequest";
import Team from "../../core/models/TeamModel";
import PlayersTeams from "../../core/models/PXTModel";
import { Transaction } from "sequelize";


export class TeamRepository {
  createTeam = async (newTeam: NewTeamRequest, transaction: Transaction): Promise<Team> => {
    const createdTeam = await Team.create({
      name: newTeam.name,
      description: newTeam.description,
    }, {transaction});
    return createdTeam;
  };

  createPlayersTeams = async (newPlayersTeams: NewPlayersTeams, transaction: Transaction): Promise<PlayersTeams> => {
        const createdPlayersTeams = await PlayersTeams.create({
            creator: newPlayersTeams.creator,
            teamId: newPlayersTeams.teamId,
            playerId: newPlayersTeams.playerId
        }, {transaction});

        return createdPlayersTeams;
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
