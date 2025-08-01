import { NewPlayerRequest } from "../../core/dtos/request/NewPlayerRequest";
import Player from "../../core/models/PlayerModel";
import { Op } from "sequelize";

export class PlayerRepository {
  createPlayer = async (newPlayer: NewPlayerRequest): Promise<Player> => {
    const createdPlayer = await Player.create({
      firstName: newPlayer.firstName,
      lastName: newPlayer.lastName,
      birthDate: newPlayer.birthDate,
      cellNumber: newPlayer.cellNumber,
      pictureUrl: newPlayer.pictureUrl,
      userId: newPlayer.userId,
      categoryId: newPlayer.categoryId,
      positionId: newPlayer.positionId,
    });
    return createdPlayer;
  };

  getAllPlayers = async (): Promise<Player[]> => {
    return await Player.findAll();
  };

  getPlayerById = async (id: number): Promise<Player | null> => {
    return await Player.findByPk(id);
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
      limit: 5,
      order: [['firstName', 'ASC'], ['lastName', 'ASC']]
    });
  };
}
