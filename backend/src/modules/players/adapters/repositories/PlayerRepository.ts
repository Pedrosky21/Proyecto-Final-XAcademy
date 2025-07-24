
import { NewPlayerRequest } from "../../core/dtos/request/NewPlayerRequest";
import Player from "../../core/models/PlayerModel";


export class PlayerRepository{
  
  createPlayer= async (newPlayer:NewPlayerRequest):Promise<Player>=>{
    const createdPlayer = await Player.create({
      name: newPlayer.firstName,
      lastName: newPlayer.lastName,
      birthDate: newPlayer.birthDate,
      cellNumber: newPlayer.cellNumber,
      pictureUrl: newPlayer.pictureUrl,
      userId: newPlayer.userId,
      categoryId: newPlayer.categoryId,
      positionId: newPlayer.positionId,
    });
    return createdPlayer;
  }
}