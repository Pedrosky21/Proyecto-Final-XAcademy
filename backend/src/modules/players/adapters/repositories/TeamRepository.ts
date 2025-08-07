import Player from "../../core/models/PlayerModel";
import { NewPlayersTeams } from "../../../playersXTeams/NewPXTRequest";
import { NewTeamRequest } from "../../core/dtos/request/NewTeamRequest";
import Team from "../../core/models/TeamModel";
import PlayersTeams from "../../core/models/PXTModel";
import { Sequelize, Transaction } from "sequelize";
import { Op } from "sequelize";


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

  getTeamsPlayerByName = async (teamName: string, playerId:number): Promise<Team[]> => {
  const words = teamName.trim().split(/\s+/);

  const conditions = words.map((word) => ({
    name: {
      [Op.like]: `%${word}%`
    }
  }));

  return await Team.findAll({
    where: {
      [Op.or]: conditions
    },
    include: [
      {
        model: PlayersTeams,
        as: "playersTeams",
        where: { playerId },
        attributes: [] // para no traer los datos de la tabla intermedia si no los necesitás
      }
    ],
    order: [["name", "ASC"]],
    limit: 5
  });
};

  arePlayersInSameTeam = async (id1:number, id2:number): Promise<boolean> => {
    const teams = await PlayersTeams.findAll({
      attributes: ['teamId'],
      where: {
        playerId: {
          [Op.in]: [id1, id2]
        }
      },
      group: ['teamId'],
      having: Sequelize.literal('COUNT(DISTINCT jugador_idjugador) = 2')
    });

    return teams.length > 0;
  }
}
