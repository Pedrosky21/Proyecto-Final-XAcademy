import { NotFoundError } from "../../../errors/NotFoundError";
import { CategoryService } from "../../categories/services/CategoryService";
import { PositionService } from "../../positions/service/PosicionService";
import { PlayerRepository } from "../adapters/repositories/PlayerRepository";
import { NewPlayerRequest } from "../core/dtos/request/NewPlayerRequest";


export class PlayerService{
  playerRepository = new PlayerRepository()
  categoryService = new CategoryService()
  positionService= new PositionService()

  createJugador = async (newPlayer: NewPlayerRequest):Promise<any>=>{
    const category = await this.categoryService.getCategoryById(newPlayer.categoryId)
    if(!category) throw new NotFoundError("Categoria no encontrada");

    const position = await this.positionService.getPositionById(newPlayer.positionId)
    if(!position) throw new NotFoundError("Posición no encontrada");

    return await this.playerRepository.createPlayer(newPlayer)
  }
}