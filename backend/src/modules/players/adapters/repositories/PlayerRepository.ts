import { NewPlayerRequest } from "../../core/dtos/request/NewPlayerRequest";
import Category from "../../core/models/CategoryModel";
import Player from "../../core/models/PlayerModel";
import { Op, Sequelize, Transaction } from "sequelize";
import Position from "../../core/models/PositionModel";
import Team from "../../core/models/TeamModel";
import PlayersTeams from "../../core/models/PXTModel";
import Match from "../../../matches/MatchModel";
import MatchesTeams from "../../../matches/MXTModel";
import { MatchResponse } from "../../../matches/MatchResponse";
import TimeSlot from "../../../timeSlot/TimeSlotModel";
import WallMaterial from "../../../wallMaterials/core/models/WallMaterial";
import FloorMaterial from "../../../floorMaterials/core/FloorMaterial";

export class PlayerRepository {
  createPlayer = async (
    newPlayer: NewPlayerRequest,
    transaction: Transaction
  ): Promise<Player> => {
    const createdPlayer = await Player.create(
      {
        firstName: newPlayer.firstName,
        lastName: newPlayer.lastName,
        birthDate: newPlayer.birthDate,
        cellNumber: newPlayer.cellNumber,
        pictureUrl: newPlayer.pictureUrl,
        userId: newPlayer.userId,
        categoryId: newPlayer.categoryId,
        positionId: newPlayer.positionId,
      },
      { transaction }
    );

    return createdPlayer;
  };

  getAllPlayers = async (): Promise<Player[]> => {
    return await Player.findAll({
      include: [
        { model: Category, as: "category", attributes: ["id", "name"] },
        { model: Position, as: "position", attributes: ["id", "name"] },
      ],
    });
  };

  getPlayerById = async (id: number): Promise<Player | null> => {
    return await Player.findByPk(id, {
      include: [
        { model: Category, as: "category", attributes: ["id", "name"] },
        { model: Position, as: "position", attributes: ["id", "name"] },
      ],
    });
  };

  getPlayerByUserId = async (userId: number): Promise<Player | null> => {
    return await Player.findOne({
      where: { userId: userId },
    });
  };

  getPlayersByName = async (fullName: string): Promise<Player[] | null> => {
    const words = fullName.trim().split(/\s+/);
    const likeConditions = words.map((word) => ({
      [Op.or]: [
        { firstName: { [Op.like]: `%${word}%` } },
        { lastName: { [Op.like]: `%${word}%` } },
      ],
    }));

    return await Player.findAll({
      where: {
        [Op.and]: likeConditions,
      },
      include: [
        {
          model: Category,
          as: "category",

          attributes: ["name"],
        },
        {
          model: Position,
          as: "position",

          attributes: ["name"],
        },
      ],
      limit: 5,
      order: [
        ["firstName", "ASC"],
        ["lastName", "ASC"],
      ],
    });
  };

  getTeamsByPlayerId = async (id: number): Promise<Team[]> => {
    const playersTeams = await PlayersTeams.findAll({
      where: { playerId: id },
      include: [
        {
          model: Team,
          as: "team",

          include: [
            {
              model: PlayersTeams,
              include: [{ model: Player, as: "player" }],
            },
          ],
        },
      ],
    });

    return playersTeams
      .map((pt) => pt.team)
      .filter((team): team is Team => team !== undefined);
  };

  getMatchesForPlayer = async (playerId: number): Promise<MatchResponse> => {
    const matches = await Match.findAll({
      include: [
        {
          model: MatchesTeams,
          as: "MatchesTeams",
          required: true,
          include: [
            {
              model: Team,
              as: "team",
              required: true,
              include: [
                {
                  model: PlayersTeams,
                  as: "PlayersTeams",
                  required: true,
                  where: {
                    playerId: playerId, // equipo donde si esta el jugador
                  },
                  include: [
                    {
                      model: Player,
                      as: "player",
                    },
                  ],
                },
                {
                  model: PlayersTeams,
                  as: "PartnerTeams",
                  where: {
                    playerId: {
                      [Op.notIn]: [playerId]
                    },
                  },
                  include: [
                    {
                      model: Player,
                      as: "player",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: MatchesTeams,
          as: "RivalTeams",
          required: false,
          include: [
            {
              model: Team,
              as: "team", // equipos donde no esta el jugador
              where: {
                id: {
                  [Op.notIn]: Sequelize.literal(`(
                    SELECT pt.equipo_idequipo
                    FROM jugadorxequipo pt 
                    WHERE pt.jugador_idjugador = ${playerId}
                    )`),
                },
              },
              required: true,
              include: [
                {
                  model: PlayersTeams,
                  as: "PlayersTeams",
                  required: true,
                  include: [{ model: Player, as: "player" }],
                },
              ],
            },
          ],
        },
        {
          model: TimeSlot,
          as: "timeSlots",
        },
        {
          model: WallMaterial,
          as: "wallMaterial"
        },
        {
          model: FloorMaterial,
          as: "floorMaterial"
        },
      ],
    });

    const matchesByState = {
      created: matches.filter((m: Match) => m.matchStateId === 1),
      pending: matches.filter((m: Match) => m.matchStateId === 2),
      confirmed: matches.filter((m: Match) => m.matchStateId === 3),
      userId: playerId,
    };

    const response = new MatchResponse(matchesByState);

    return response;
  };
}
