import { NextFunction, Request, Response } from "express";
import { PlayerService } from "../../services/PlayerService";
import { NewPlayerRequest } from "../../core/dtos/request/NewPlayerRequest";
import { BadRequestError } from "../../../../errors/BadRequestError";


export class PlayerController{
  playerService= new PlayerService()

  createPlayer= async(req:Request, res:Response,next: NextFunction):Promise<any>=>{
    try {
      const newPlayerRequest = new NewPlayerRequest(req.body);

      const error:string|null= newPlayerRequest.validate();
      if(error) throw new BadRequestError(error);

      const newPlayer = await this.playerService.createPlayer(newPlayerRequest)

      res.status(201).json(newPlayer);
    } catch (error) {
      next(error);
    }
  }

  getAllPlayers = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
      const players = await this.playerService.getAllPlayers();
      res.json(players);
    } catch (error) {
      next(error)
    }
  }

  getPlayerById = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
      const {id} = req.params
      const player = await this.playerService.getPlayerById(Number(id));
      res.json(player);
    } catch (error) {
      next(error);
    }
  }
}
