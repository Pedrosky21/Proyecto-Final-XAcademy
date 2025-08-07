import { NotFoundError } from "../../../errors/NotFoundError";
import { CategoryService } from "./CategoryService";
import { PositionService } from "./PositionService";
import { PlayerRepository } from "../adapters/repositories/PlayerRepository";
import { NewPlayerRequest } from "../core/dtos/request/NewPlayerRequest";
import { UserService } from "../../auth/services/UserService";
import sequelize from "../../../config/db.config";

export class PlayerService {
  playerRepository = new PlayerRepository();
  categoryService = new CategoryService();
  positionService = new PositionService();
  userService = new UserService();

  createPlayer = async (newPlayer: NewPlayerRequest): Promise<any> => {
    const category = await this.categoryService.getCategoryById(
      newPlayer.categoryId
    );
    if (!category) throw new NotFoundError("Categoria no encontrada");

    const position = await this.positionService.getPositionById(
      newPlayer.positionId
    );
    if (!position) throw new NotFoundError("Posición no encontrada");

    const transaction = await sequelize.transaction();

    try {
      const player = await this.playerRepository.createPlayer(
        newPlayer,
        transaction
      );
      await this.userService.setUserType(
        newPlayer.userId,
        "Jugador",
        transaction
      );
      await transaction.commit();
      return player;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  getAllPlayers = async (): Promise<any> => {
    return await this.playerRepository.getAllPlayers();
  };

  getPlayerById = async (id: number): Promise<any> => {
    return await this.playerRepository.getPlayerById(id);
  };

  getPlayersByName = async (fullName: string): Promise<any> => {
    return await this.playerRepository.getPlayersByName(fullName);
  };

  getPlayerByUserId = async (userId: number): Promise<any> => {
    return await this.playerRepository.getPlayerByUserId(userId);
  };

  getTeamsByPlayerId = async (id: number): Promise<any> => {
    const player = await this.playerRepository.getPlayerByUserId(id);

    return await this.playerRepository.getTeamsByPlayerId(
      player?.getDataValue("id")
    );
  };
}
